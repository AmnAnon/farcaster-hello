export async function fetchProtocolOnBase(protocolSlug: string) {
  try {
    const response = await fetch(`https://api.llama.fi/protocol/${protocolSlug}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    const baseTvl = data.chainTvls.Base?.tvl;
    
    if (baseTvl === undefined) {
      return { name: data.name, tvl: 0 };
    }

    return { name: data.name, tvl: baseTvl };

  } catch (error) {
    console.error(`Failed to fetch data for ${protocolSlug}:`, error);
    return { name: protocolSlug, tvl: 0, error: true };
  }
}

// Other API functions can remain here for future use
export async function fetchCoinGeckoPrice(ids: string[]) {
  // ...
}

