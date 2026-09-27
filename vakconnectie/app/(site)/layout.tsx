import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DemoBanner } from "@/components/layout/DemoBanner";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#inhoud" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:shadow">
        Direct naar de inhoud
      </a>
      <DemoBanner />
      <Header />
      <main id="inhoud">{children}</main>
      <Footer />
    </>
  );
}
