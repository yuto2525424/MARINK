
/* MARINK ADMIN
   公開用のSupabaseキーだけを設定すること
*/

const SUPABASE_URL = "YOUR_PROJECT_URL";
const SUPABASE_KEY = "YOUR_PUBLISHABLE_KEY";

const $ = id => document.getElementById(id);

let db = null;
let orders = [];

function message(text) {
  $("systemMessage").textContent = text;
}

function make(tag, content = "", className = "") {
  const node = document.createElement(tag);
  node.textContent = String(content ?? "");
  if (className) node.className = className;
  return node;
}

function field(label, value) {
  const row = make("div", "", "detail-row");
  row.append(make("span", label));
  row.append(make("strong", value || "—"));
  return row;
}

function yen(value) {
  return "¥" + Number(value || 0).toLocaleString("ja-JP");
}

function statusName(value) {
  return ({
    unfulfilled: "未対応",
    packing: "梱包中",
    shipped: "発送済み",
    on_hold: "保留中"
  })[value] || value;
}

function resetView() {
  $("adminPanel").hidden = true;
  $("loginPanel").hidden = false;
  $("logoutButton").hidden = true;
  $("orderDetail").replaceChildren();
  orders = [];
}

async function checkAdministrator() {
  const { data: auth, error } = await db.auth.getUser();

  if (error || !auth.user) return false;

  const { data, error: accessError } = await db
    .from("marink_admins")
    .select("user_id")
    .eq("user_id", auth.user.id)
    .maybeSingle();

  if (accessError || !data) return false;

  return true;
}

async function enterAdmin() {
  if (!(await checkAdministrator())) {
    await db.auth.signOut();
    resetView();
    message("管理者ログインが必要です。");
    return;
  }

  $("loginPanel").hidden = true;
  $("adminPanel").hidden = false;
  $("logoutButton").hidden = false;
  message("");

  await loadOrders();
}

async function loadOrders() {
  message("注文情報を読み込んでいます。");

  const { data, error } = await db
    .from("marink_orders")
    .select("*")
    .eq("payment_status", "paid")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    message("注文の取得に失敗しました：" + error.message);
    return;
  }

  orders = data || [];

  $("totalOrders").textContent = orders.length;
  $("pendingOrders").textContent = orders.filter(
    o => o.fulfillment_status !== "shipped"
  ).length;
  $("shippedOrders").textContent = orders.filter(
    o => o.fulfillment_status === "shipped"
  ).length;

  renderList();

  message("");
}

function renderList() {
  const container = $("orderList");
  const query = $("orderSearch").value.trim().toLowerCase();

  container.replaceChildren();

  const filtered = orders.filter(o =>
    [o.order_number, o.customer_name, o.customer_email]
      .some(v => String(v || "").toLowerCase().includes(query))
  );

  if (!filtered.length) {
    container.append(make("p", "該当する注文はありません。"));
    return;
  }

  for (const order of filtered) {
    const button = make(
      "button",
      `${order.order_number}
${order.customer_name}
${statusName(order.fulfillment_status)} ／ ${yen(order.total_amount)}`,
      "order-button"
    );

    button.style.whiteSpace = "pre-line";
    button.addEventListener("click", () => showOrder(order.id));
    container.append(button);
  }
}

async function showOrder(orderId) {
  const detail = $("orderDetail");
  detail.replaceChildren(make("p", "読み込み中..."));

  const [orderResult, itemsResult] = await Promise.all([
    db.from("marink_orders")
      .select("*")
      .eq("id", orderId)
      .single(),

    db.from("marink_order_items")
      .select("*")
      .eq("order_id", orderId)
  ]);

  if (orderResult.error || itemsResult.error) {
    detail.replaceChildren(make("p", "注文詳細を読み込めません。"));
    return;
  }

  const order = orderResult.data;
  const items = itemsResult.data || [];

  detail.replaceChildren();

  detail.append(make("h3", "注文 " + order.order_number));
  detail.append(field("購入者", order.customer_name));
  detail.append(field("メール", order.customer_email));
  detail.append(field("電話番号", order.customer_phone));

  const address = [
    order.postal_code ? "〒" + order.postal_code : "",
    order.prefecture,
    order.city,
    order.address_line1,
    order.address_line2
  ].filter(Boolean).join(" ");

  detail.append(field("配送先住所", address));
  detail.append(field("お支払い金額", yen(order.total_amount)));
  detail.append(field("注文日時",
    new Date(order.created_at).toLocaleString("ja-JP")
  ));

  detail.append(make("h3", "商品・梱包チェック"));

  for (const item of items) {
    const box = make("div", "", "item");

    box.append(make(
      "div",
      `${item.product_name} × ${item.quantity}`,
      "item-title"
    ));

    const optionText = item.option_kind === "engraving"
      ? "名前入れ：" + item.option_value
      : item.option_kind === "scientific"
        ? "学名入れ：" + item.option_value
        : "裏面オプションなし";

    box.append(make("div", optionText, "item-option"));

    box.append(make(
      "p",
      `梱包済み：${item.packed_quantity} / ${item.quantity}個`
    ));

    const actions = make("div", "", "actions");

    for (const [label, step] of [
      ["− 1個戻す", -1],
      ["＋ 1個準備", 1]
    ]) {
      const button = make("button", label, "secondary");

      const next = item.packed_quantity + step;
      button.disabled = next < 0 || next > item.quantity;

      button.addEventListener("click", async () => {
        button.disabled = true;

        const { error } = await db
          .from("marink_order_items")
          .update({ packed_quantity: next })
          .eq("id", item.id);

        if (error) {
          alert("梱包状態を保存できませんでした。");
        }

        await showOrder(orderId);
      });

      actions.append(button);
    }

    box.append(actions);
    detail.append(box);
  }

  const statusTitle = make("h3", "発送状況");
  statusTitle.style.marginTop = "20px";
  detail.append(statusTitle);

  const select = document.createElement("select");

  for (const value of [
    "unfulfilled", "packing", "shipped", "on_hold"
  ]) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = statusName(value);
    select.append(option);
  }

  select.value = order.fulfillment_status;
  detail.append(select);

  const save = make("button", "発送状況を保存");
  save.style.marginTop = "12px";

  save.addEventListener("click", async () => {
    if (
      select.value === "shipped" &&
      items.some(i => i.packed_quantity !== i.quantity)
    ) {
      alert("未梱包の商品が残っています。");
      return;
    }

    save.disabled = true;

    const { error } = await db
      .from("marink_orders")
      .update({ fulfillment_status: select.value })
      .eq("id", orderId);

    if (error) {
      alert("発送状況を保存できませんでした。");
      save.disabled = false;
      return;
    }

    await loadOrders();
    await showOrder(orderId);
  });

  detail.append(save);
}

document.addEventListener("DOMContentLoaded", async () => {
  if (
    !window.supabase ||
    SUPABASE_URL === "YOUR_PROJECT_URL" ||
    SUPABASE_KEY === "YOUR_PUBLISHABLE_KEY"
  ) {
    message("Supabaseの初期設定が必要です。");
    return;
  }

  if (location.protocol === "file:") {
    message("ローカルファイルではなく、HTTPSまたはlocalhostで開いてください。");
    return;
  }

  db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );

  if (await checkAdministrator()) {
    await enterAdmin();
  } else {
    resetView();
    message("管理者ログインが必要です。");
  }

  $("loginForm").addEventListener("submit", async event => {
    event.preventDefault();

    $("loginMessage").textContent = "確認中...";

    const { error } = await db.auth.signInWithPassword({
      email: $("loginEmail").value.trim(),
      password: $("loginPassword").value
    });

    if (error || !(await checkAdministrator())) {
      await db.auth.signOut();

      $("loginMessage").textContent =
        "ログインできません。管理者情報を確認してください。";
      return;
    }

    $("loginPassword").value = "";
    $("loginMessage").textContent = "";
    await enterAdmin();
  });

  $("logoutButton").addEventListener("click", async () => {
    await db.auth.signOut();
    resetView();
    message("ログアウトしました。");
  });

  $("refreshButton").addEventListener("click", loadOrders);
  $("orderSearch").addEventListener("input", renderList);
});
