import { Link } from "react-router-dom";
import { Calendar, MessageCircle } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { blogPosts } from "@/data/content";
import { getImageSrc } from "@/lib/utils";

export function BlogList() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} title="Our Blog" />
      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.concat(blogPosts.map((b) => ({ ...b, id: `${b.id}-2` }))).map((post) => (
              <Link
                key={post.id}
                to={`/blog-details?id=${post.id}`}
                className="group flex flex-col gap-4 rounded-2xl border border-gray-300 p-4 transition-shadow hover:shadow-regular"
              >
                <div className="aspect-16/10 overflow-hidden rounded-xl">
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
                <h3 className="text-gray-primary group-hover:text-primary-main line-clamp-2 text-lg font-semibold">
                  {post.title}
                </h3>
                <p className="text-gray-secondary line-clamp-2 text-sm">{post.excerpt}</p>
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
    </div>
  );
}
