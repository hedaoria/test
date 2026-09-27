import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { categories } from "@/lib/data/categories";
import { cities } from "@/lib/data/cities";
import { COMPANY } from "@/lib/site";
import { whatsappUrl } from "@/lib/contact";

const COLUMNS = [
  {
    title: "Voor klanten",
    links: [
      { href: "/klus-plaatsen", label: "Projectaanvraag doen" },
      { href: "/vakmensen", label: "Vind een vakman" },
      { href: "/hoe-werkt-het", label: "Hoe werkt het?" },
      { href: "/veelgestelde-vragen", label: "Veelgestelde vragen" },
    ],
  },
  {
    title: "Voor vakmensen",
    links: [
      { href: "/aanmelden-als-vakman", label: "Aanmelden" },
      { href: "/voor-vakmensen", label: "Hoe werkt het?" },
      { href: "/voor-vakmensen#veelgestelde-vragen", label: "Veelgestelde vragen" },
    ],
  },
  {
    title: "Vakconnectie",
    links: [
      { href: "/over-ons", label: "Over ons" },
      { href: "/contact", label: "Contact" },
      { href: "/algemene-voorwaarden", label: "Algemene voorwaarden" },
      { href: "/privacybeleid", label: "Privacybeleid" },
      { href: "/cookiebeleid", label: "Cookiebeleid" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50">
      <div className="container-page py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_repeat(3,1fr)]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-stone-600">
              Vakconnectie helpt klanten bij het vinden van passende zelfstandige vakmensen.
            </p>
            <address className="mt-5 space-y-1 text-sm not-italic text-stone-700">
              <p><a href={`mailto:${COMPANY.email}`} className="hover:text-brand-700">{COMPANY.email}</a></p>
              <p><a href={`tel:${COMPANY.phoneHref}`} className="hover:text-brand-700">{COMPANY.phoneDisplay}</a></p>
              <p>
                <a href={whatsappUrl("Hallo Vakconnectie, ")} target="_blank" rel="noopener noreferrer" className="hover:text-brand-700">
                  WhatsApp
                </a>
              </p>
            </address>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h2 className="text-sm font-semibold text-stone-950">{col.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-stone-600 transition-colors hover:text-brand-700">
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
            <h2 className="text-sm font-semibold text-stone-950">Vakgebieden</h2>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}`} className="text-sm text-stone-600 hover:text-brand-700">{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-stone-950">Regio&apos;s</h2>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link href={`/vakmensen/${c.slug}`} className="text-sm text-stone-600 hover:text-brand-700">{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10 text-sm text-stone-500">
          © Vakconnectie · {COMPANY.legalName} · {COMPANY.city} · KvK {COMPANY.kvk}
        </p>
      </div>
    </footer>
  );
}
