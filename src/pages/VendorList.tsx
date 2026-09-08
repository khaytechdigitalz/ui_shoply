import { Link } from "react-router-dom";
import { MapPin, Package } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Rating } from "@/components/ui/Rating";
import { vendors } from "@/data/content";
import { getImageSrc } from "@/lib/utils";

export function VendorList() {
  return (
    <div>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Vendors" }]}
        title="All Vendors"
      />
      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vendors.map((vendor) => (
              <Link
                key={vendor.id}
                to={`/vendor-profile?id=${vendor.id}`}
                className="group overflow-hidden rounded-2xl border border-gray-300 transition-shadow hover:shadow-regular"
              >
                <div className="aspect-16/6 overflow-hidden">
                  <img src={getImageSrc(vendor.cover)} alt={`${vendor.name} cover`} loading="lazy" className="size-full object-cover" />
                </div>
                <div className="relative px-5 pt-10 pb-5">
                  <div className="border-primary-lighter absolute -top-8 left-5 size-16 overflow-hidden rounded-full border-4 bg-white">
                    <img src={getImageSrc(vendor.logo)} alt={vendor.name} loading="lazy" className="size-full object-cover" />
                  </div>
                  <h3 className="text-gray-primary group-hover:text-primary-main text-base font-bold">
                    {vendor.name}
                  </h3>
                  <Rating value={vendor.rating} reviewCount={vendor.reviewCount} className="my-2" />
                  <p className="text-gray-tertiary mb-1 flex items-center gap-1.5 text-xs">
                    <MapPin className="size-3.5" /> {vendor.location}
                  </p>
                  <p className="text-gray-tertiary flex items-center gap-1.5 text-xs">
                    <Package className="size-3.5" /> {vendor.productCount} products
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
