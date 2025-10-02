"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Section components
function OverviewSection() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Protocol Analytics</h2>
      <div className="grid grid-cols-1 gap-4">
        <Card title="Daily Inflow" value="1,250,000" gradient="from-green-400 to-emerald-600" />
        <Card title="Daily Outflow" value="980,000" gradient="from-pink-400 to-red-500" />
        <Card title="Total Supply" value="5,400,000" gradient="from-blue-400 to-indigo-500" />
        <Card title="Total Borrow" value="2,200,000" gradient="from-orange-400 to-yellow-500" />
      </div>
    </div>
  );
}

function MarketSection() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Market Intelligence</h2>
      <p className="text-gray-400">Charts for asset prices, yields & supply/borrow spreads will go here.</p>
    </div>
  );
}

function WhalesSection() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Whales & Smart Money</h2>
      <p className="text-gray-400">Tracking top wallets, large inflows, and governance signals.</p>
    </div>
  );
}

function RiskSection() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Risk Metrics</h2>
      <div className="grid grid-cols-1 gap-4">
        <Card title="Utilization Rate" value="45%" gradient="from-blue-400 to-sky-500" />
        <Card title="Liquidation Risk" value="Low" gradient="from-red-400 to-pink-500" />
        <Card title="Peg Deviations" value="Stable" gradient="from-yellow-400 to-orange-500" />
        <Card title="Audit Status" value="Audited ✅" gradient="from-green-400 to-emerald-500" />
      </div>
    </div>
  );
}

function ChartsSection() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Performance Charts</h2>
      <p className="text-gray-400">Line charts & visualizations for inflows, TVL, utilization, etc.</p>
    </div>
  );
}

// Reusable card
function Card({ title, value, gradient }: { title: string; value: string; gradient: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`p-5 rounded-2xl shadow-lg bg-gradient-to-r ${gradient}`}
    >
      <p className="text-sm font-medium text-white">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </motion.div>
  );
}

export default function Home() {
  const [tab, setTab] = useState("overview");

  const renderSection = () => {
    switch (tab) {
      case "market":
        return <MarketSection />;
      case "whales":
        return <WhalesSection />;
      case "risk":
        return <RiskSection />;
      case "charts":
        return <ChartsSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pb-20">
      <div className="p-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
          Seamless Protocol Dashboard
        </h1>
        <p className="text-gray-400 mb-6">Real-time DeFi analytics on Base</p>
        {renderSection()}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 flex justify-around py-3">
        <button onClick={() => setTab("overview")} className={`${tab === "overview" ? "text-purple-400" : "text-gray-400"}`}>📊 Overview</button>
        <button onClick={() => setTab("market")} className={`${tab === "market" ? "text-purple-400" : "text-gray-400"}`}>📈 Market</button>
        <button onClick={() => setTab("whales")} className={`${tab === "whales" ? "text-purple-400" : "text-gray-400"}`}>🐋 Whales</button>
        <button onClick={() => setTab("risk")} className={`${tab === "risk" ? "text-purple-400" : "text-gray-400"}`}>⚠ Risk</button>
        <button onClick={() => setTab("charts")} className={`${tab === "charts" ? "text-purple-400" : "text-gray-400"}`}>📉 Charts</button>
      </div>
    </div>
  );
}
