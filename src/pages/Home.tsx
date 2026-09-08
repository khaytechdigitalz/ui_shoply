import { HeroSlider } from "@/components/home/HeroSlider";
import { TrustBadges } from "@/components/home/TrustBadges";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { BestSellingTabs } from "@/components/home/BestSellingTabs";
import { DealsCountdown } from "@/components/home/DealsCountdown";
import { ProductSlider } from "@/components/home/ProductSlider";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { BlogSection } from "@/components/home/BlogSection";
import { products } from "@/data/products";

export function Home() {
  const topRated = [...products].sort((a, b) => b.rating - a.rating).slice(0, 10);
  const newArrivals = [...products].slice(-10).reverse();

  return (
    <div>
      <HeroSlider />
      <TrustBadges />
      <CategoryGrid />
      <BestSellingTabs />
      <DealsCountdown />
      <ProductSlider
        title="Top Rated Products"
        subtitle="Loved by thousands of shoppers"
        products={topRated}
        navPrefix="top-rated"
      />
      <ProductSlider
        title="New Arrivals"
        subtitle="Fresh additions to our catalog"
        products={newArrivals}
        navPrefix="new-arrivals"
      />
      <TestimonialsSection />
      <BlogSection />
    </div>
  );
}
