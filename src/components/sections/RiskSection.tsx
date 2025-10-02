// src/components/sections/RiskSection.tsx

import { Card, Metric, ProgressBar, Badge } from "@tremor/react";     

const formatCurrency = (value: number) => {
  
};

export default function RiskSection({ data, stablecoinPrice, isLoading }: any) {

  const utilizationRate = data && data.totalSupply > 0 
    ? (data.totalBorrow / data.totalSupply) * 100 
    : 0;
  const riskProfile = /* ... */;
  const pegStatus = /* ... */;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Risk Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="!bg-gray-800/50" decoration="top" decorationColor="blue">
          {/* Replaced <Text> with <p> */}
          <p className="text-gray-400">Utilization Rate</p>
          {isLoading ? (<div className="h-7 w-24 mt-1 bg-gray-700 rounded-md animate-pulse"></div>) :
            (<Metric className="text-white">{utilizationRate.toFixed(2)}%</Metric>)
          }
          <ProgressBar value={utilizationRate} color="blue" className="mt-4" />
        </Card>

        <Card className="!bg-gray-800/50" decoration="top" decorationColor={riskProfile.color as any}>
          {/* Replaced <Text> with <p> */}
          <p className="text-gray-400">Liquidation Risk</p>
          {isLoading ? (<div className="h-7 w-16 mt-1 bg-gray-700 rounded-md animate-pulse"></div>) :
            (<Badge color={riskProfile.color as any} size="lg" className="mt-1">{riskProfile.level}</Badge>)
          }
        </Card>

        <Card className="!bg-gray-800/50" decoration="top" decorationColor={pegStatus.color as any}>
            {/* Replaced <Text> with <p> */}
            <p className="text-gray-400">USDC Peg Status</p>
            {isLoading ? (<div className="h-7 w-24 mt-1 bg-gray-700 rounded-md animate-pulse"></div>) : 
                (<>
                    <Metric className="text-white">{formatCurrency(usdcPrice)}</Metric>
                    <Badge color={pegStatus.color as any} className="mt-1">{pegStatus.status}</Badge>
                </>)
            }
        </Card>

        <Card className="!bg-gray-800/50" decoration="top" decorationColor="emerald">
            {/* Replaced <Text> with <p> */}
            <p className="text-gray-400">Audit Status</p>
            <Metric className="text-white">Audited ✅</Metric>
        </Card>
      </div>
    </div>
  );
}
