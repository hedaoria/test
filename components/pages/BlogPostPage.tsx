import Link from "next/link";
import { CalendarDays, Clock3, ArrowLeft, Phone, MessageCircle } from "lucide-react";
import { Dictionary } from "@/lib/i18n";
import { Locale, BUSINESS } from "@/lib/site";
import { PATHS } from "@/lib/routes";
import { BlogPost } from "@/lib/content/blog";
import CTASection from "@/components/sections/CTASection";
import Button from "@/components/ui/Button";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

interface Props {
  locale: Locale;
  dict: Dictionary;
  post: BlogPost;
}

const DATE_LOCALE: Record<Locale, string> = { nl: "nl-NL", en: "en-GB" };

export default function BlogPostPage({ locale, dict, post }: Props) {
  const content = post[locale];
  const paths = PATHS[locale];
  const Icon = post.icon;
  const date = new Date(post.publishedAt).toLocaleDateString(DATE_LOCALE[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { label: dict.nav.blog, href: paths.blog },
          { label: content.title, href: `${paths.blog}/${post.slug[locale]}` },
        ]}
      />

      <article className="bg-gradient-to-br from-ink-950 via-brand-950 to-brand-800 text-white">
        <div className="container-page py-14 sm:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-200">
              <Icon className="h-3.5 w-3.5" />
              {post.category[locale]}
            </span>
            <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-5xl">
              {content.title}
            </h1>
            <div className="mt-5 flex items-center gap-5 text-sm text-ink-200">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                {date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock3 className="h-4 w-4" />
                {post.readMinutes} {dict.common.minutes}
              </span>
            </div>
          </div>
        </div>
      </article>

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {content.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-2xl font-bold text-ink-900">{section.heading}</h2>
                <div className="mt-3 space-y-3">
                  {section.paragraphs.map((p, i) => (
                    <p key={i} className="text-base leading-relaxed text-ink-600">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            <Link
              href={paths.blog}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              <ArrowLeft className="h-4 w-4" />
              {dict.buttons.allPosts}
            </Link>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-ink-100 bg-white p-6 shadow-lg">
              <h3 className="text-lg font-bold text-ink-900">{dict.emergencyBand.title}</h3>
              <p className="mt-2 text-sm text-ink-500">{dict.emergencyBand.description}</p>
              <div className="mt-5 flex flex-col gap-3">
                <Button href={BUSINESS.phoneHref} variant="primary" icon={<Phone className="h-4 w-4" />}>
                  {dict.buttons.callNow}
                </Button>
                <Button href={BUSINESS.whatsappHref} variant="whatsapp" icon={<MessageCircle className="h-4 w-4" />}>
                  {dict.buttons.whatsappDirect}
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <CTASection dict={dict} locale={locale} />
    </>
  );
}
