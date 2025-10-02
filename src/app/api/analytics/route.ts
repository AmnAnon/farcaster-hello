import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    inflow: 1250000,
    outflow: 980000,
    totalSupply: 5400000,
    totalBorrow: 2200000,
    utilization: "45%",
    liquidationRisk: "Low",
    pegDeviation: "Stable",
    auditStatus: "Audited ✅",
  });
}
