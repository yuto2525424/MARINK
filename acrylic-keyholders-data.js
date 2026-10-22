
/* =========================================
   MARINK ACRYLIC KEYHOLDERS
   134種類・12カテゴリー
========================================= */

// 価格
const KEYHOLDER_BASE_PRICE = 349;
const ENGRAVING_PRICE = 50;
const SCIENTIFIC_PRICE = 50;


// 裏面オプションを作成
function makeKeyholderOptions(scientificName) {

  const options = [
    {
      id: "engraving",
      name: "裏面に名前を入れる",
      price: ENGRAVING_PRICE,
      type: "text",
      placeholder: "名前を入力（12文字以内）",
      maxLength: 12
    }
  ];

  // 学名を登録済みの商品だけ学名入れを表示
  if (scientificName) {
    options.push({
      id: "scientific",
      name: "学名を入れる",
      price: SCIENTIFIC_PRICE,
      type: "fixed",
      value: scientificName
    });
  }

  return options;
}


// 生き物の名前を改行で登録できるようにする
function speciesLines(text) {
  return text.trim()
    .split("\n")
    .map(name => name.trim())
    .filter(Boolean);
}


/* =========================================
   商品ラインナップ
========================================= */

const KEYHOLDER_GROUPS = [

  // SMALL FISH 001〜026
  ["SMALL FISH", "sf", 1, speciesLines(`
ヤシャハゼ
ヒレナガネジリンボウ
アケボノハゼ
シコンハタタテハゼ
ハタタテハゼ
ニチリンダテハゼ
ギンガハゼ
クビアカハゼ
アカメハゼ
ホタテツノハゼ
ダテハゼ
ネジリンボウ
ヤマブキハゼ
ミジンベニハゼ
クロユリハゼ
オトメハゼ
アオギハゼ
キツネメネジリンボウ
ホムラハゼ
モンツキカエルウオ
ダンゴウオ
イッポンテグリ
チンアナゴ
ニシキアナゴ
ニシキテグリ
デメニギス
  `)],


  // REEF FISH 001〜018
  ["REEF FISH", "rf", 1, speciesLines(`
クダゴンベ
ソラスズメダイ
アマミスズメダイ
セナキルリスズメダイ
ルリホシスズメダイ
ミスジリュウキュウスズメダイ
オヤビッチャ
シコクスズメダイ
レモンスズメダイ
ネンブツダイ
クロホシイシモチ
マンジュウイシモチ
アマノガワテンジクダイ
アオハナテンジクダイ
オオスジイシモチ
ヤライイシモチ
キンギョハナダイ
アカオビハナダイ
  `)],


  // REEF FISH 019〜025
  // 一時除外：画像の販売利用を確認するまで欠番


  // REEF FISH 026〜044
  ["REEF FISH", "rf", 26, speciesLines(`
ナンヨウハギ
キイロハギ
テングハギ
ウマヅラハギ
ウツボ
トラウツボ
ハナヒゲウツボ
カクレクマノミ
ハマクマノミ
ユウゼン
タテジマキンチャクダイ
ツノダシ
セミホウボウ
ナンヨウツバメウオ
オジサン
アカヒメジ
ハリセンボン
ミナミハコフグ幼魚
カゴカキダイ
  `)],


  // SEAHORSE & ALLIES 001〜007
  ["SEAHORSE & ALLIES", "sa", 1, speciesLines(`
ハチジョウタツ
イバラタツ
タツノイトコ
ノコギリヨウジ
ニシキフウライウオ
カミソリウオ
ウミテング
  `)],


  // AMBUSH FISH 001〜007
  ["AMBUSH FISH", "af", 1, speciesLines(`
イロカエルアンコウ
クマドリカエルアンコウ
キアンコウ幼魚
ミノカサゴ
ボロカサゴ
ハダカハオコゼ
チョウチンアンコウ
  `)],


  // SHARK 001〜007
  ["SHARK", "sh", 1, speciesLines(`
ジンベエザメ
ホホジロザメ
アカシュモクザメ
トラザメ
イタチザメ
ノコギリザメ
ミツクリザメ
  `)],


  // RAY 001〜002
  ["RAY", "ra", 1, speciesLines(`
ナンヨウマンタ
アカエイ
  `)],


  // LARGE FISH 001〜005
  ["LARGE FISH", "lf", 1, speciesLines(`
ロウニンアジ
メガネモチノウオ
カジキ
マンボウ
シーラカンス
  `)],


  // SEA SLUG 001〜013
  ["SEA SLUG", "ss", 1, speciesLines(`
アオウミウシ
ウデフリツノザヤウミウシ
シンデレラウミウシ
ミゾレウミウシ
ミアミラウミウシ
ボブサンウミウシ
クロスジリュウグウウミウシ
サガミリュウグウウミウシ
ムラサキウミコチョウ
ゴマフビロードウミウシ
コンペイトウウミウシ
シロウサギウミウシ
クリオネ
  `)],


  // CRUSTACEAN 001〜009
  ["CRUSTACEAN", "cr", 1, speciesLines(`
フリソデエビ
ウミウシカクレエビ
イソギンチャクモエビ
オトヒメエビ
キンチャクガニ
ゼブラガニ
モンハナシャコ
カラッパ
オオグソクムシ
  `)],


  // CEPHALOPOD 001〜008
  ["CEPHALOPOD", "ce", 1, speciesLines(`
ヒメイカ
ミミイカ
アオリイカ
ハナイカ
マダコ
ダイオウイカ
メンダコ
オウムガイ
  `)],


  // JELLY 001〜009
  ["JELLY", "je", 1, speciesLines(`
ミズクラゲ
タコクラゲ
アカクラゲ
カラージェリー
ハナガサクラゲ
オワンクラゲ
サカサクラゲ
エチゼンクラゲ
カブトクラゲ
  `)],


  // OTHER 001〜004
  ["OTHER", "ot", 1, speciesLines(`
アカウミガメ
イルカ
シャチ
コツメカワウソ
  `)]
];


/* =========================================
   旧商品のIDを引き継ぐ
========================================= */

const KEYHOLDER_EXISTING_IDS = {
  "シコクスズメダイ": "ak001",
  "オヤビッチャ": "ak002",
  "アオハナテンジクダイ": "ak003",
  "キツネメネジリンボウ": "ak004",
  "ナンヨウハギ": "ak005",
  "テングハギ": "ak006"
};


/* =========================================
   学名データ
   確認したものから追加する
========================================= */

const KEYHOLDER_SCIENTIFIC_NAMES = {
  "シコクスズメダイ": "Chromis margaritifer",
  "オヤビッチャ": "Abudefduf vaigiensis",
  "アオハナテンジクダイ": "Ostorhinchus apogonoides",
  "キツネメネジリンボウ": "Stonogobiops pentafasciata",
  "ナンヨウハギ": "Paracanthurus hepatus",
  "テングハギ": "Naso unicornis"
};


/* =========================================
   商品画像
   現時点ではすべて未登録
========================================= */

const KEYHOLDER_IMAGES = {

  // 画像追加時にここへ書く

  // 例：
  // "SMALL FISH 001": "images/keyholders/yashahaze.png",

};


/* =========================================
   商品一覧を自動生成
========================================= */

const acrylicKeyholdersData =
  KEYHOLDER_GROUPS.flatMap(
    ([category, prefix, startNumber, names]) => {

      return names.map((name, index) => {

        const number = String(
          startNumber + index
        ).padStart(3, "0");

        const seriesCode = `${category} ${number}`;

        // 既存6商品は古いIDを維持
        const id =
          KEYHOLDER_EXISTING_IDS[name] ||
          `${prefix}${number}`;

        const scientificName =
          KEYHOLDER_SCIENTIFIC_NAMES[name] || "";

        const image =
          KEYHOLDER_IMAGES[seriesCode] || "";

        return {
          id: id,
          seriesCode: seriesCode,

          name: name,
          category: category,

          price: KEYHOLDER_BASE_PRICE,

          priceLabel:
            `¥${KEYHOLDER_BASE_PRICE.toLocaleString()}`,

          status: image
            ? "準備中"
            : "画像準備中",

          image: image,

          description:
            `${name}をモチーフにしたMARINKオリジナルアクリルキーホルダー。`,

          options: makeKeyholderOptions(scientificName)
        };

      });

    }
  );


// 動作確認用
console.log(
  "MARINK登録商品数:",
  acrylicKeyholdersData.length
);
