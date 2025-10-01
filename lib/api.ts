// lib/api.ts
export async function fetchDefiLlamaTVL(protocol: string) {
  const res = await fetch(`https://api.llama.fi/tvl/${protocol}`);
  return res.json();
}

export async function fetchDefiLlamaSummary() {
  const res = await fetch(`https://api.llama.fi/overview/protocols`);
  return res.json();
}

export async function fetchCoinGeckoPrice(ids: string[]) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(",")}&vs_currencies=usd&include_24hr_change=true`
  );
  return res.json();
}

export async function fetchDexScreenerWhales() {
  // Example: track Aerodrome Base pairs
  const res = await fetch(`https://api.dexscreener.com/latest/dex/pairs/base`);
  return res.json();
}
