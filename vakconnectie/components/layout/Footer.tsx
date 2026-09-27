import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { categories, categoryText } from "@/lib/data/categories";
import { cities, cityText } from "@/lib/data/cities";
import { COMPANY } from "@/lib/site";
import { whatsappUrl } from "@/lib/contact";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizePath } from "@/lib/i18n/routes";

export function Footer({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const t = d.footer;
  const lp = (href: string) => localizePath(locale, href);

  const columns = [
    {
      title: t.forClients,
      links: [
        { href: "/klus-plaatsen", label: t.request },
        { href: "/vakmensen", label: t.findPro },
        { href: "/hoe-werkt-het", label: t.howItWorks },
        { href: "/veelgestelde-vragen", label: t.faq },
      ],
    },
    {
      title: t.forPros,
      links: [
        { href: "/aanmelden-als-vakman", label: t.join },
        { href: "/voor-vakmensen", label: t.howItWorks },
        { href: "/voor-vakmensen#veelgestelde-vragen", label: t.faq },
      ],
    },
    {
      title: t.company,
      links: [
        { href: "/over-ons", label: t.about },
        { href: "/contact", label: t.contact },
        { href: "/algemene-voorwaarden", label: t.terms },
        { href: "/privacybeleid", label: t.privacy },
        { href: "/cookiebeleid", label: t.cookies },
      ],
    },
  ];

  return (
    <footer className="border-t border-stone-200 bg-stone-50">
      <div className="container-page py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_repeat(3,1fr)]">
          <div className="max-w-xs">
            <Logo href={lp("/")} label={d.nav.homeLabel} />
            <p className="mt-4 text-sm leading-relaxed text-stone-600">{t.tagline}</p>
            <address className="mt-5 space-y-1 text-sm not-italic text-stone-700">
              <p><a href={`mailto:${COMPANY.email}`} className="hover:text-brand-700">{COMPANY.email}</a></p>
              <p><a href={`tel:${COMPANY.phoneHref}`} className="hover:text-brand-700">{COMPANY.phoneDisplay}</a></p>
              <p>
                <a href={whatsappUrl(d.contactForm.intro + " ")} target="_blank" rel="noopener noreferrer" className="hover:text-brand-700">
                  WhatsApp
                </a>
              </p>
            </address>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="text-sm font-semibold text-stone-950">{col.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={lp(l.href)} className="text-sm text-stone-600 transition-colors hover:text-brand-700">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-8 border-t border-stone-200 pt-8 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold text-stone-950">{t.categories}</h2>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={lp(`/${c.slug}`)} className="text-sm text-stone-600 hover:text-brand-700">{categoryText(c, locale).name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-stone-950">{t.regions}</h2>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link href={lp(`/vakmensen/${c.slug}`)} className="text-sm text-stone-600 hover:text-brand-700">{cityText(c, locale).name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10 text-sm text-stone-500">
          © Vakconnectie · {COMPANY.legalName} · {t.established} {COMPANY.city} · KvK {COMPANY.kvk}
        </p>
      </div>
    </footer>
  );
}
