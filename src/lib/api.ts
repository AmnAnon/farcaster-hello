// src/lib/api.ts

export async function fetchProtocolOnBase(protocolSlug: string) {
  try {
    const response = await fetch(`https://api.llama.fi/protocol/${protocolSlug}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    const baseTvl = data.chainTvls.Base?.tvl;
    const baseChainData = data.chains?.includes("Base") ? data.chainTvls.Base : {};

    return {
      name: data.name,
      tvl: baseTvl || 0,
      fees24h: baseChainData.dailyFees || 0,
      totalSupply: baseChainData.totalSupplyUsd || 0,
      totalBorrow: baseChainData.totalBorrowUsd || 0,
    };

  } catch (error) {
    console.error(`Failed to fetch data for ${protocolSlug}:`, error);
    return { error: true };
  }
}

