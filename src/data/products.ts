import type { Product } from "@/types";

const catalog: Array<{ name: string; category: string; unit: string; description: string }> = [
  { name: "Farm Fresh Milk", category: "Dairy & Eggs", unit: "1L", description: "Pure pasteurized whole milk from grass-fed cows, delivered chilled." },
  { name: "Free-Range Eggs (12 pack)", category: "Dairy & Eggs", unit: "12 pcs", description: "Free-range eggs from open-pasture hens, rich in flavor and nutrients." },
  { name: "Artisan Sourdough Bread", category: "Bakery", unit: "1 loaf", description: "Slow-fermented sourdough baked fresh every morning." },
  { name: "Cold Pressed Orange Juice", category: "Grocery", unit: "1L", description: "100% cold-pressed oranges, no added sugar or preservatives." },
  { name: "Crisp Mixed Vegetable Box", category: "Fruits & Vegetables", unit: "1kg", description: "A seasonal mix of the crispest vegetables from local farms." },
  { name: "Premium Atlantic Salmon Fillet", category: "Grocery", unit: "500g", description: "Wild-caught Atlantic salmon fillet, ready to cook." },
  { name: "Exotic Fruit Basket", category: "Fruits & Vegetables", unit: "1 basket", description: "A hand-picked assortment of rare and seasonal fruits." },
  { name: "Mixed Nuts Treasure Pack", category: "Snacks", unit: "400g", description: "Roasted almonds, cashews, and pistachios in one resealable pack." },
  { name: "Honey & Jam Gift Box", category: "Honey & Jam", unit: "1 set", description: "Raw wildflower honey paired with small-batch fruit preserves." },
  { name: "Citrus Energy Drink", category: "Energy Drinks", unit: "250ml", description: "A refreshing citrus energy drink with natural caffeine." },
  { name: "Green Detox Juice (3-Pack)", category: "Grocery", unit: "3 x 300ml", description: "Cold-pressed greens blended for a clean, refreshing detox." },
  { name: "Spicy Instant Noodles", category: "Snacks", unit: "5 pack", description: "Bold, spicy instant noodles ready in three minutes." },
  { name: "Frozen Garden Peas", category: "Frozen Foods", unit: "900g", description: "Flash-frozen peas that lock in freshness and nutrients." },
  { name: "Vanilla Bean Ice Cream", category: "Ice Cream", unit: "1L tub", description: "Creamy vanilla bean ice cream made with real Madagascar vanilla." },
  { name: "Whole Grain Pasta", category: "Grocery", unit: "500g", description: "100% whole grain pasta, high in fiber and slow-release energy." },
  { name: "Extra Virgin Olive Oil", category: "Grocery", unit: "750ml", description: "Cold-extracted extra virgin olive oil with a rich, fruity finish." },
  { name: "Chocolate Chip Cookies", category: "Snacks", unit: "Family pack", description: "Soft-baked cookies loaded with Belgian chocolate chips." },
  { name: "Grass-Fed Ground Beef", category: "Grocery", unit: "1kg", description: "Lean, grass-fed ground beef sourced from local ranches." },
  { name: "Sparkling Mineral Water", category: "Energy Drinks", unit: "6 pack", description: "Naturally sourced sparkling mineral water, zero calories." },
  { name: "Basmati Rice", category: "Grocery", unit: "5kg bag", description: "Aged long-grain basmati rice with a naturally fragrant aroma." },
  { name: "Creamy Almond Butter", category: "Grocery", unit: "350g", description: "Stone-ground almond butter with no added sugar." },
  { name: "Greek Yogurt", category: "Dairy & Eggs", unit: "500g", description: "Thick, protein-rich Greek yogurt strained the traditional way." },
  { name: "Blueberry Jam", category: "Honey & Jam", unit: "300g", description: "Small-batch blueberry jam made with real fruit." },
  { name: "Aged Cheddar Cheese", category: "Dairy & Eggs", unit: "250g", description: "Sharp, aged cheddar with a rich, nutty finish." },
  { name: "Dark Chocolate Bar 70%", category: "Chocolate", unit: "100g", description: "Single-origin dark chocolate bar, 70% cocoa." },
  { name: "Herbal Tea Sampler", category: "Grocery", unit: "20 bags", description: "A calming sampler of chamomile, mint, and rooibos herbal teas." },
  { name: "Roasted Coffee Beans", category: "Grocery", unit: "1kg", description: "Medium-roast single-origin coffee beans, freshly roasted." },
  { name: "Granola Bars (Box of 12)", category: "Snacks", unit: "12 bars", description: "Oat and honey granola bars, perfect for on-the-go snacking." },
  { name: "Coconut Water", category: "Energy Drinks", unit: "1L", description: "100% natural coconut water, packed with electrolytes." },
  { name: "Crunchy Peanut Butter", category: "Grocery", unit: "400g", description: "Roasted peanut butter with a satisfying crunchy texture." },
  { name: "Classic Tomato Sauce", category: "Grocery", unit: "500g", description: "Slow-simmered tomato sauce made from vine-ripened tomatoes." },
  { name: "Organic Brown Rice", category: "Grocery", unit: "2kg", description: "Wholesome organic brown rice, a fiber-rich pantry staple." },
  { name: "Multigrain Breakfast Cereal", category: "Bakery", unit: "500g", description: "A hearty blend of oats, wheat, and multigrain flakes." },
  { name: "Frozen Mixed Berries", category: "Frozen Foods", unit: "600g", description: "Flash-frozen strawberries, blueberries, and raspberries." },
  { name: "Sea Salt Kettle Chips", category: "Snacks", unit: "150g", description: "Thick-cut kettle chips finished with flaky sea salt." },
  { name: "Chocolate Protein Bars", category: "Snacks", unit: "6 pack", description: "20g of protein per bar in a rich chocolate coating." },
  { name: "Pure Maple Syrup", category: "Honey & Jam", unit: "500ml", description: "Grade A maple syrup tapped and bottled in small batches." },
  { name: "Baby Spinach Pack", category: "Fruits & Vegetables", unit: "200g", description: "Tender, pre-washed baby spinach ready for salads or cooking." },
  { name: "Ripe Avocado Pack (4)", category: "Fruits & Vegetables", unit: "4 pcs", description: "Perfectly ripened avocados, ready to eat within a day or two." },
  { name: "Sourdough Bagels (6 pack)", category: "Bakery", unit: "6 pcs", description: "Chewy sourdough bagels baked fresh in small batches." },
];

const vendors = ["Brown Shop", "Green Basket", "Urban Grocer", "Fresh Mart", "Daily Harvest"];

function makeProduct(i: number): Product {
  const item = catalog[i];
  const price = Number((3.49 + ((i * 37) % 45) + 0.5).toFixed(2));
  const hasDiscount = i % 3 === 0;
  const discountPercent = hasDiscount ? [10, 15, 20, 25][i % 4] : undefined;
  const oldPrice = hasDiscount
    ? Number((price / (1 - (discountPercent ?? 0) / 100)).toFixed(2))
    : undefined;

  return {
    id: `product-${i + 1}`,
    slug: `product-${i + 1}`,
    name: item.name,
    image: `images/products/product-${i + 1}.jpg`,
    gallery: [
      `images/products/product-${i + 1}.jpg`,
      `images/products/product-${((i + 7) % catalog.length) + 1}.jpg`,
      `images/products/product-${((i + 13) % catalog.length) + 1}.jpg`,
      `images/products/product-${((i + 21) % catalog.length) + 1}.jpg`,
    ],
    price,
    oldPrice,
    discountPercent,
    rating: Number((3.5 + ((i * 7) % 15) / 10).toFixed(1)),
    reviewCount: 10 + ((i * 13) % 240),
    vendor: vendors[i % vendors.length],
    unit: item.unit,
    category: item.category,
    inStock: i % 11 !== 0,
    description: item.description,
  };
}

export const products: Product[] = catalog.map((_, i) => makeProduct(i));

export function getProductById(id: string | null | undefined) {
  return products.find((p) => p.id === id) ?? products[0];
}

export const bestSellingCategories = [
  "All Products",
  "Grocery",
  "Fruits & Vegetables",
  "Dairy & Eggs",
  "Snacks",
  "Frozen Foods",
];
