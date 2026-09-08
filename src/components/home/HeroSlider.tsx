import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { Truck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getImageSrc } from "@/lib/utils";

const slides = [
  {
    eyebrow: "Fresh Grocery Delivery",
    title: "Farm Fresh Groceries, Delivered To Your Door",
    subtitle: "Get up to 40% off your first order from local vendors near you.",
    cta: "Shop Now",
    image: "images/hero/hero-slide-1.jpg",
    href: "/products",
  },
  {
    eyebrow: "Seasonal Harvest",
    title: "Rare Fruits & Crisp Vegetables, Picked Daily",
    subtitle: "Support local farmers while stocking your kitchen with the best.",
    cta: "Explore Produce",
    image: "images/hero/hero-slide-2.jpg",
    href: "/products",
  },
  {
    eyebrow: "Winter Sale",
    title: "Save Big On Pantry Essentials This Week",
    subtitle: "Bundle deals and free delivery on orders over $50.",
    cta: "View Deals",
    image: "images/hero/hero-slide-3.jpg",
    href: "/products",
  },
];

export function HeroSlider() {
  return (
    <section className="relative w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, el: ".hero-pagination" }}
        loop
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div className="relative flex h-[420px] w-full items-center overflow-hidden sm:h-[480px] md:h-[560px]">
              <img
                src={getImageSrc(slide.image)}
                alt={slide.title}
                className="absolute inset-0 size-full object-cover"
              />
              <div className="from-gray-900/85 via-gray-900/40 absolute inset-0 bg-gradient-to-r to-transparent" />
              <Container className="relative z-10">
                <div className="max-w-xl">
                  <span className="bg-success-light text-gray-800 mb-4 inline-block rounded-full px-3 py-1 text-xs font-medium">
                    {slide.eyebrow}
                  </span>
                  <h1 className="mb-4 text-3xl leading-tight font-extrabold text-white md:text-5xl">
                    {slide.title}
                  </h1>
                  <p className="mb-6 max-w-md text-base text-white/85">
                    {slide.subtitle}
                  </p>
                  <Link to={slide.href}>
                    <Button size="lg">{slide.cta}</Button>
                  </Link>
                </div>
              </Container>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="hero-pagination absolute inset-x-0 bottom-6 z-10 flex justify-center gap-2" />

      <div className="bg-primary-lighter/30 py-4">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm">
            <span className="text-gray-secondary flex items-center gap-2">
              <Truck className="text-primary-main size-5" /> Free delivery over $50
            </span>
            <span className="text-gray-secondary flex items-center gap-2">
              <Truck className="text-primary-main size-5" /> Same-day delivery available
            </span>
            <span className="text-gray-secondary flex items-center gap-2">
              <Truck className="text-primary-main size-5" /> 100+ trusted local vendors
            </span>
          </div>
        </Container>
      </div>
    </section>
  );
}
