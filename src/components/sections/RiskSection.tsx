// src/components/sections/RiskSection.tsx
import { Card, ProgressBar, Badge } from "@tremor/react"; // "Metric" is removed

// Helper to format currency
const formatCurrency = (value: number | undefined) => {
  if (value === undefined || value === null) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 4,
  }).format(value);
};

// Helper function to determine risk level
const getRiskProfile = (utilization: number) => {
  if (utilization >= 90) return { level: "High", color: "red" };
  if (utilization >= 75) return { level: "Medium", color: "yellow" };
  return { level: "Low", color: "emerald" };
};

export default function RiskSection({ data, stablecoinPrice, isLoading }: any) {
  const utilizationRate = data?.utilization || 0;
  const riskProfile = getRiskProfile(utilizationRate);
  const usdcPrice = stablecoinPrice?.['usd-coin']?.usd;
  const isStable = usdcPrice && usdcPrice > 0.995 && usdcPrice < 1.005;
  const pegStatus = {
    status: isStable ? "Stable" : "Warning",
    color: isStable ? "emerald" : "amber",
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Risk Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="!bg-gray-800/50" decoration="top" decorationColor="blue">
          <p className="text-gray-400">Utilization Rate</p>
          {isLoading ? (<div className="h-7 w-24 mt-1 bg-gray-700 rounded-md animate-pulse"></div>) :
            // Replaced <Metric> with a styled <p> tag
            (<p className="text-3xl font-semibold text-white">{utilizationRate.toFixed(2)}%</p>)
          }
          <ProgressBar value={utilizationRate} color="blue" className="mt-4" />
        </Card>

        <Card className="!bg-gray-800/50" decoration="top" decorationColor={riskProfile.color as any}>
          <p className="text-gray-400">Liquidation Risk</p>
          {isLoading ? (<div className="h-7 w-16 mt-1 bg-gray-700 rounded-md animate-pulse"></div>) :
            (<Badge color={riskProfile.color as any} size="lg" className="mt-1">{riskProfile.level}</Badge>)
          }
        </Card>

        <Card className="!bg-gray-800/50" decoration="top" decorationColor={pegStatus.color as any}>
            <p className="text-gray-400">USDC Peg Status</p>
            {isLoading ? (<div className="h-7 w-24 mt-1 bg-gray-700 rounded-md animate-pulse"></div>) :
                (<>
                    {/* Replaced <Metric> with a styled <p> tag */}
                    <p className="text-3xl font-semibold text-white">{usdcPrice ? formatCurrency(usdcPrice) : 'N/A'}</p>
                    <Badge color={pegStatus.color as any} className="mt-1">{pegStatus.status}</Badge>
                </>)
            }
        </Card>

        <Card className="!bg-gray-800/50" decoration="top" decorationColor="emerald">
            <p className="text-gray-400">Audit Status</p>
            {/* Replaced <Metric> with a styled <p> tag */}
            <p className="text-3xl font-semibold text-white">Audited ✅</p>
        </Card>
      </div>
    </div>
  );
}
