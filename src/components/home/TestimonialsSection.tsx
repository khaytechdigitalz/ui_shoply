import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Quote } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/Container";
import { Rating } from "@/components/ui/Rating";
import { getImageSrc } from "@/lib/utils";
import { testimonials } from "@/data/content";

export function TestimonialsSection() {
  return (
    <Section className="bg-primary-lighter/20">
      <Container>
        <SectionHeading
          title="What Our Customers Say"
          subtitle="Real feedback from real shoppers"
          align="center"
        />
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{ 768: { slidesPerView: 3 } }}
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id} className="h-auto">
              <div className="flex h-full flex-col gap-4 rounded-2xl bg-white p-6 shadow-regular">
                <Quote className="text-primary-light size-8" />
                <p className="text-gray-secondary flex-1 text-sm leading-relaxed">
                  "{t.quote}"
                </p>
                <Rating value={t.rating} />
                <div className="flex items-center gap-3">
                  <div className="size-10 shrink-0 overflow-hidden rounded-full">
                    <img src={getImageSrc(t.avatar)} alt={t.name} loading="lazy" className="size-full object-cover" />
                  </div>
                  <div>
                    <p className="text-gray-primary text-sm font-semibold">{t.name}</p>
                    <p className="text-gray-tertiary text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Section>
  );
}
