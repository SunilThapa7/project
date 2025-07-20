export const products = [
  {
    id: 1,
    name: "Agricultural Hoe",
    category: "Tools",
    subCategory: "Manual Tools",
    price: 650,
    rating: 4.5,
    image: "https://images.pexels.com/photos/296230/pexels-photo-296230.jpeg",
    description: "High-quality steel hoe for efficient soil cultivation",
    inStock: true,
    stockQuantity: 50,
    unit: "piece",
    seller: {
      id: 1,
      name: "Krishna Agricultural Tools"
    }
  },
  {
    id: 2,
    name: "Garden Fork",
    category: "Tools",
    subCategory: "Manual Tools",
    price: 850,
    rating: 4.2,
    image: "https://images.pexels.com/photos/90763/garden-trug-garden-tools-pliers-90763.jpeg",
    description: "Durable garden fork for soil turning and composting",
    inStock: true,
    stockQuantity: 35,
    unit: "piece",
    seller: {
      id: 1,
      name: "Krishna Agricultural Tools"
    }
  },
  {
    id: 3,
    name: "Tomato Seeds (Hybrid)",
    category: "Seeds",
    subCategory: "Vegetables",
    price: 120,
    rating: 4.8,
    image: "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg",
    description: "High-yield hybrid tomato seeds, disease resistant",
    inStock: true,
    stockQuantity: 200,
    unit: "packet",
    seller: {
      id: 2,
      name: "Nepal Seeds Co."
    }
  },
  {
    id: 4,
    name: "Rice Seeds (Local Variety)",
    category: "Seeds",
    subCategory: "Grains",
    price: 250,
    rating: 4.7,
    image: "https://images.pexels.com/photos/4503269/pexels-photo-4503269.jpeg",
    description: "Traditional Nepali rice variety, drought resistant",
    inStock: true,
    stockQuantity: 150,
    unit: "kg",
    seller: {
      id: 2,
      name: "Nepal Seeds Co."
    }
  },
  {
    id: 5,
    name: "Organic Fertilizer",
    category: "Fertilizers",
    subCategory: "Organic",
    price: 1200,
    rating: 4.6,
    image: "https://images.pexels.com/photos/9691410/pexels-photo-9691410.jpeg",
    description: "100% organic compost fertilizer for all crops",
    inStock: true,
    stockQuantity: 100,
    unit: "kg",
    seller: {
      id: 3,
      name: "Green Nepal Organics"
    }
  },
  {
    id: 6,
    name: "Watering Can (5L)",
    category: "Tools",
    subCategory: "Irrigation",
    price: 450,
    rating: 4.3,
    image: "https://images.pexels.com/photos/1459459/pexels-photo-1459459.jpeg",
    description: "Durable plastic watering can with rose sprinkler",
    inStock: false,
    stockQuantity: 0,
    unit: "piece",
    seller: {
      id: 1,
      name: "Krishna Agricultural Tools"
    }
  },
  {
    id: 7,
    name: "NPK Fertilizer",
    category: "Fertilizers",
    subCategory: "Chemical",
    price: 1800,
    rating: 4.4,
    image: "https://images.pexels.com/photos/15013979/pexels-photo-15013979.jpeg",
    description: "Balanced NPK fertilizer for better crop yield",
    inStock: true,
    stockQuantity: 75,
    unit: "kg",
    seller: {
      id: 4,
      name: "Agro Chemicals Nepal"
    }
  },
  {
    id: 8,
    name: "Sprinkler Set",
    category: "Tools",
    subCategory: "Irrigation",
    price: 1500,
    rating: 4.6,
    image: "https://images.pexels.com/photos/2364066/pexels-photo-2364066.jpeg",
    description: "Complete sprinkler set for small to medium farms",
    inStock: true,
    stockQuantity: 25,
    unit: "set",
    seller: {
      id: 5,
      name: "Modern Agro Tools"
    }
  },
  {
    id: 9,
    name: "Cauliflower Seeds",
    category: "Seeds",
    subCategory: "Vegetables",
    price: 180,
    rating: 4.7,
    image: "https://images.pexels.com/photos/6157059/pexels-photo-6157059.jpeg",
    description: "High-quality cauliflower seeds for winter season",
    inStock: true,
    stockQuantity: 150,
    unit: "packet",
    seller: {
      id: 2,
      name: "Nepal Seeds Co."
    }
  },
  {
    id: 10,
    name: "Pruning Shears",
    category: "Tools",
    subCategory: "Manual Tools",
    price: 750,
    rating: 4.5,
    image: "https://images.pexels.com/photos/2736497/pexels-photo-2736497.jpeg",
    description: "Sharp and durable pruning shears for gardening",
    inStock: true,
    stockQuantity: 40,
    unit: "piece",
    seller: {
      id: 1,
      name: "Krishna Agricultural Tools"
    }
  }
];

export const categories = [
  {
    id: 1,
    name: "Tools",
    subCategories: ["Manual Tools", "Irrigation", "Power Tools"],
    image: "https://images.pexels.com/photos/296230/pexels-photo-296230.jpeg"
  },
  {
    id: 2,
    name: "Seeds",
    subCategories: ["Vegetables", "Grains", "Fruits", "Spices"],
    image: "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg"
  },
  {
    id: 3,
    name: "Fertilizers",
    subCategories: ["Organic", "Chemical", "Micronutrients"],
    image: "https://images.pexels.com/photos/9691410/pexels-photo-9691410.jpeg"
  },
  {
    id: 4,
    name: "Pesticides",
    subCategories: ["Organic", "Chemical", "Biological"],
    image: "https://images.pexels.com/photos/15013979/pexels-photo-15013979.jpeg"
  }
]; 