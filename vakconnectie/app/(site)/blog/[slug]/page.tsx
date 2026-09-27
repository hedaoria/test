import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { blogPosts, getBlogPost } from "@/lib/data/content";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = getBlogPost((await props.params).slug);
  if (!post) return {};
  return pageMetadata({ title: post.title, description: post.excerpt, path: `/blog/${post.slug}` });
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const post = getBlogPost((await props.params).slug);
  if (!post) notFound();

  return (
    <article className="container-page py-8 sm:py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          author: { "@type": "Organization", name: SITE_NAME },
          publisher: { "@type": "Organization", name: SITE_NAME },
          mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
          inLanguage: "nl-NL",
        }}
      />
      <Breadcrumbs items={[{ name: "Blog", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }]} />
      <div className="mx-auto mt-8 max-w-2xl">
        <p className="text-sm text-stone-500">
          {post.category} · <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <h1 className="mt-2 text-3xl font-semibold leading-tight sm:text-4xl">{post.title}</h1>
        <div className="prose-vc mt-8 text-[1.0625rem]">
          {post.body.map((b, i) => (
            <div key={i}>
              {b.heading && <h2>{b.heading}</h2>}
              <p>{b.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-2xl bg-brand-50 p-6 sm:p-8">
          <h2 className="text-lg font-semibold">Klaar om je klus te plaatsen?</h2>
          <p className="mt-1 text-stone-700">Gratis en vrijblijvend, in een paar minuten geregeld.</p>
          <ButtonLink href="/klus-plaatsen" className="mt-5">Plaats je klus</ButtonLink>
        </div>
      </div>
    </article>
  );
}
