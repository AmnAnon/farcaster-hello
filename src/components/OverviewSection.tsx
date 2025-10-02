// src/components/sections/OverviewSection.tsx
import StatCard from "@/components/ui/StatCard";

const formatCurrency = (value: number) => {
  if (!value) return '$0'; // Handle case where value might be null or undefined
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(value);
};

export default function OverviewSection({ data, isLoading }: any) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Protocol Analytics</h2>
      <div className="grid grid-cols-2 gap-4">
        <StatCard 
          title="Total Value Locked" 
          value={formatCurrency(data?.tvl)} 
          isLoading={isLoading} 
        />
        <StatCard 
          title="24h Fees Generated" 
          value={formatCurrency(data?.fees24h)} 
          isLoading={isLoading} 
        />
        <StatCard 
          title="Total Supply" 
          value={formatCurrency(data?.totalSupply)} 
          isLoading={isLoading} 
        />
        <StatCard 
          title="Total Borrow" 
          value={formatCurrency(data?.totalBorrow)} 
          isLoading={isLoading} 
        />
      </div>
    </div>
  );
}
