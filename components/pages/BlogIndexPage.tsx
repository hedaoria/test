import Link from "next/link";
import { Newspaper, ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import { Dictionary } from "@/lib/i18n";
import { Locale } from "@/lib/site";
import { PATHS } from "@/lib/routes";
import { BLOG_POSTS } from "@/lib/content/blog";
import PageHero from "@/components/sections/PageHero";
import CTASection from "@/components/sections/CTASection";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

const DATE_LOCALE: Record<Locale, string> = { nl: "nl-NL", en: "en-GB" };

export default function BlogIndexPage({ locale, dict }: Props) {
  const paths = PATHS[locale];

  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: dict.nav.blog, href: paths.blog }]} />
      <PageHero
        dict={dict}
        eyebrow={dict.blogSection.eyebrow}
        title={dict.blogSection.title}
        subtitle={dict.blogSection.subtitle}
        icon={Newspaper}
        showCtas={false}
      />

      <section className="container-page py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => {
            const Icon = post.icon;
            const date = new Date(post.publishedAt).toLocaleDateString(DATE_LOCALE[locale], {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            return (
              <Link
                key={post.id}
                href={`${paths.blog}/${post.slug[locale]}`}
                className="group flex flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon className="h-5.5 w-5.5" />
                </span>
                <span className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-600">
                  {post.category[locale]}
                </span>
                <h2 className="mt-2 text-lg font-bold text-ink-900 group-hover:text-brand-700">
                  {post[locale].title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500 line-clamp-3">
                  {post[locale].excerpt}
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs text-ink-400">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock3 className="h-3.5 w-3.5" />
                    {post.readMinutes} {dict.common.minutes}
                  </span>
                </div>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                  {dict.buttons.readMore}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <CTASection dict={dict} locale={locale} />
    </>
  );
}
