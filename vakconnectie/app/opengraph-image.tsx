import { ImageResponse } from "next/og";

export const alt = "Vakconnectie: de juiste vakman voor jouw klus";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#faf8f5", padding: 80 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: 18, background: "#1f523d", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="48" height="48" viewBox="0 0 32 32">
              <path d="M8.5 16.5 16 10l7.5 6.5" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11.5 22.5h9" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
              <circle cx="11.5" cy="22.5" r="2" fill="#fff" />
              <circle cx="20.5" cy="22.5" r="2" fill="#fff" />
            </svg>
          </div>
          <div style={{ fontSize: 44, fontWeight: 600, color: "#0c0a09", display: "flex" }}>
            vak<span style={{ color: "#1f523d" }}>connectie</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, color: "#0c0a09", lineHeight: 1.1 }}>De juiste vakman voor jouw klus</div>
          <div style={{ fontSize: 34, color: "#57534e", marginTop: 24 }}>Plaats je klus en kom in contact met vakmensen bij jou in de buurt.</div>
        </div>
      </div>
    ),
    size,
  );
}
