import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NotFoundContent } from "@/components/layout/NotFoundContent";

// Voor URL's die bij geen enkele route horen (buiten de (site)-layout).
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="inhoud">
        <NotFoundContent />
      </main>
      <Footer />
    </>
  );
}
