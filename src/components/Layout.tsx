import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { site, siteUrl } from "@/config/site";

type LayoutProps = {
  children: ReactNode;
  onOpenConsult: () => void;
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: `${site.lawyerName} — семейный юрист`,
  url: siteUrl,
  areaServed: {
    "@type": "City",
    name: "Барнаул",
  },
  priceRange: "$$",
  telephone: site.phoneStructured,
  email: site.email,
  address: site.postalAddress,
};

export function Layout({ children, onOpenConsult }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={organizationLd} />
      <Header onOpenConsult={onOpenConsult} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
