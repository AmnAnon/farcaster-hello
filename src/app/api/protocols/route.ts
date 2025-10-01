// src/app/api/protocols/route.ts

import { NextResponse } from 'next/server';

// This is the function from your lib/api.ts file
import { fetchProtocolOnBase } from '@/lib/api'; 

const protocols = [
  { slug: "aave-v3", displayName: "Aave V3" },
  { slug: "uniswap-v3", displayName: "Uniswap V3" },
  { slug: "aerodrome-finance", displayName: "Aerodrome" },
];

export async function GET() {
  try {
    // We use Promise.all to fetch data for all protocols in parallel from the server
    const data = await Promise.all(
      protocols.map(async (p) => {
        const protocolData = await fetchProtocolOnBase(p.slug);
        return {
          slug: p.slug,
          displayName: p.displayName,
          ...protocolData,
        };
      })
    );

    // Return the combined data
    return NextResponse.json(data);

  } catch (error) {
    console.error('Failed to fetch protocol data:', error);
    return NextResponse.json({ error: 'Failed to fetch protocol data.' }, { status: 500 });
  }
}

// This is the key! Vercel will cache the response for 10 minutes (600 seconds).
export const revalidate = 600;
