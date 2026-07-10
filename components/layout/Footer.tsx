import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Droplets, MessageCircle } from "lucide-react";
import { Locale, BUSINESS } from "@/lib/site";
import { Dictionary } from "@/lib/i18n";
import { getPrimaryNav, getServiceNavLinks } from "@/lib/nav";
import { PATHS } from "@/lib/routes";
import LanguageSwitcher from "./LanguageSwitcher";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/SocialIcons";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

export default function Footer({ locale, dict }: Props) {
  const nav = getPrimaryNav(locale);
  const serviceLinks = getServiceNavLinks(locale);
  const paths = PATHS[locale];
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-900 text-ink-200">
      <div className="container-page py-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href={paths.home} className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
              <Droplets className="h-5 w-5" aria-hidden />
            </span>
            <span className="text-lg font-bold text-white">{dict.meta.siteName}</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-ink-300">{dict.footer.about}</p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={BUSINESS.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-800 hover:bg-brand-600 transition-colors"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href={BUSINESS.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-800 hover:bg-brand-600 transition-colors"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={BUSINESS.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-800 hover:bg-brand-600 transition-colors"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">{dict.footer.quickLinks}</h3>
          <ul className="mt-4 space-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-ink-300 hover:text-white transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">{dict.footer.ourServices}</h3>
          <ul className="mt-4 space-y-2.5">
            {serviceLinks.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="text-sm text-ink-300 hover:text-white transition-colors">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">{dict.footer.contact}</h3>
          <ul className="mt-4 space-y-3 text-sm text-ink-300">
            <li>
              <a href={BUSINESS.phoneHref} className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Phone className="h-4 w-4 shrink-0 text-brand-400" />
                {BUSINESS.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={BUSINESS.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <MessageCircle className="h-4 w-4 shrink-0 text-brand-400" />
                {dict.common.whatsappLabel}
              </a>
            </li>
            <li>
              <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Mail className="h-4 w-4 shrink-0 text-brand-400" />
                {BUSINESS.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 shrink-0 text-brand-400 mt-0.5" />
              <span>
                {BUSINESS.address.street}
                <br />
                {BUSINESS.address.postalCode} {BUSINESS.address.city}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="h-4 w-4 shrink-0 text-brand-400 mt-0.5" />
              <span>
                {dict.footer.weekdays}
                <br />
                {dict.footer.emergencyLine}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-800">
        <div className="container-page py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-400">
          <p>
            &copy; {year} {BUSINESS.legalName} — {dict.footer.rights} {dict.footer.kvk}: {BUSINESS.kvk} · {dict.footer.vat}: {BUSINESS.btw}
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link href={paths.privacy} className="hover:text-white transition-colors">
              {dict.footer.privacyPolicy}
            </Link>
            <Link href={paths.terms} className="hover:text-white transition-colors">
              {dict.footer.terms}
            </Link>
            <Link href={paths.cookiePolicy} className="hover:text-white transition-colors">
              {dict.footer.cookiePolicy}
            </Link>
            <LanguageSwitcher locale={locale} variant="footer" />
          </div>
        </div>
      </div>
    </footer>
  );
}
