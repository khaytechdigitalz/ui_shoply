import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/store/StoreContext";
import { products } from "@/data/products";

export function Wishlist() {
  const { wishlist } = useStore();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]} title="My Wishlist" />
      <Section>
        <Container>
          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <Heart className="text-gray-tertiary size-20" />
              <h2 className="text-gray-primary text-xl font-bold">Your wishlist is empty</h2>
              <p className="text-gray-secondary">
                Tap the heart icon on any product to save it here.
              </p>
              <Link to="/products">
                <Button>Browse Products</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}
