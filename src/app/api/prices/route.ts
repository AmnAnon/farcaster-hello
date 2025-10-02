import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const { data } = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,usd-coin&vs_currencies=usd&include_24hr_change=true"
    );
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Price API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
