import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Rating } from "@/components/ui/Rating";
import { formatCurrency, cn, getImageSrc } from "@/lib/utils";
import { useStore } from "@/store/StoreContext";
import type { Product } from "@/types";

export function ProductCard({
  product,
  onQuickView,
  className,
}: {
  product: Product;
  onQuickView?: (product: Product) => void;
  className?: string;
}) {
  const { toggleWishlist, isWishlisted, addToCart } = useStore();
  const liked = isWishlisted(product.id);

  return (
    <article
      className={cn(
        "group flex h-full flex-col gap-3.5 rounded-xl border border-gray-300 p-4 transition-shadow hover:shadow-regular",
        className,
      )}
    >
      <div className="relative">
        <Link
          to={`/product-details-1?id=${product.id}`}
          className="relative block aspect-square overflow-hidden rounded-lg"
        >
          <img
            src={getImageSrc(product.image)}
            alt={product.name}
            loading="lazy"
            className="size-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </Link>

        {product.discountPercent && (
          <span className="bg-error-dark absolute top-2 left-2 rounded-full px-2 py-1 text-xs font-medium text-white uppercase">
            {product.discountPercent}% off
          </span>
        )}

        <button
          onClick={() => toggleWishlist(product.id)}
          className={cn(
            "absolute top-3 right-3 flex size-8 cursor-pointer items-center justify-center rounded-full transition-all duration-300",
            liked ? "bg-error-dark text-white" : "bg-white text-gray-secondary",
          )}
          aria-label="Toggle wishlist"
        >
          <Heart className={cn("size-4", liked && "fill-current")} />
        </button>

        {onQuickView && (
          <button
            onClick={() => onQuickView(product)}
            className="text-gray-primary absolute bottom-3 left-1/2 flex h-9 -translate-x-1/2 translate-y-3 cursor-pointer items-center gap-1.5 rounded-full bg-white px-4 text-xs font-medium opacity-0 shadow-regular transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <Eye className="size-3.5" /> Quick View
          </button>
        )}
      </div>

      <h3 className="text-gray-primary hover:text-primary-main line-clamp-2 min-h-12 text-base leading-6 font-medium">
        <Link to={`/product-details-1?id=${product.id}`}>{product.name}</Link>
      </h3>

      <Rating value={product.rating} reviewCount={product.reviewCount} />

      <div className="flex items-center gap-2">
        <span className="text-gray-primary text-lg font-bold">
          {formatCurrency(product.price)}
        </span>
        {product.oldPrice && (
          <span className="text-gray-tertiary text-sm line-through">
            {formatCurrency(product.oldPrice)}
          </span>
        )}
      </div>

      <button
        onClick={() => addToCart(product)}
        className="bg-primary-main hover:bg-primary-main-dark text-success-light mt-auto flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 hover:text-white"
      >
        <ShoppingCart className="size-4.5" />
        Add to Cart
      </button>
    </article>
  );
}
