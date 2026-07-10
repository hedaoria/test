import { Locale } from "@/lib/site";
import { getDictionary } from "@/lib/i18n";
import Header from "./Header";
import Footer from "./Footer";
import StickyContactBar from "./StickyContactBar";
import CookieConsent from "./CookieConsent";
import Analytics from "./Analytics";

export default function LocaleLayout({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const dict = getDictionary(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <Header locale={locale} dict={dict} />
      <main className="flex-1 pb-16 sm:pb-0">{children}</main>
      <Footer locale={locale} dict={dict} />
      <StickyContactBar dict={dict} />
      <CookieConsent dict={dict} locale={locale} />
      <Analytics />
    </div>
  );
}
