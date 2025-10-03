// src/app/api/analytics/route.ts
import { NextResponse } from "next/server";
import { GraphQLClient, gql } from "graphql-request";

const SEAMLESS_SUBGRAPH_ID = "2u4mWUV4xS19ef1MbnxZHWLLMwdPxtVifH46JbonXwXP";

// Query
const graphQuery = gql`
  query GetMarketData {
    markets {
      id
      name
      totalDepositBalanceUSD
      totalBorrowBalanceUSD
    }
  }
`;

export async function GET() {
  const apiKey = process.env.THE_GRAPH_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "The Graph API key is missing" }, { status: 500 });
  }

  try {
    const endpoint = `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/${SEAMLESS_SUBGRAPH_ID}`;
    const client = new GraphQLClient(endpoint);
    
    const graphData = await client.request<{ markets: any[] }>(graphQuery);

    const { totalSupply, totalBorrow } = graphData.markets.reduce(
      (acc, market) => {
        acc.totalSupply += parseFloat(market.totalDepositBalanceUSD);
        acc.totalBorrow += parseFloat(market.totalBorrowBalanceUSD);
        return acc;
      },
      { totalSupply: 0, totalBorrow: 0 }
    );

    const tvl = totalSupply - totalBorrow;

    const analytics = {
      tvl,
      totalSupply,
      totalBorrow,
      utilization: totalSupply > 0 ? (totalBorrow / totalSupply) * 100 : 0,
      markets: graphData.markets,
      fees24h: null, 
      tvl_24h_change: null,
      historicalTvlData: [],
    };

    return NextResponse.json(analytics);
  } catch (err) {
    console.error("Analytics aggregation failed:", err);
    return NextResponse.json({ error: "Analytics fetch failed" }, { status: 500 });
  }
}

export const revalidate = 120; 
