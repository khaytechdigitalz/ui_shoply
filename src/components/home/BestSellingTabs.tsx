import { useState } from "react";
import { Container, Section, SectionHeading } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import { products, bestSellingCategories } from "@/data/products";
import { cn } from "@/lib/utils";

export function BestSellingTabs() {
  const [active, setActive] = useState(bestSellingCategories[0]);

  const filtered =
    active === "All Products"
      ? products.slice(0, 8)
      : products.filter((p) => p.category === active).slice(0, 8);

  return (
    <Section>
      <Container>
        <SectionHeading
          title="Best Selling Products"
          subtitle="Enjoy up to 40% off through the weekend"
          align="center"
        />
        <div className="mx-auto mb-10 flex max-w-3xl flex-nowrap justify-center gap-3 overflow-x-auto">
          {bestSellingCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                "inline-flex shrink-0 items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300",
                active === cat
                  ? "bg-primary-main text-success-light"
                  : "border-gray-tertiary/32 hover:border-primary-main hover:bg-primary-main hover:text-success-light border",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
