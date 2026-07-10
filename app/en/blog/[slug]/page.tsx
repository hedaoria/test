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
  return BLOG_POSTS.map((post) => ({ slug: post.slug.en }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug("en", slug);
  if (!post) return {};

  return buildMetadata({
    locale: "en",
    path: `${PATHS.en.blog}/${post.slug.en}`,
    title: post.en.metaTitle,
    description: post.en.metaDescription,
  });
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const post = getBlogPostBySlug("en", slug);
  if (!post) notFound();

  const dict = getDictionary("en");
  const breadcrumbLd = breadcrumbSchema("en", [
    { label: dict.nav.blog, href: PATHS.en.blog },
    { label: post.en.title, href: `${PATHS.en.blog}/${post.slug.en}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <BlogPostPage locale="en" dict={dict} post={post} />
    </>
  );
}
