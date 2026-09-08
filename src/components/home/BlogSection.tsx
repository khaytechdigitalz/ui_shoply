import { Link } from "react-router-dom";
import { Calendar, MessageCircle, ArrowRight } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/Container";
import { blogPosts } from "@/data/content";
import { getImageSrc } from "@/lib/utils";

export function BlogSection() {
  return (
    <Section>
      <Container>
        <div className="mb-8 flex items-end justify-between gap-4">
          <SectionHeading title="From Our Blog" subtitle="Tips, recipes, and grocery guides" />
          <Link
            to="/blog-list"
            className="text-primary-main hidden items-center gap-1.5 text-sm font-medium sm:flex"
          >
            View All <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog-details?id=${post.id}`}
              className="group flex flex-col gap-3 rounded-xl border border-gray-300 p-3 transition-shadow hover:shadow-regular"
            >
              <div className="aspect-4/3 overflow-hidden rounded-lg">
                <img
                  src={getImageSrc(post.image)}
                  alt={post.title}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="text-primary-main text-xs font-medium uppercase">
                {post.category}
              </span>
              <h3 className="text-gray-primary group-hover:text-primary-main line-clamp-2 text-base font-semibold">
                {post.title}
              </h3>
              <div className="text-gray-tertiary flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1">
                  <Calendar className="size-3.5" /> {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="size-3.5" /> {post.commentCount}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
