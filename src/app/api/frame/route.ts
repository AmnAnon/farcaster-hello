import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Optional: parse request body to inspect who clicked / which button
    const body = await req.json().catch(() => ({}));
    console.log("Frame POST payload:", body);

    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

      return NextResponse.json({
      "fc:frame": "vNext",
      "fc:frame:image": `${baseUrl}/api/og?refresh=${Date.now()}`, 
      "fc:frame:button:1": "Refresh Again 🔁",
      "fc:frame:button:2": "Visit Website 🌐",
      "fc:frame:button:2:action": "link",
      "fc:frame:button:2:target": "https://seamless.exchange", 
      "fc:frame:post_url": `${baseUrl}/api/frame`,
    });
  } catch (err) {
    console.error("Frame handler error:", err);
    return NextResponse.json({ error: "Failed to process frame request" }, { status: 500 });
  }
}
