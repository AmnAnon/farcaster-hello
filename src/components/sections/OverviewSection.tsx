// src/components/sections/OverviewSection.tsx
import MetricCard from "@/components/ui/MetricCard";
import { formatCurrency } from "@/lib/utils";
import { DollarSign, Clock, Package, CreditCard } from "lucide-react";

export default function OverviewSection({ data, isLoading }: any) {
  console.log("Data received by OverviewSection:", data);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Protocol Analytics</h2>

      <div className="grid grid-cols-2 gap-4">
        <MetricCard
          title="Total Value Locked"
          icon={<DollarSign className="h-4 w-4 text-purple-400" />}
          value={formatCurrency(data?.tvl)}
          change={data?.tvl_24h_change} 
          chartData={data?.historicalTvlData}
          tooltip="Total assets locked in Seamless on Base."
          isLoading={isLoading}
        />
        <MetricCard
          title="24h Fees Generated"
          icon={<Clock className="h-4 w-4 text-blue-400" />}
          value={formatCurrency(data?.fees24h)}
          tooltip="Revenue from lending activities over last 24h."
          isLoading={isLoading}
        />
        <MetricCard
          title="Total Supply"
          icon={<Package className="h-4 w-4 text-emerald-400" />}
          value={formatCurrency(data?.totalSupply)}
          tooltip="Available deposits for borrowing; key for liquidity."
          isLoading={isLoading}
        />
        <MetricCard
          title="Total Borrow"
          icon={<CreditCard className="h-4 w-4 text-amber-400" />}
          value={formatCurrency(data?.totalBorrow)}
          tooltip="Outstanding loans; monitor for over-leverage risks."
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
