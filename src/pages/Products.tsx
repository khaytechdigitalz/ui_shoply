import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, LayoutGrid, List } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductCard } from "@/components/ui/ProductCard";
import { products } from "@/data/products";
import { categories } from "@/data/content";
import { cn } from "@/lib/utils";

const sortOptions = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Highest Rated" },
];

export function Products() {
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");
  const query = searchParams.get("q");

  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(60);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    activeCategory ? [activeCategory] : [],
  );

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.price <= maxPrice);
    if (query) {
      list = list.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
    }
    if (selectedCategories.length) {
      const names = categories
        .filter((c) => selectedCategories.includes(c.id))
        .map((c) => c.name);
      list = list.filter((p) => names.length === 0 || names.includes(p.category ?? ""));
    }
    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "rating":
        return [...list].sort((a, b) => b.rating - a.rating);
      default:
        return list;
    }
  }, [maxPrice, query, selectedCategories, sort]);

  function toggleCategory(id: string) {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  }

  return (
    <div>
      <Breadcrumb
        title={query ? `Search results for "${query}"` : "All Products"}
        items={[{ label: "Home", href: "/" }, { label: "Shop" }]}
      />
      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
            <aside className="space-y-8">
              <div>
                <h3 className="text-gray-primary mb-4 flex items-center gap-2 text-base font-bold">
                  <SlidersHorizontal className="size-4" /> Filter
                </h3>
              </div>
              <div>
                <h4 className="text-gray-primary mb-3 text-sm font-semibold">
                  Categories
                </h4>
                <ul className="space-y-3">
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <label className="text-gray-secondary flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          className="accent-primary-main"
                          checked={selectedCategories.includes(cat.id)}
                          onChange={() => toggleCategory(cat.id)}
                        />
                        {cat.name}
                        <span className="text-gray-tertiary ml-auto text-xs">
                          ({cat.itemCount})
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-gray-primary mb-3 text-sm font-semibold">
                  Price Range
                </h4>
                <input
                  type="range"
                  min={5}
                  max={60}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="size-guide-slider accent-primary-main w-full"
                />
                <div className="text-gray-secondary mt-2 flex justify-between text-xs">
                  <span>$5</span>
                  <span>Up to ${maxPrice}</span>
                </div>
              </div>
            </aside>

            <div>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <p className="text-gray-secondary text-sm">
                  Showing {filtered.length} of {products.length} results
                </p>
                <div className="flex items-center gap-3">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="border-gray-tertiary/32 rounded-full border px-4 py-2 text-sm focus:outline-0"
                  >
                    {sortOptions.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <div className="border-gray-tertiary/32 flex overflow-hidden rounded-full border">
                    <button
                      onClick={() => setView("grid")}
                      className={cn(
                        "flex size-9 items-center justify-center",
                        view === "grid" ? "bg-primary-main text-success-light" : "text-gray-secondary",
                      )}
                    >
                      <LayoutGrid className="size-4" />
                    </button>
                    <button
                      onClick={() => setView("list")}
                      className={cn(
                        "flex size-9 items-center justify-center",
                        view === "list" ? "bg-primary-main text-success-light" : "text-gray-secondary",
                      )}
                    >
                      <List className="size-4" />
                    </button>
                  </div>
                </div>
              </div>

              {filtered.length === 0 ? (
                <p className="text-gray-secondary py-16 text-center">
                  No products match your filters.
                </p>
              ) : (
                <div
                  className={cn(
                    "grid gap-5",
                    view === "grid"
                      ? "grid-cols-2 sm:grid-cols-3 xl:grid-cols-4"
                      : "grid-cols-1",
                  )}
                >
                  {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
