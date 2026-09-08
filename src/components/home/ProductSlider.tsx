import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import type { Product } from "@/types";

export function ProductSlider({
  title,
  subtitle,
  products,
  navPrefix,
}: {
  title: string;
  subtitle?: string;
  products: Product[];
  navPrefix: string;
}) {
  return (
    <Section>
      <Container>
        <div className="mb-8 flex items-end justify-between gap-4">
          <SectionHeading title={title} subtitle={subtitle} />
          <div className="mb-2 flex gap-2">
            <button
              className={`${navPrefix}-prev border-gray-tertiary/32 hover:border-primary-main hover:text-primary-main text-gray-secondary flex size-10 items-center justify-center rounded-full border`}
              aria-label="Previous"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              className={`${navPrefix}-next border-gray-tertiary/32 hover:border-primary-main hover:text-primary-main text-gray-secondary flex size-10 items-center justify-center rounded-full border`}
              aria-label="Next"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: `.${navPrefix}-prev`,
            nextEl: `.${navPrefix}-next`,
          }}
          spaceBetween={16}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className="h-auto">
              <ProductCard product={product} className="h-full" />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Section>
  );
}
