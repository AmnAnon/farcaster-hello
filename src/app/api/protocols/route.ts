// src/app/api/protocols/route.ts
import { GraphQLClient, gql } from 'graphql-request';
import { NextResponse } from 'next/server';

const SEAMLESS_SUBGRAPH_ID = '2u4mWUV4xS19ef1MbnxZHWLLMwdPxtVifH46JbonXwXP';
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
    return NextResponse.json({ error: 'API key is missing.' }, { status: 500 });
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

    const combinedData = {
      slug: 'seamless-protocol',
      displayName: 'Seamless Protocol',
      tvl: tvl,
      fees24h: 0,
      totalSupply: totalSupply,
      totalBorrow: totalBorrow,
    };

    return NextResponse.json(combinedData);

  } catch (error) {
    console.error('Failed to fetch protocol data:', error);
    return NextResponse.json({ error: 'Failed to fetch hybrid protocol data.' }, { status: 500 });
  }
}

export const revalidate = 600;
