import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { PATHS } from "@/lib/routes";
import BlogIndexPage from "@/components/pages/BlogIndexPage";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  path: PATHS.en.blog,
  title: "Blog | Tips & News From Our Plumbers",
  description:
    "Practical tips and news on plumbing maintenance, leak prevention, boilers, and bathroom renovations, written by our professionals.",
});

export default function Page() {
  const dict = getDictionary("en");
  const breadcrumbLd = breadcrumbSchema("en", [{ label: dict.nav.blog, href: PATHS.en.blog }]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <BlogIndexPage locale="en" dict={dict} />
    </>
  );
}
