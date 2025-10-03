// src/components/sections/RiskSection.tsx
"use client";

import { useState, useEffect } from "react";
import { Card, ProgressBar, Badge } from "@tremor/react";
import { fetchUSDCPeg } from "@/lib/api"; 
import { formatCurrency } from "@/lib/utils";

const getRiskProfile = (utilization: number) => {
  if (utilization >= 90) return { level: "High", color: "red" as const };
  if (utilization >= 75) return { level: "Medium", color: "yellow" as const };
  return { level: "Low", color: "emerald" as const };
};

export default function RiskSection({ data, isLoading }: any) {
  const [pegData, setPegData] = useState<{ price: number; deviation: string }>({ price: 1, deviation: 'N/A' });
  const utilizationRate = data?.utilization || 0;
  const riskProfile = getRiskProfile(utilizationRate);

  useEffect(() => {
    fetchUSDCPeg().then(setPegData);
    const interval = setInterval(() => fetchUSDCPeg().then(setPegData), 60000);
    return () => clearInterval(interval);
  }, []);

  const isStable = pegData.deviation === '0.00%';
  const pegStatus = {
    status: isStable ? "Stable" : "Warning",
    color: isStable ? "emerald" : "amber" as const,
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Risk Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Utilization Card */}
        <Card className="!bg-gray-800/50" decoration="top" decorationColor="blue">
          <p className="text-gray-400">Utilization Rate</p>
          {isLoading ? (
            <div className="h-7 w-24 mt-1 bg-gray-700 rounded-md animate-pulse"></div>
          ) : (
            <p className="text-3xl font-semibold text-white">{utilizationRate.toFixed(2)}%</p>
          )}
          <ProgressBar value={utilizationRate} color="blue" className="mt-4" />
        </Card>

        {/* Liquidation Risk */}
        <Card className="!bg-gray-800/50" decoration="top" decorationColor={riskProfile.color}>
          <p className="text-gray-400">Liquidation Risk</p>
          {isLoading ? (
            <div className="h-7 w-16 mt-1 bg-gray-700 rounded-md animate-pulse"></div>
          ) : (
            <Badge color={riskProfile.color} size="lg" className="mt-1">
              {riskProfile.level}
            </Badge>
          )}
        </Card>

        {/* USDC Peg Status */}
        <Card className="!bg-gray-800/50" decoration="top" decorationColor={pegStatus.color}>
          <p className="text-gray-400">USDC Peg Status</p>
          {isLoading || pegData.deviation === 'N/A' ? (
            <div className="h-7 w-24 mt-1 bg-gray-700 rounded-md animate-pulse"></div>
          ) : (
            <>
              <p className="text-3xl font-semibold text-white">
                {formatCurrency(pegData.price)} {/* Now: "$0.9998" */}
              </p>
              <Badge color={pegStatus.color} className="mt-1">
                {pegStatus.status} ({pegData.deviation})
              </Badge>
            </>
          )}
        </Card>

        {/* Audit Status */}
        <Card className="!bg-gray-800/50" decoration="top" decorationColor="emerald">
          <p className="text-gray-400">Audit Status</p>
          <p className="text-3xl font-semibold text-white">Audited ✅</p>
        </Card>
      </div>
    </div>
  );
}
