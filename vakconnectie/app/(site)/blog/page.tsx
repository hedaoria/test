import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { blogPosts } from "@/lib/data/content";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Blog: tips voor klussen in en om het huis",
  description: "Praktische tips over klussen omschrijven, een vakman kiezen en onderhoud aan je woning.",
  path: "/blog",
});

export default function BlogIndex() {
  return (
    <div className="container-page py-8 sm:py-12">
      <Breadcrumbs items={[{ name: "Blog", path: "/blog" }]} />
      <h1 className="mt-6 text-3xl font-semibold sm:text-4xl">Blog</h1>
      <p className="mt-3 max-w-2xl text-lg text-stone-600">Praktische tips voor klussen in en om het huis.</p>
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {blogPosts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="card card-hover group flex h-full flex-col p-6">
              <span className="text-sm text-stone-500">{p.category} · {formatDate(p.date)}</span>
              <h2 className="mt-2 text-lg font-semibold leading-snug group-hover:text-brand-700">{p.title}</h2>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-stone-600">{p.excerpt}</p>
              <span className="mt-auto pt-5 text-sm font-semibold text-brand-700">Lees verder →</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
