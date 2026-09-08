import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Heart, GitCompare, ShoppingCart, Minus, Plus, Truck, ShieldCheck } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Rating } from "@/components/ui/Rating";
import { Button } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Tabs } from "@/components/ui/Tabs";
import { ProductSlider } from "@/components/home/ProductSlider";
import { getProductById, products } from "@/data/products";
import { useStore } from "@/store/StoreContext";
import { formatCurrency, cn, getImageSrc } from "@/lib/utils";

export function ProductDetails() {
  const [searchParams] = useSearchParams();
  const product = getProductById(searchParams.get("id"));
  const [quantity, setQuantity] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);
  const { addToCart, toggleWishlist, isWishlisted, toggleCompare, isCompared } = useStore();

  const related = products.filter((p) => p.id !== product.id).slice(0, 10);

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/products" },
          { label: product.name },
        ]}
      />
      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-4 aspect-square overflow-hidden rounded-2xl">
                <img
                  src={getImageSrc((product.gallery ?? [product.image])[activeThumb] ?? product.image)}
                  alt={product.name}
                  className="size-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-3">
                {(product.gallery ?? [product.image]).map((img, i) => (
                  <button
                    key={img + i}
                    onClick={() => setActiveThumb(i)}
                    className={cn(
                      "aspect-square overflow-hidden rounded-lg border-2",
                      activeThumb === i ? "border-primary-main" : "border-transparent",
                    )}
                  >
                    <img
                      src={getImageSrc(img)}
                      alt={`${product.name} ${i + 1}`}
                      loading="lazy"
                      className="size-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              {product.vendor && (
                <p className="text-primary-main mb-2 text-sm font-medium">{product.vendor}</p>
              )}
              <h1 className="text-gray-primary mb-3 text-2xl font-bold md:text-32">
                {product.name}
              </h1>
              <Rating value={product.rating} reviewCount={product.reviewCount} className="mb-4" />

              <div className="mb-5 flex items-center gap-3">
                <span className="text-gray-primary text-3xl font-bold">
                  {formatCurrency(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-gray-tertiary text-lg line-through">
                    {formatCurrency(product.oldPrice)}
                  </span>
                )}
                {product.discountPercent && (
                  <span className="bg-error-lighter text-error-dark rounded-full px-2 py-1 text-xs font-medium">
                    {product.discountPercent}% OFF
                  </span>
                )}
              </div>

              <p className="text-gray-secondary mb-6 text-sm leading-relaxed">
                Sourced fresh and delivered with care. This {product.category?.toLowerCase()}{" "}
                item is a favorite among our regular customers for its quality and value —
                perfect for {product.unit} servings.
              </p>

              <div className="mb-6 flex flex-wrap items-center gap-4">
                <QuantityStepper value={quantity} onChange={setQuantity} />
                <Button
                  size="lg"
                  className="flex-1"
                  icon={<ShoppingCart className="size-4.5" />}
                  onClick={() => addToCart(product, quantity)}
                >
                  Add to Cart
                </Button>
              </div>

              <div className="mb-6 flex items-center gap-3">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={cn(
                    "border-gray-tertiary/32 flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors",
                    isWishlisted(product.id) &&
                      "border-error-dark text-error-dark",
                  )}
                >
                  <Heart className={cn("size-4", isWishlisted(product.id) && "fill-current")} />
                  Wishlist
                </button>
                <button
                  onClick={() => toggleCompare(product.id)}
                  className={cn(
                    "border-gray-tertiary/32 flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors",
                    isCompared(product.id) && "border-primary-main text-primary-main",
                  )}
                >
                  <GitCompare className="size-4" />
                  Compare
                </button>
              </div>

              <div className="space-y-3 rounded-xl border border-gray-300 p-4">
                <p className="text-gray-secondary flex items-center gap-2 text-sm">
                  <Truck className="text-primary-main size-4" /> Free delivery on orders over $50
                </p>
                <p className="text-gray-secondary flex items-center gap-2 text-sm">
                  <ShieldCheck className="text-primary-main size-4" /> Quality guaranteed or your money back
                </p>
              </div>
            </div>
          </div>

          <div className="mt-14">
            <Tabs
              defaultTabId="description"
              tabs={[
                {
                  id: "description",
                  label: "Description",
                  content: (
                    <div className="text-gray-secondary max-w-3xl space-y-4 text-sm leading-relaxed">
                      <p>
                        {product.name} is carefully selected from trusted vendors to guarantee
                        freshness and quality with every order. Stored and shipped under
                        optimal conditions.
                      </p>
                      <p>
                        Unit size: {product.unit}. Category: {product.category}. Vendor:{" "}
                        {product.vendor}.
                      </p>
                    </div>
                  ),
                },
                {
                  id: "reviews",
                  label: `Reviews (${product.reviewCount})`,
                  content: (
                    <div className="max-w-2xl space-y-5">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="border-b border-gray-200 pb-5">
                          <div className="mb-2 flex items-center gap-3">
                            <div className="bg-primary-lighter size-9 shrink-0 overflow-hidden rounded-full" />
                            <div>
                              <p className="text-gray-primary text-sm font-semibold">
                                Customer {i + 1}
                              </p>
                              <Rating value={4 + (i % 2)} />
                            </div>
                          </div>
                          <p className="text-gray-secondary text-sm">
                            Great quality and fast delivery. Will definitely order again.
                          </p>
                        </div>
                      ))}
                    </div>
                  ),
                },
                {
                  id: "shipping",
                  label: "Shipping & Returns",
                  content: (
                    <p className="text-gray-secondary max-w-2xl text-sm leading-relaxed">
                      Orders are shipped within 24 hours. Returns are accepted within 14 days
                      of delivery for unopened or defective items.
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </Container>
      </Section>

      <ProductSlider title="You May Also Like" products={related} navPrefix="related-products" />
    </div>
  );
}
