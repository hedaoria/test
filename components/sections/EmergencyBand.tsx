import { Siren, Phone, MessageCircle } from "lucide-react";
import { Dictionary } from "@/lib/i18n";
import { BUSINESS } from "@/lib/site";
import Button from "@/components/ui/Button";

interface Props {
  dict: Dictionary;
}

export default function EmergencyBand({ dict }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-accent-600 to-accent-500 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 right-10 h-56 w-56 rounded-full bg-white/10 blur-3xl"
      />
      <div className="container-page relative flex flex-col items-center gap-6 py-12 text-center sm:py-14 lg:flex-row lg:text-left lg:justify-between">
        <div className="flex items-start gap-4 lg:items-center">
          <span className="hidden sm:flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15">
            <Siren className="h-7 w-7" />
          </span>
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">{dict.emergencyBand.title}</h2>
            <p className="mt-2 max-w-xl text-sm text-white/90 sm:text-base">{dict.emergencyBand.description}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={BUSINESS.phoneHref} variant="ghost" size="lg" icon={<Phone className="h-5 w-5" />}>
            {dict.emergencyBand.cta}
          </Button>
          <Button href={BUSINESS.whatsappHref} variant="whatsapp" size="lg" icon={<MessageCircle className="h-5 w-5" />}>
            {dict.buttons.whatsappDirect}
          </Button>
        </div>
      </div>
    </section>
  );
}
