// lib/api.ts

// This new function fetches detailed protocol data and isolates the TVL for the Base chain.
export async function fetchProtocolOnBase(protocolSlug: string) {
  try {
    const response = await fetch(`https://api.llama.fi/protocol/${protocolSlug}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    // The API returns TVL for all chains; we find and return only the one for "Base".
    const baseTvl = data.chainTvls.Base?.tvl;
    
    if (baseTvl === undefined) {
      // This handles cases where a protocol isn't on Base.
      return { name: data.name, tvl: 0 };
    }

    return { name: data.name, tvl: baseTvl };

  } catch (error) {
    console.error(`Failed to fetch data for ${protocolSlug}:`, error);
    // Return a default error state
    return { name: protocolSlug, tvl: 0, error: true };
  }
}

// Other API functions can remain here for future use
export async function fetchCoinGeckoPrice(ids: string[]) {
  // ...
}

