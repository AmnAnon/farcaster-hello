import { GraphQLClient, gql } from 'graphql-request';
import { NextResponse } from 'next/server';

const SEAMLESS_SUBGRAPH_ID = '2u4mWUV4xS19ef1MbnxZHWLLMwdPxtVifH46JbonXwXP';

const query = gql`
  query GetMarketData {
    markets(orderBy: totalValueLockedUSD, orderDirection: desc, first: 10) {
      id
      name
      totalValueLockedUSD
      totalBorrowBalanceUSD
      totalDepositBalanceUSD  # Changed from totalSupplyBalanceUSD
      inputToken {
        symbol
      }
    }
  }
`;

interface Market {
  id: string;
  name: string;
  totalValueLockedUSD: string;
  totalBorrowBalanceUSD: string;
  totalDepositBalanceUSD: string;
  inputToken: {
    symbol: string;
  };
}

interface MarketDataResponse {
  markets: Market[];
}

export async function GET() {
  const apiKey = process.env.THE_GRAPH_API_KEY;

  if (!apiKey) {
    console.error('The Graph API key is missing from .env.local');
    return NextResponse.json({ error: 'API key is missing.' }, { status: 500 });
  }

  const THE_GRAPH_ENDPOINT = `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/${SEAMLESS_SUBGRAPH_ID}`;

  const client = new GraphQLClient(THE_GRAPH_ENDPOINT);

  try {
    const data = await client.request<MarketDataResponse>(query);
    return NextResponse.json(data.markets);

  } catch (error) {
    console.error('Failed to fetch data from The Graph Gateway:', error);
    return NextResponse.json({ error: 'Failed to fetch protocol data.' }, { status: 500 });
  }
}

export const revalidate = 60;
