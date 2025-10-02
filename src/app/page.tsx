// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { LayoutDashboard, CandlestickChart, Fish, ShieldAlert, BarChart3 } from 'lucide-react';
import OverviewSection from "@/components/sections/OverviewSection";
import MarketSection from "@/components/sections/MarketSection";
import WhalesSection from "@/components/sections/WhalesSection";
import RiskSection from "@/components/sections/RiskSection";
import ChartsSection from "@/components/sections/ChartsSection";

export default function Home() {
  const [tab, setTab] = useState("overview");
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const response = await fetch('/api/analytics');
      const data = await response.json();
      setAnalytics(data);
      setIsLoading(false);
    }
    loadData();
  }, []);

  const renderSection = () => {
    switch (tab) {
      case "market":
        return <MarketSection />;
      case "whales":
        return <WhalesSection />;
      case "risk":
        return <RiskSection data={analytics} isLoading={isLoading} />;
      case "charts":
        return <ChartsSection />;
      default:
        return <OverviewSection data={analytics} isLoading={isLoading} />;
    }
  };

  return (
    // Your JSX layout remains the same
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pb-20">
        <div className="p-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
                Seamless Protocol Dashboard
            </h1>
            <p className="text-gray-400 mb-6">Real-time DeFi analytics on Base</p>
            {renderSection()}
        </div>
        {/* Bottom Nav remains the same */}
        <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-gray-800 flex justify-around py-3">
            <button onClick={() => setTab("overview")} className={`${tab === "overview" ? "text-purple-400" : "text-gray-400"}`}><LayoutDashboard size={24} /></button>
            <button onClick={() => setTab("market")} className={`${tab === "market" ? "text-purple-400" : "text-gray-400"}`}><CandlestickChart size={24} /></button>
            <button onClick={() => setTab("whales")} className={`${tab === "whales" ? "text-purple-400" : "text-gray-400"}`}><Fish size={24} /></button>
            <button onClick={() => setTab("risk")} className={`${tab === "risk" ? "text-purple-400" : "text-gray-400"}`}><ShieldAlert size={24} /></button>
            <button onClick={() => setTab("charts")} className={`${tab === "charts" ? "text-purple-400" : "text-gray-400"}`}><BarChart3 size={24} /></button>
        </div>
    </div>
  );
}
		

