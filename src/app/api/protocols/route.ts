import { NextResponse } from 'next/server';
import { fetchProtocolOnBase } from '@/lib/api'; 

const protocols = [
  { slug: "aave-v3", displayName: "Aave V3" },
  { slug: "uniswap-v3", displayName: "Uniswap V3" },
  { slug: "aerodrome-finance", displayName: "Aerodrome" },
];

export async function GET() {
  try {
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

    return NextResponse.json(data);

  } catch (error) {
    console.error('Failed to fetch protocol data:', error);
    return NextResponse.json({ error: 'Failed to fetch protocol data.' }, { status: 500 });
  }
}

export const revalidate = 600;
