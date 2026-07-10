import { Locale } from "./site";
import { PATHS, SERVICE_PAGE_KEYS } from "./routes";
import { getDictionary } from "./i18n";
import { getService } from "./content/services";

export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceNavLink extends NavLink {
  description: string;
}

export function getPrimaryNav(locale: Locale): NavLink[] {
  const dict = getDictionary(locale);
  const paths = PATHS[locale];
  return [
    { label: dict.nav.home, href: paths.home },
    { label: dict.nav.about, href: paths.about },
    { label: dict.nav.services, href: paths.services },
    { label: dict.nav.serviceAreas, href: paths.serviceAreas },
    { label: dict.nav.reviews, href: paths.reviews },
    { label: dict.nav.faq, href: paths.faq },
    { label: dict.nav.blog, href: paths.blog },
    { label: dict.nav.contact, href: paths.contact },
  ];
}

export function getServiceNavLinks(locale: Locale): ServiceNavLink[] {
  const paths = PATHS[locale];
  return SERVICE_PAGE_KEYS.map((key) => {
    const service = getService(key)!;
    const content = service[locale];
    return {
      label: content.shortTitle,
      description: content.cardDescription,
      href: paths[key],
    };
  });
}
