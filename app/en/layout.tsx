import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import LocaleLayout from "@/components/layout/LocaleLayout";
import { localBusinessSchema, organizationJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AquaFix Loodgieter | 24/7 Emergency Plumber in the Netherlands",
    template: "%s | AquaFix Loodgieter",
  },
  description:
    "AquaFix Loodgieter: your reliable plumber across the Netherlands. 24/7 emergency service, leak detection, drain unblocking, sewer services, boiler repair and bathroom renovation.",
  applicationName: "AquaFix Loodgieter",
  authors: [{ name: "AquaFix Loodgieter" }],
  keywords: [
    "plumber netherlands",
    "emergency plumber",
    "leak detection",
    "drain unblocking",
    "sewer service",
    "boiler repair",
    "bathroom renovation",
    "reliable plumber",
    "professional plumber",
  ],
  icons: {
    icon: "/images/logo.svg",
    shortcut: "/images/logo.svg",
  },
  verification: {
    google: "google-site-verification-code-placeholder",
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-white text-ink-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema("en")) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <LocaleLayout locale="en">{children}</LocaleLayout>
      </body>
    </html>
  );
}
