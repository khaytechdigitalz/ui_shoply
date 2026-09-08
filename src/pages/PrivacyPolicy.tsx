import { Container, Section } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

const sections = [
  {
    title: "Information We Collect",
    body: "We collect account login credentials, billing and payment information, and delivery details you provide when creating an account or placing an order. We also automatically collect device, browser, and IP address information, along with cookies and usage analytics data to help us improve the platform.",
  },
  {
    title: "How We Use Your Information",
    body: "Your information is used to process orders, provide customer support, personalize your shopping experience, analyze traffic and performance, and run fraud prevention checks. We never sell your personal data to third parties.",
  },
  {
    title: "Who We Share Data With",
    body: "We share only what's necessary with delivery and logistics partners, payment processors, analytics providers, and customer support tools — each bound by strict data protection agreements.",
  },
  {
    title: "Your Rights",
    body: "You can access your personal data, request corrections, or delete your account at any time from your dashboard settings. Contact our support team if you need help exercising any of these rights.",
  },
  {
    title: "Cookies",
    body: "We use cookies to keep you signed in, remember your cart, and understand how our storefront is used so we can keep improving it.",
  },
];

export function PrivacyPolicy() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} title="Privacy Policy" />
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
