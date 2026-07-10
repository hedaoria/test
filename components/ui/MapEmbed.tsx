import { BUSINESS } from "@/lib/site";

interface Props {
  title: string;
  className?: string;
}

export default function MapEmbed({ title, className }: Props) {
  const query = encodeURIComponent(
    `${BUSINESS.name}, ${BUSINESS.address.street}, ${BUSINESS.address.postalCode} ${BUSINESS.address.city}, ${BUSINESS.address.country}`
  );

  return (
    <div className={`overflow-hidden rounded-2xl border border-ink-100 shadow-sm ${className ?? ""}`}>
      <iframe
        title={title}
        src={`https://www.google.com/maps?q=${query}&output=embed`}
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: 320 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
