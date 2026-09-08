import { Container, Section } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

const sections = [
  {
    title: "Account Responsibilities",
    body: "You're responsible for maintaining the confidentiality of your account login credentials and for all activity under your account. Notify us immediately of any unauthorized access.",
  },
  {
    title: "Acceptable Use",
    body: "You agree not to attempt unauthorized access to our systems, abuse promotional offers or discount codes, or use the marketplace for any unlawful purpose.",
  },
  {
    title: "Orders & Delivery",
    body: "Delivery dates shown at checkout are estimates, not guarantees. While we work closely with our delivery and logistics partners to minimize delayed deliveries, occasional delays can occur due to circumstances outside our control.",
  },
  {
    title: "Vendor Marketplace",
    body: "Storly is a multi-vendor marketplace. Individual vendors are responsible for the accuracy of their own product listings, pricing, and fulfillment, though we monitor for quality and genuine reviews across the platform.",
  },
  {
    title: "Changes to These Terms",
    body: "We may update these terms from time to time. Continued use of the platform after changes are posted constitutes acceptance of the revised terms.",
  },
];

export function TermsAndConditions() {
  return (
    <div>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Terms & Conditions" }]}
        title="Terms & Conditions"
      />
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl space-y-8">
            <p className="text-gray-secondary text-sm">Last updated: January 2026</p>
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-gray-primary mb-2 text-lg font-bold">{s.title}</h2>
                <p className="text-gray-secondary text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
