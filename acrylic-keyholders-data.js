const KEYHOLDER_BASE_PRICE = 800;
const ENGRAVING_PRICE = 300;


const commonKeyholderOptions = [

  {
    id: "engraving",
    name: "裏面に名前を彫る",
    price: ENGRAVING_PRICE,
    type: "text",
    placeholder: "彫刻する名前を入力",
    maxLength: 12
  }

];


const acrylicKeyholdersData = [

  {
    id: "ak001",
    name: "シコクスズメダイ",
    category: "スズメダイ",
    price: KEYHOLDER_BASE_PRICE,
    priceLabel: `¥${KEYHOLDER_BASE_PRICE.toLocaleString()}`,
    status: "準備中",
    image: "images/keyholders/shikoku-suzumedai.png",
    description: "シコクスズメダイをモチーフにしたMARINKオリジナルアクリルキーホルダー。",
    options: commonKeyholderOptions
  },

  {
    id: "ak002",
    name: "オヤビッチャ",
    category: "スズメダイ",
    price: KEYHOLDER_BASE_PRICE,
    priceLabel: `¥${KEYHOLDER_BASE_PRICE.toLocaleString()}`,
    status: "準備中",
    image: "images/keyholders/oyabiccha.png",
    description: "オヤビッチャをモチーフにしたMARINKオリジナルアクリルキーホルダー。",
    options: commonKeyholderOptions
  },

  {
    id: "ak003",
    name: "アオハナテンジクダイ",
    category: "テンジクダイ",
    price: KEYHOLDER_BASE_PRICE,
    priceLabel: `¥${KEYHOLDER_BASE_PRICE.toLocaleString()}`,
    status: "準備中",
    image: "images/keyholders/aohana-tenjikudai.png",
    description: "アオハナテンジクダイをモチーフにしたMARINKオリジナルアクリルキーホルダー。",
    options: commonKeyholderOptions
  },

  {
    id: "ak004",
    name: "キツネメネジリンボウ",
    category: "ハゼ",
    price: KEYHOLDER_BASE_PRICE,
    priceLabel: `¥${KEYHOLDER_BASE_PRICE.toLocaleString()}`,
    status: "準備中",
    image: "images/keyholders/kitsuneme-nejirinbou.png",
    description: "キツネメネジリンボウをモチーフにしたMARINKオリジナルアクリルキーホルダー。",
    options: commonKeyholderOptions
  },

  {
    id: "ak005",
    name: "ナンヨウハギ",
    category: "ハギ",
    price: KEYHOLDER_BASE_PRICE,
    priceLabel: `¥${KEYHOLDER_BASE_PRICE.toLocaleString()}`,
    status: "準備中",
    image: "images/keyholders/nanyouhagi.png",
    description: "ナンヨウハギをモチーフにしたMARINKオリジナルアクリルキーホルダー。",
    options: commonKeyholderOptions
  },

  {
    id: "ak006",
    name: "テングハギ",
    category: "ハギ",
    price: KEYHOLDER_BASE_PRICE,
    priceLabel: `¥${KEYHOLDER_BASE_PRICE.toLocaleString()}`,
    status: "準備中",
    image: "images/keyholders/tenguhagi.png",
    description: "テングハギをモチーフにしたMARINKオリジナルアクリルキーホルダー。",
    options: commonKeyholderOptions
  }

];


