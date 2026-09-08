import { useSearchParams } from "react-router-dom";
import { MapPin, Package, Star, MessageCircle } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Rating } from "@/components/ui/Rating";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { ProductCard } from "@/components/ui/ProductCard";
import { vendors } from "@/data/content";
import { products } from "@/data/products";
import { getImageSrc } from "@/lib/utils";

export function VendorProfile() {
  const [searchParams] = useSearchParams();
  const vendor = vendors.find((v) => v.id === searchParams.get("id")) ?? vendors[0];
  const vendorProducts = products.slice(0, 8);

  return (
    <div>
      <div className="aspect-16/5 overflow-hidden">
        <img src={getImageSrc(vendor.cover)} alt={`${vendor.name} storefront banner`} loading="lazy" className="size-full object-cover" />
      </div>

      <Container>
        <div className="relative mb-8 flex flex-col gap-5 pt-4 sm:flex-row sm:items-end">
          <div className="border-primary-lighter -mt-16 size-28 shrink-0 overflow-hidden rounded-2xl border-4 bg-white shadow-regular">
            <img src={getImageSrc(vendor.logo)} alt={vendor.name} loading="lazy" className="size-full object-cover" />
          </div>
          <div className="flex-1">
            <h1 className="text-gray-primary text-2xl font-bold">{vendor.name}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-4">
              <Rating value={vendor.rating} reviewCount={vendor.reviewCount} />
              <span className="text-gray-tertiary flex items-center gap-1.5 text-sm">
                <MapPin className="size-4" /> {vendor.location}
              </span>
              <span className="text-gray-tertiary flex items-center gap-1.5 text-sm">
                <Package className="size-4" /> {vendor.productCount} products
              </span>
            </div>
          </div>
          <Button icon={<MessageCircle className="size-4" />}>Contact Vendor</Button>
        </div>
      </Container>

      <Section className="pt-0">
        <Container>
          <Tabs
            defaultTabId="products"
            tabs={[
              {
                id: "products",
                label: "Products",
                content: (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {vendorProducts.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                ),
              },
              {
                id: "about",
                label: "About",
                content: (
                  <p className="text-gray-secondary max-w-2xl text-sm leading-relaxed">
                    {vendor.description} {vendor.name} has been serving customers with
                    reliable, high-quality goods and fast shipping across the region.
                  </p>
                ),
              },
              {
                id: "reviews",
                label: `Reviews (${vendor.reviewCount})`,
                content: (
                  <div className="max-w-2xl space-y-5">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="border-b border-gray-200 pb-5">
                        <div className="mb-2 flex items-center gap-2">
                          <Star className="fill-warning-dark text-warning-dark size-4" />
                          <span className="text-gray-primary text-sm font-semibold">
                            Verified Buyer {i + 1}
                          </span>
                        </div>
                        <p className="text-gray-secondary text-sm">
                          Reliable seller, packaging was excellent and delivery was quick.
                        </p>
                      </div>
                    ))}
                  </div>
                ),
              },
            ]}
          />
        </Container>
      </Section>
    </div>
  );
}
