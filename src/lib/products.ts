export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "hair" | "skin" | "wellness" | "personal";
};

export const products: Product[] = [
  {
    id: "1",
    name: "Herbal Growth Hair Oil",
    description: "A potent blend of natural oils and herbs to promote hair growth, reduce hair fall, and nourish the scalp.",
    price: 18.99,
    category: "hair",
  },
  {
    id: "2",
    name: "Radiant Glow Face Cream",
    description: "A light, non-greasy face cream with saffron and turmeric to brighten skin and reduce blemishes.",
    price: 24.50,
    category: "skin",
  },
  {
    id: "3",
    name: "Immunity Booster Capsules",
    description: "A daily supplement with Ashwagandha and Giloy to strengthen your immune system and boost energy levels.",
    price: 29.99,
    category: "wellness",
  },
  {
    id: "4",
    name: "Ayurvedic Soothing Syrup",
    description: "A natural remedy for cough and cold, providing quick relief with the power of tulsi and honey.",
    price: 9.75,
    category: "wellness",
  },
  {
    id: "5",
    name: "Neem & Tea Tree Face Wash",
    description: "A purifying face wash that cleanses deeply, controls acne, and removes impurities without drying the skin.",
    price: 12.00,
    category: "skin",
  },
  {
    id: "6",
    name: "Bhringraj & Amla Shampoo",
    description: "A gentle, sulfate-free shampoo that strengthens hair roots and adds a natural shine.",
    price: 15.50,
    category: "hair",
  },
  {
    id: "7",
    name: "Triphala Digestive Support",
    description: "An ancient formula to support healthy digestion, detoxification, and overall gut health.",
    price: 21.00,
    category: "wellness",
  },
  {
    id: "8",
    name: "Sandalwood & Rose Body Lotion",
    description: "A luxurious, fragrant body lotion that deeply moisturizes and leaves skin feeling silky smooth.",
    price: 19.99,
    category: "personal",
  },
];
