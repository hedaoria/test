import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { PATHS } from "@/lib/routes";
import { BLOG_POSTS, getBlogPostBySlug } from "@/lib/content/blog";
import BlogPostPage from "@/components/pages/BlogPostPage";

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug.nl }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug("nl", slug);
  if (!post) return {};

  return buildMetadata({
    locale: "nl",
    path: `${PATHS.nl.blog}/${post.slug.nl}`,
    title: post.nl.metaTitle,
    description: post.nl.metaDescription,
  });
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const post = getBlogPostBySlug("nl", slug);
  if (!post) notFound();

  const dict = getDictionary("nl");
  const breadcrumbLd = breadcrumbSchema("nl", [
    { label: dict.nav.blog, href: PATHS.nl.blog },
    { label: post.nl.title, href: `${PATHS.nl.blog}/${post.slug.nl}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <BlogPostPage locale="nl" dict={dict} post={post} />
    </>
  );
}
