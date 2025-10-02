// src/app/api/analytics/route.ts
import { NextResponse } from "next/server";
import { GraphQLClient, gql } from "graphql-request";
import { fetchProtocolOnBase } from "@/lib/api";

// === Subgraph config ===
const SEAMLESS_SUBGRAPH_ID = "2u4mWUV4xS19ef1MbnxZHWLLMwdPxtVifH46JbonXwXP";

const graphQuery = gql`
  query GetMarketData {
    markets {
      totalDepositBalanceUSD
      totalBorrowBalanceUSD
    }
  }
`;

export async function GET() {
  const apiKey = process.env.THE_GRAPH_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "The Graph API key missing" }, { status: 500 });
  }

  try {
    // === Subgraph fetch ===
    const endpoint = `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/${SEAMLESS_SUBGRAPH_ID}`;
    const client = new GraphQLClient(endpoint);
    const graphData = await client.request<{ markets: any[] }>(graphQuery);

    const { totalSupply, totalBorrow } = graphData.markets.reduce(
      (acc, m) => {
        acc.totalSupply += parseFloat(m.totalDepositBalanceUSD);
        acc.totalBorrow += parseFloat(m.totalBorrowBalanceUSD);
        return acc;
      },
      { totalSupply: 0, totalBorrow: 0 }
    );

    const tvl = totalSupply - totalBorrow;

    // === DefiLlama fallback (non-blocking) ===
    let llamaData: any = {};
    try {
      const llama = await fetchProtocolOnBase("seamless-protocol");
      if (!("error" in llama)) {
        llamaData = llama;
      }
    } catch (err) {
      console.warn("DefiLlama fetch failed, skipping.");
    }

    // === Build unified response ===
    const analytics = {
      protocol: "Seamless",
      tvl,
      totalSupply,
      totalBorrow,
      utilization: totalSupply > 0 ? (totalBorrow / totalSupply) * 100 : 0,
      inflow: 1250000, 
      outflow: 980000, 
      risk: {
        liquidationRisk: "Low",
        pegDeviation: "Stable",
        auditStatus: "Audited ✅",
      },
      llama: llamaData, // optional
    };

    return NextResponse.json(analytics, {
      headers: { "Cache-Control": "s-maxage=120" },
    });
  } catch (err) {
    console.error("Analytics aggregation failed:", err);
    return NextResponse.json({ error: "Analytics fetch failed" }, { status: 500 });
  }
}

export const revalidate = 120; // 2 min cache
