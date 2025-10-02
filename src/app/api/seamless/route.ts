import { NextResponse } from "next/server";
import axios from "axios";
import { GraphQLClient, gql } from "graphql-request";

const SEAMLESS_SUBGRAPH_ID =
  "2u4mWUV4xS19ef1MbnxZHWLLMwdPxtVifH46JbonXwXP";

const query = gql`
  query GetMarketData {
    markets(orderBy: totalValueLockedUSD, orderDirection: desc, first: 10) {
      id
      name
      totalValueLockedUSD
      totalBorrowBalanceUSD
      totalDepositBalanceUSD
      inputToken {
        symbol
      }
    }
  }
`;

export async function GET() {
  try {
    // Step 1: DefiLlama fallback data
    const defiRes = await axios.get(
      "https://api.llama.fi/protocol/seamless-protocol"
    );
    const defiData = defiRes.data || {};
    const tvl = defiData.currentChainTvls?.Base || 0;
    const apy = defiData.yields?.[0]?.apy || 0;
    const utilization = defiData.utilization || 0;

    // Step 2: Graph subgraph fetch
    const apiKey = process.env.THE_GRAPH_API_KEY;
    let subgraphData: any = null;
    if (apiKey) {
      try {
        const client = new GraphQLClient(
          `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/${SEAMLESS_SUBGRAPH_ID}`
        );
        subgraphData = await client.request(query);
      } catch (err) {
        console.error("Graph fetch failed:", err);
      }
    }

    // Step 3: Merge + guarantee schema
    const mergedTvl =
      subgraphData?.markets?.reduce(
        (sum: number, m: any) => sum + parseFloat(m.totalValueLockedUSD),
        0
      ) || tvl;

    const whales =
      subgraphData?.markets?.map((m: any) => ({
        address: m.id,
        size: m.totalDepositBalanceUSD,
      })) || [];

    const recentActions =
      defiData?.events?.map((e: any, idx: number) => ({
        id: e.id || idx,
        amount: e.amount || 0,
        timestamp: e.timestamp || Math.floor(Date.now() / 1000),
      })) || [];

    return NextResponse.json(
      {
        tvl: mergedTvl || 0,
        apy: apy || 0,
        utilization: utilization || 0,
        whales: whales || [],
        recentActions: recentActions || [],
      },
      { headers: { "Cache-Control": "s-maxage=300" } }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { tvl: 0, apy: 0, utilization: 0, whales: [], recentActions: [] },
      { status: 500 }
    );
  }
}

export const revalidate = 60;
