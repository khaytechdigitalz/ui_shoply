import { Link } from "react-router-dom";
import { GitCompare, X, ShoppingCart } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Rating } from "@/components/ui/Rating";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/store/StoreContext";
import { products } from "@/data/products";
import { formatCurrency, getImageSrc } from "@/lib/utils";

export function CompareList() {
  const { compareList, toggleCompare, addToCart } = useStore();
  const items = products.filter((p) => compareList.includes(p.id));

  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Compare" }]} title="Compare Products" />
      <Section>
        <Container>
          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <GitCompare className="text-gray-tertiary size-20" />
              <h2 className="text-gray-primary text-xl font-bold">No products to compare</h2>
              <p className="text-gray-secondary">
                Tap the compare icon on any product to add it here.
              </p>
              <Link to="/products">
                <Button>Browse Products</Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] table-fixed border-separate border-spacing-4">
                <tbody>
                  <tr>
                    {items.map((p) => (
                      <td key={p.id} className="w-56 rounded-2xl border border-gray-300 p-4 align-top">
                        <button
                          onClick={() => toggleCompare(p.id)}
                          className="text-gray-tertiary hover:text-error-dark mb-2 float-right cursor-pointer"
                        >
                          <X className="size-4" />
                        </button>
                        <div className="mb-3 aspect-square overflow-hidden rounded-lg">
                          <img src={getImageSrc(p.image)} alt={p.name} loading="lazy" className="size-full object-cover" />
                        </div>
                        <h3 className="text-gray-primary mb-2 line-clamp-2 text-sm font-semibold">
                          {p.name}
                        </h3>
                        <Rating value={p.rating} reviewCount={p.reviewCount} className="mb-2" />
                        <p className="text-gray-primary mb-3 text-lg font-bold">
                          {formatCurrency(p.price)}
                        </p>
                        <Button
                          size="sm"
                          fullWidth
                          icon={<ShoppingCart className="size-4" />}
                          onClick={() => addToCart(p)}
                        >
                          Add to Cart
                        </Button>
                      </td>
                    ))}
                  </tr>
                  {(
                    [
                      ["Category", (p) => p.category],
                      ["Vendor", (p) => p.vendor],
                      ["Unit", (p) => p.unit],
                      ["Availability", (p) => (p.inStock ? "In Stock" : "Out of Stock")],
                    ] as Array<[string, (p: (typeof items)[number]) => string | undefined]>
                  ).map(([label, getValue]) => (
                    <tr key={label}>
                      {items.map((p) => (
                        <td key={p.id} className="text-gray-secondary rounded-xl border border-gray-200 p-4 text-sm">
                          <span className="text-gray-primary font-medium">{label}: </span>
                          {getValue(p)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}
