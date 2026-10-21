const KEYHOLDER_BASE_PRICE = 349;

const ENGRAVING_PRICE = 50;
const SCIENTIFIC_PRICE = 50;

function makeKeyholderOptions(scientificName) {

  return [
    {
      id: "engraving",
      name: "裏面に名前を入れる",
      price: ENGRAVING_PRICE,
      type: "text",
      placeholder: "名前を入力（12文字以内）",
      maxLength: 12
    },

    {
      id: "scientific",
      name: "学名を入れる",
      price: SCIENTIFIC_PRICE,
      type: "fixed",
      value: scientificName
    }
  ];

}

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
   options: makeKeyholderOptions("Chromis margaritifer")
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
   options: makeKeyholderOptions("Abudefduf vaigiensis")
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
    options: makeKeyholderOptions("Ostorhinchus apogonoides")
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
   options: makeKeyholderOptions("Stonogobiops pentafasciata")
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
    options: makeKeyholderOptions("Paracanthurus hepatus")
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
   options: makeKeyholderOptions("Naso unicornis")
  }

];


