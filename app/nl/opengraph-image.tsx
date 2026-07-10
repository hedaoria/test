import { ImageResponse } from "next/og";
import { BUSINESS } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #142059 0%, #1c5cf5 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 700, opacity: 0.85, display: "flex" }}>{BUSINESS.name}</div>
        <div style={{ fontSize: 68, fontWeight: 800, marginTop: 20, display: "flex", textAlign: "center", padding: "0 60px" }}>
          Uw Betrouwbare Loodgieter, Altijd Dichtbij
        </div>
        <div style={{ fontSize: 32, marginTop: 30, opacity: 0.9, display: "flex" }}>
          24/7 Spoedservice · {BUSINESS.phoneDisplay}
        </div>
      </div>
    ),
    { ...size }
  );
}
