import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { PATHS } from "@/lib/routes";
import BlogIndexPage from "@/components/pages/BlogIndexPage";

export const metadata: Metadata = buildMetadata({
  locale: "nl",
  path: PATHS.nl.blog,
  title: "Blog | Tips & Nieuws van Onze Loodgieters",
  description:
    "Praktische tips en nieuws over loodgietersonderhoud, lekkagepreventie, CV-ketels en badkamerrenovaties, geschreven door onze vakmensen.",
});

export default function Page() {
  const dict = getDictionary("nl");
  const breadcrumbLd = breadcrumbSchema("nl", [{ label: dict.nav.blog, href: PATHS.nl.blog }]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <BlogIndexPage locale="nl" dict={dict} />
    </>
  );
}
