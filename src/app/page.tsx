"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, Text, Metric } from "@tremor/react"; // Import Tremor components

// Assuming your api lib and fetch functions are set up
// import { fetchProtocolOnBase } from "@/lib/api"; 

interface Protocol {
  slug: string;
  displayName: string;
  tvl: number;
  error?: boolean;
}

export default function Dashboard() {
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const response = await fetch('/api/protocols');
      const data = await response.json();
      setProtocols(data);
      setIsLoading(false);
    }
    loadData();
  }, []);

  const nextSlide = () => setCurrent((c) => (c + 1) % protocols.length);
  const prevSlide = () => setCurrent((c) => (c - 1 + protocols.length) % protocols.length);
  
  const currentProtocol = protocols[current];

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(num);
  };

  if (isLoading) {
    // A simple loading state for the whole dashboard
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white">
            <div className="w-[400px] h-[220px]">
                <Card className="bg-gray-800 p-6 w-full h-full rounded-2xl shadow-xl flex items-center justify-center">
                    <Text className="text-gray-400">Loading Dashboard...</Text>
                </Card>
            </div>
        </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white p-4">
      <div className="w-[400px] h-[220px] flex items-center justify-center">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          {/* We are now using Tremor's components for a dashboard-like feel */}
          <Card 
            className="w-full h-full !bg-gray-800" // Use ! to override default Tremor background
            decoration="top" 
            decorationColor="indigo"
          >
            <Text className="text-gray-400">{currentProtocol.displayName}</Text>
            {currentProtocol.error ? (
                <Metric className="text-red-500">Error</Metric>
            ) : (
                <Metric className="text-white">{formatNumber(currentProtocol.tvl)}</Metric>
            )}
            <Text className="mt-4 text-gray-500">TVL on Base</Text>
          </Card>
        </motion.div>
      </div>

      <div className="mt-6 flex gap-4">
        <button onClick={prevSlide} className="px-5 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">◀</button>
        <button onClick={nextSlide} className="px-5 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">▶</button>
      </div>
    </div>
  );
}
