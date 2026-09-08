import type { BlogPost, Category, FaqItem, Testimonial, Vendor } from "@/types";

const CATEGORY_NAMES = [
  "Grocery",
  "Bakery",
  "Ice Cream",
  "Energy Drinks",
  "Chocolate",
  "Honey & Jam",
  "Frozen Foods",
  "Fruits & Vegetables",
  "Dairy & Eggs",
  "Snacks",
];

export const categories: Category[] = CATEGORY_NAMES.map((name, i) => ({
  id: `cat-${i + 1}`,
  name,
  image: `images/categories/category-${i + 1}.jpg`,
  itemCount: 12 + ((i * 17) % 90),
}));

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    slug: "blog-1",
    title: "5 Simple Ways to Eat More Sustainably This Year",
    image: "images/blog/blog-1.jpg",
    excerpt:
      "Small changes to how you shop for groceries can make a big difference for the planet.",
    date: "Jan 12, 2026",
    author: "Alicia Moore",
    category: "Lifestyle",
    commentCount: 12,
  },
  {
    id: "blog-2",
    slug: "blog-2",
    title: "Why Farm-Fresh Produce Tastes Better (And Is Better For You)",
    image: "images/blog/blog-2.jpg",
    excerpt:
      "We break down the nutritional and flavor differences between farm-fresh and store-bought produce.",
    date: "Feb 03, 2026",
    author: "James Carter",
    category: "Health",
    commentCount: 8,
  },
  {
    id: "blog-3",
    slug: "blog-3",
    title: "A Beginner's Guide to Meal Prepping on a Budget",
    image: "images/blog/blog-3.jpg",
    excerpt:
      "Save time and money every week with these simple batch-cooking strategies.",
    date: "Feb 21, 2026",
    author: "Dana Kim",
    category: "Recipes",
    commentCount: 20,
  },
  {
    id: "blog-4",
    slug: "blog-4",
    title: "How to Read Nutrition Labels Like a Pro",
    image: "images/blog/blog-4.jpg",
    excerpt:
      "Cut through the marketing jargon and understand what's actually in your food.",
    date: "Mar 05, 2026",
    author: "Alicia Moore",
    category: "Health",
    commentCount: 5,
  },
];

export const vendors: Vendor[] = Array.from({ length: 9 }, (_, i) => ({
  id: `vendor-${i + 1}`,
  slug: `vendor-${i + 1}`,
  name: ["Brown Shop", "Green Basket", "Urban Grocer", "Fresh Mart", "Daily Harvest"][i % 5],
  logo: `images/vendors/vendor-${i + 1}.jpg`,
  cover: `images/categories/category-${(i % 10) + 1}.jpg`,
  rating: Number((3.8 + ((i * 5) % 12) / 10).toFixed(1)),
  reviewCount: 40 + ((i * 21) % 300),
  productCount: 30 + ((i * 17) % 200),
  location: ["Illinois, USA", "Texas, USA", "Ohio, USA", "Nevada, USA"][i % 4],
  description:
    "A trusted seller of fresh, quality goods delivered right to your doorstep.",
}));

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Courtney Henry",
    role: "Verified Buyer",
    avatar: "images/avatars/avatar-1.jpg",
    rating: 5,
    quote:
      "The quality of the produce is outstanding and delivery is always right on time. Storly is now my go-to for groceries.",
  },
  {
    id: "t2",
    name: "Devon Lane",
    role: "Verified Buyer",
    avatar: "images/avatars/avatar-2.jpg",
    rating: 5,
    quote:
      "Great prices, easy checkout, and the vendor selection means I can find everything I need in one place.",
  },
  {
    id: "t3",
    name: "Jenny Wilson",
    role: "Verified Buyer",
    avatar: "images/avatars/avatar-3.jpg",
    rating: 4,
    quote:
      "Customer support was quick to help when I had an issue with an order. Overall a very smooth experience.",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "How long does delivery take?",
    answer:
      "Most orders arrive within 1-3 business days depending on your location and the vendor you order from. Express delivery is available at checkout for select areas.",
  },
  {
    question: "Can I return a product if I'm not satisfied?",
    answer:
      "Yes, we offer a 14-day return policy on most items. Perishable goods must be reported within 24 hours of delivery for a refund or replacement.",
  },
  {
    question: "Do you offer support for multiple vendors in one order?",
    answer:
      "Absolutely. Storly is a multi-vendor marketplace, so your cart can contain items from several sellers, each shipped and tracked separately.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept all major debit/credit cards, PayPal, and select digital wallets. All payments are processed securely.",
  },
  {
    question: "How do I become a vendor on Storly?",
    answer:
      "Select the vendor account option during sign up and complete your store profile. Our team reviews new vendor applications within 2 business days.",
  },
];

export const navLinks = {
  pages: [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/term-and-conditions" },
  ],
};
