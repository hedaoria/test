import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import "../globals.css";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { HTML_LANG, OG_LOCALE } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale, localeParams } from "@/lib/i18n/server";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });

export const dynamicParams = false;

export function generateStaticParams() {
  return localeParams();
}

export async function generateMetadata(props: LayoutProps<"/[lang]">): Promise<Metadata> {
  const locale = await getLocale(props.params);
  const d = getDictionary(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: d.home.metaTitle, template: "%s | Vakconnectie" },
    description: d.home.metaDescription,
    applicationName: SITE_NAME,
    openGraph: { siteName: SITE_NAME, locale: OG_LOCALE[locale], type: "website" },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#1f523d",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout(props: LayoutProps<"/[lang]">) {
  const locale = await getLocale(props.params);
  return (
    <html lang={HTML_LANG[locale]} className={figtree.variable}>
      <body className="min-h-dvh font-sans antialiased">{props.children}</body>
    </html>
  );
}
