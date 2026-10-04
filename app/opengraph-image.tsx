import { ImageResponse } from "next/og";

// Social preview card for the home page (LinkedIn, X, WhatsApp, Slack…).
export const alt = "Shada Daab — Software Engineer & Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #17121f 0%, #1f1629 60%, #2a1a2e 100%)",
          color: "#f1ecf6",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 24,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#f19bb0",
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: 6, background: "#f19bb0" }} />
          software engineer · Istanbul
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 132, fontWeight: 800, lineHeight: 1, letterSpacing: -4 }}>
            Shada Daab<span style={{ color: "#f19bb0" }}>.</span>
          </div>
          <div style={{ marginTop: 28, fontSize: 36, color: "#b9aec6" }}>
            From scratch to production — on whatever stack the problem needs.
          </div>
        </div>
        <div style={{ display: "flex", gap: 14, fontSize: 24, color: "#b9aec6" }}>
          {["Tummie", "Let's Note AI", "Moonshot", "NanoShield", "FLARE"].map((p) => (
            <div
              key={p}
              style={{
                padding: "8px 20px",
                borderRadius: 999,
                border: "1px solid rgba(241,155,176,0.35)",
              }}
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
