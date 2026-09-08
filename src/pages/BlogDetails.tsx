import { useSearchParams } from "react-router-dom";
import { Calendar, MessageCircle, User } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { blogPosts } from "@/data/content";
import { getImageSrc } from "@/lib/utils";

export function BlogDetails() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const post = blogPosts.find((b) => b.id === id?.replace("-2", "")) ?? blogPosts[0];

  return (
    <div>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog-list" }, { label: post.title }]}
      />
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <span className="text-primary-main mb-3 block text-sm font-medium uppercase">
              {post.category}
            </span>
            <h1 className="text-gray-primary mb-4 text-2xl font-bold md:text-32">
              {post.title}
            </h1>
            <div className="text-gray-tertiary mb-6 flex flex-wrap items-center gap-5 text-sm">
              <span className="flex items-center gap-1.5">
                <User className="size-4" /> {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4" /> {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <MessageCircle className="size-4" /> {post.commentCount} comments
              </span>
            </div>
            <div className="mb-8 aspect-16/9 overflow-hidden rounded-2xl">
              <img src={getImageSrc(post.image)} alt={post.title} loading="lazy" className="size-full object-cover" />
            </div>
            <div className="text-gray-secondary space-y-5 text-base leading-relaxed">
              <p>{post.excerpt}</p>
              <p>
                Eating well doesn't have to be complicated or expensive. With a little
                planning, you can build a routine that keeps your kitchen stocked with
                fresh, wholesome ingredients while cutting down on waste and impulse
                purchases.
              </p>
              <h2 className="text-gray-primary text-xl font-bold">Start small</h2>
              <p>
                Rather than overhauling your entire pantry overnight, focus on one or two
                habits at a time — like shopping from local vendors for produce, or
                planning meals around what's already in season.
              </p>
              <h2 className="text-gray-primary text-xl font-bold">Make it sustainable</h2>
              <p>
                Small, consistent choices compound over time. Whether it's reducing
                packaging waste or supporting smaller vendors on the marketplace, every
                order adds up.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
