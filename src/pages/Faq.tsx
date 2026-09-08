import { Container, Section } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Accordion } from "@/components/ui/Accordion";
import { faqs } from "@/data/content";

export function Faq() {
  return (
    <div>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
        title="Frequently Asked Questions"
      />
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl">
            <Accordion
              defaultOpenId="q0"
              items={faqs.map((faq, i) => ({
                id: `q${i}`,
                title: faq.question,
                content: faq.answer,
              }))}
            />
          </div>
        </Container>
      </Section>
    </div>
  );
}
