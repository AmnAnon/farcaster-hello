// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { fetchCoinGeckoPrice } from "@/lib/api";
import ChartsSection from "@/components/ChartsSection";
import OverviewSection from "@/components/sections/OverviewSection";
import MarketSection from "@/components/sections/MarketSection";
import WhalesSection from "@/components/sections/WhalesSection";
import RiskSection from "@/components/sections/RiskSection";

interface PriceData{
   [key:string]:{
    usd:number;
    usd_24h_change:number;
  };
}

export default function Home() {
  const [tab, setTab] = useState("overview");
 const [assetPrices, setAssetPrices] = useState<PriceData | null>(null);

  const [markets, setMarkets] = useState<Market[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAllData() {
      setIsLoading(true);
      try {
        const marketResponse = await fetch('/api/seamless-data');
        const marketData = await marketResponse.json();
        setMarkets(marketData);

        const priceData = await fetchCoinGeckoPrice(['aave', 'weth', 'usd-coin']);
        setAssetPrices(priceData);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadAllData();
  }, []);

const protocolTotals = markets.reduce(
    (acc, market) => {
      acc.totalSupply += parseFloat(market.totalDepositBalanceUSD);
      acc.totalBorrow += parseFloat(market.totalBorrowBalanceUSD);
      return acc;
    },
    { totalSupply: 0, totalBorrow: 0 } // Initial values
  );

  const renderSection = () => {
    switch (tab) {
      case "market":
        return <MarketSection />;
      case "whales":
        return <WhalesSection />;
      case "risk":
        return <RiskSection />;
      case "charts":
        return <ChartsSection 
         assetPrices={assetPrices} isLoading={isLoading} />;
      default:
        return <OverviewSection 
         totals={protocolTotals} isLoading={isLoading} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pb-20">
      <div className="p-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
          Seamless Protocol Dashboard
        </h1>
        <p className="text-gray-400 mb-6">Real-time DeFi analytics on Base</p>
        
        {/* The currently active section is rendered here */}
        {renderSection()}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-gray-800 flex justify-around py-3">
        <button onClick={() => setTab("overview")} className={`${tab === "overview" ? "text-purple-400" : "text-gray-400"}`}>📊 Overview</button>
        <button onClick={() => setTab("market")} className={`${tab === "market" ? "text-purple-400" : "text-gray-400"}`}>📈 Market</button>
        <button onClick={() => setTab("whales")} className={`${tab === "whales" ? "text-purple-400" : "text-gray-400"}`}>🐋 Whales</button>
        <button onClick={() => setTab("risk")} className={`${tab === "risk" ? "text-purple-400" : "text-gray-400"}`}>⚠ Risk</button>
        <button onClick={() => setTab("charts")} className={`${tab === "charts" ? "text-purple-400" : "text-gray-400"}`}>📉 Charts</button>
      </div>
    </div>
  );
}
