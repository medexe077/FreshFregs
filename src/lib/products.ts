export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: "masculine" | "feminine" | "unisex";
  type: "fresh" | "woody" | "floral" | "oriental" | "citrus";
  description: string;
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  isNew?: boolean;
  isBestSeller?: boolean;
  longevity: string;
  sillage: string;
  occasion: string[];
}

const masculineImg = "/PerfumesPics/CreedAventus.jpg";
const CreedAventus = "/PerfumesPics/CreedAventus.jpg";
const DSvg = "/PerfumesPics/DSvg.jpg";
const BDC = "/PerfumesPics/BDC.jpg";
const adprofumo = "/PerfumesPics/adprofumo.jpg";
const feminineImg = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/82f38e4d-27dd-401f-943c-1365a30a9286/generated_images/elegant-feminine-perfume-bottle-rose-gol-68cc1353-20251208174947.jpg";
const orientalImg = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/82f38e4d-27dd-401f-943c-1365a30a9286/generated_images/oriental-oud-perfume-bottle-amber-gold-l-db04bf19-20251208174946.jpg";
const citrusImg = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/82f38e4d-27dd-401f-943c-1365a30a9286/generated_images/fresh-citrus-perfume-bottle-crystal-clea-ae898cca-20251208174947.jpg";
const unisexImg = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/82f38e4d-27dd-401f-943c-1365a30a9286/generated_images/unisex-niche-perfume-bottle-collection-m-d3f3e7b3-20251208174947.jpg";
const woodyImg = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/82f38e4d-27dd-401f-943c-1365a30a9286/generated_images/luxury-woody-perfume-bottle-dark-smoky-g-2a976770-20251208174947.jpg";

export const products: Product[] = [
  {
    id: "aventus",
    name: "Aventus",
    brand: "Creed",
    price: 6500,
    originalPrice: 58000,
    image: CreedAventus,
    images: [masculineImg, woodyImg, citrusImg],
    category: "masculine",
    type: "fresh",
    description:
      "A prestigious fragrance combining pineapple, birch, and musk, celebrating power and success. Aventus has become the gold standard for modern masculine fragrances.",
    notes: {
      top: ["Pineapple", "Bergamot", "Black Currant", "Apple"],
      middle: ["Birch", "Patchouli", "Moroccan Jasmine", "Rose"],
      base: ["Musk", "Oak Moss", "Ambergris", "Vanilla"],
    },
    isNew: false,
    isBestSeller: true,
    longevity: "8-12 hours",
    sillage: "Strong",
    occasion: ["Business", "Special Events", "Evening"],
  },
  {
    id: "baccarat-rouge-540",
    name: "Baccarat Rouge 540",
    brand: "Maison Francis Kurkdjian",
    price: 7200,
    originalPrice: 45000,
    image: orientalImg,
    images: [orientalImg, feminineImg],
    category: "unisex",
    type: "oriental",
    description:
      "An alchemy of saffron, amber wood, and fir resin creates a luminous and enchanting scent. A modern icon in the world of luxury fragrances.",
    notes: {
      top: ["Saffron", "Jasmine"],
      middle: ["Amberwood", "Maison Cedar"],
      base: ["Fir Resin", "Ambergris", "Cedar"],
    },
    isNew: false,
    isBestSeller: true,
    longevity: "10-14 hours",
    sillage: "Moderate to Strong",
    occasion: ["Evening", "Special Events", "Date Night"],
  },
  {
    id: "lost-cherry",
    name: "Lost Cherry",
    brand: "Tom Ford",
    price: 5800,
    originalPrice: 52000,
    image: feminineImg,
    images: [feminineImg, orientalImg],
    category: "unisex",
    type: "oriental",
    description:
      "Seductive cherry liqueur with hints of bitter almond and Turkish rose. Elegant and extremely sensual.",
    notes: {
      top: ["Black Cherry", "Cherry Liqueur"],
      middle: ["Bitter Almond", "Turkish Rose", "Jasmine Sambac"],
      base: ["Peru Balsam", "Roasted Tonka", "Sandalwood", "Vetiver"],
    },
    isNew: true,
    isBestSeller: false,
    longevity: "8-10 hours",
    sillage: "Moderate",
    occasion: ["Evening", "Date Night", "Special Events"],
  },
  {
    id: "oud-wood",
    name: "Oud Wood",
    brand: "Tom Ford",
    price: 5200,
    originalPrice: 38000,
    image: woodyImg,
    images: [woodyImg, orientalImg],
    category: "unisex",
    type: "woody",
    description:
      "A composition of exotic oud wood, sandalwood, and Szechuan pepper. Rich and smoky with a warm amber finish.",
    notes: {
      top: ["Rosewood", "Chinese Pepper", "Cardamom"],
      middle: ["Oud Wood", "Sandalwood", "Vetiver"],
      base: ["Tonka Bean", "Amber"],
    },
    isNew: false,
    isBestSeller: true,
    longevity: "8-10 hours",
    sillage: "Moderate",
    occasion: ["Evening", "Business", "Formal Events"],
  },
  {
    id: "bleu-de-chanel",
    name: "Bleu de Chanel",
    brand: "Chanel",
    price: 3800,
    originalPrice: 22000,
    image: BDC,
    images: [masculineImg, citrusImg],
    category: "masculine",
    type: "woody",
    description:
      "A woody aromatic fragrance revealing the spirit of a man who chooses his own destiny. Fresh, clean, and undeniably elegant.",
    notes: {
      top: ["Citrus", "Mint", "Pink Pepper"],
      middle: ["Grapefruit", "Dry Cedar", "Nutmeg"],
      base: ["Incense", "Ginger", "Sandalwood", "Patchouli", "Cedar", "Vetiver"],
    },
    isNew: false,
    isBestSeller: true,
    longevity: "6-8 hours",
    sillage: "Moderate",
    occasion: ["Daily", "Business", "Casual"],
  },
  {
    id: "la-vie-est-belle",
    name: "La Vie Est Belle",
    brand: "Lancôme",
    price: 3200,
    originalPrice: 21000,
    image: feminineImg,
    images: [feminineImg],
    category: "feminine",
    type: "floral",
    description:
      "A floral iris fragrance expressing happiness and the joy of life. Sweet, elegant, and feminine.",
    notes: {
      top: ["Blackcurrant", "Pear"],
      middle: ["Iris", "Jasmine", "Orange Blossom"],
      base: ["Praline", "Vanilla", "Patchouli", "Tonka Bean"],
    },
    isNew: false,
    isBestSeller: false,
    longevity: "6-8 hours",
    sillage: "Moderate",
    occasion: ["Daily", "Romantic", "Special Events"],
  },
  {
    id: "sauvage",
    name: "Sauvage",
    brand: "Dior",
    price: 3600,
    originalPrice: 20000,
    image: DSvg,
    images: [DSvg],
    category: "masculine",
    type: "fresh",
    description:
      "Pure and noble at once, inspired by wide open spaces. Fresh Calabrian bergamot, ambroxan, and Sichuan pepper.",
    notes: {
      top: ["Calabrian Bergamot", "Pepper"],
      middle: ["Lavender", "Pink Pepper", "Vetiver", "Patchouli", "Geranium"],
      base: ["Ambroxan", "Cedar", "Labdanum"],
    },
    isNew: false,
    isBestSeller: true,
    longevity: "8-10 hours",
    sillage: "Strong",
    occasion: ["Daily", "Business", "Casual"],
  },
  {
    id: "black-opium",
    name: "Black Opium",
    brand: "Yves Saint Laurent",
    price: 3400,
    originalPrice: 19000,
    image: orientalImg,
    images: [orientalImg, feminineImg],
    category: "feminine",
    type: "oriental",
    description:
      "A seductive coffee floral fragrance with white flowers, vanilla, and a sensual touch of coffee.",
    notes: {
      top: ["Pink Pepper", "Orange Blossom", "Pear"],
      middle: ["Coffee", "Jasmine", "Bitter Almond", "Licorice"],
      base: ["Vanilla", "Patchouli", "Cedar", "Cashmere Wood"],
    },
    isNew: true,
    isBestSeller: false,
    longevity: "6-8 hours",
    sillage: "Moderate",
    occasion: ["Evening", "Date Night", "Parties"],
  },
  {
    id: "byredo-gypsy-water",
    name: "Gypsy Water",
    brand: "Byredo",
    price: 4800,
    originalPrice: 38000,
    image: unisexImg,
    images: [unisexImg, woodyImg],
    category: "unisex",
    type: "woody",
    description:
      "Inspired by the romantic gypsy lifestyle, a fragrance glorifying the idea of freedom and travel with fresh bergamot, pine, and vanilla.",
    notes: {
      top: ["Bergamot", "Lemon", "Pepper", "Juniper Berries"],
      middle: ["Incense", "Pine Needles", "Orris"],
      base: ["Amber", "Vanilla", "Sandalwood"],
    },
    isNew: true,
    isBestSeller: false,
    longevity: "6-8 hours",
    sillage: "Light to Moderate",
    occasion: ["Daily", "Casual", "Travel"],
  },
  {
    id: "le-labo-santal-33",
    name: "Santal 33",
    brand: "Le Labo",
    price: 5500,
    originalPrice: 42000,
    image: unisexImg,
    images: [unisexImg, woodyImg],
    category: "unisex",
    type: "woody",
    description:
      "An iconic open fire composition with Australian sandalwood, papyrus, and cedarwood. A global favorite.",
    notes: {
      top: ["Cardamom", "Iris", "Violet"],
      middle: ["Ambrox", "Australian Sandalwood", "Papyrus"],
      base: ["Cedarwood", "Leather", "Musk"],
    },
    isNew: false,
    isBestSeller: true,
    longevity: "8-10 hours",
    sillage: "Moderate to Strong",
    occasion: ["Daily", "Business", "Casual"],
  },
  {
    id: "acqua-di-gio-profumo",
    name: "Acqua di Giò Profumo",
    brand: "Giorgio Armani",
    price: 3500,
    originalPrice: 19000,
    image: adprofumo,
    images: [adprofumo],
    category: "masculine",
    type: "citrus",
    description:
      "A sophisticated aquatic fragrance with a warm amber heart. The perfect balance between freshness and sensuality.",
    notes: {
      top: ["Bergamot", "Sea Notes", "Geranium", "Mandarin Orange"],
      middle: ["Rosemary", "Sage", "Amber"],
      base: ["Patchouli", "Incense", "Amber"],
    },
    isNew: false,
    isBestSeller: false,
    longevity: "8-10 hours",
    sillage: "Moderate",
    occasion: ["Summer", "Daily", "Beach"],
  },
  {
    id: "pdm-delina",
    name: "Delina",
    brand: "Parfums de Marly",
    price: 5200,
    originalPrice: 42000,
    image: feminineImg,
    images: [feminineImg, orientalImg],
    category: "feminine",
    type: "floral",
    description:
      "A sophisticated floral fragrance with Turkish rose, lily of the valley, and vanilla. Romantic and regal.",
    notes: {
      top: ["Lychee", "Rhubarb", "Bergamot", "Nutmeg"],
      middle: ["Turkish Rose", "Lily of the Valley", "Peony"],
      base: ["Cashmeran", "Vanilla", "White Musk", "Cedar"],
    },
    isNew: true,
    isBestSeller: false,
    longevity: "8-10 hours",
    sillage: "Moderate to Strong",
    occasion: ["Daytime", "Romantic", "Special Events"],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: Product["category"]): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductsByType(type: Product["type"]): Product[] {
  return products.filter((p) => p.type === type);
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.isBestSeller);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew);
}

export function getSimilarProducts(product: Product, limit: number = 4): Product[] {
  return products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.type === product.type || p.category === product.category)
    )
    .slice(0, limit);
}