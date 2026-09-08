import { Link } from "react-router-dom";
import { Container, Section, SectionHeading } from "@/components/ui/Container";
import { categories } from "@/data/content";
import { getImageSrc } from "@/lib/utils";

export function CategoryGrid() {
  return (
    <Section>
      <Container>
        <SectionHeading title="Shop by Category" subtitle="Browse our most popular departments" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="group flex flex-col items-center gap-3 rounded-xl border border-gray-300 p-4 transition-shadow hover:shadow-regular"
            >
              <div className="bg-primary-lighter/40 size-16 overflow-hidden rounded-full">
                <img src={getImageSrc(cat.image)} alt={cat.name} loading="lazy" className="size-full object-cover" />
              </div>
              <div className="text-center">
                <h3 className="text-gray-primary group-hover:text-primary-main text-sm font-semibold">
                  {cat.name}
                </h3>
                {cat.itemCount && (
                  <p className="text-gray-tertiary text-xs">{cat.itemCount} items</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
