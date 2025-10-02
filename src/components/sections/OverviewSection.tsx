import GradientCard from "@/components/ui/GradientCard";

export default function OverviewSection() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Protocol Analytics</h2>
      <div className="grid grid-cols-1 gap-4">
        <GradientCard title="Daily Inflow" value="1,250,000" gradient="from-green-400 to-emerald-600" />
        <GradientCard title="Daily Outflow" value="980,000" gradient="from-pink-400 to-red-500" />
        <GradientCard title="Total Supply" value="5,400,000" gradient="from-blue-400 to-indigo-500" />
        <GradientCard title="Total Borrow" value="2,200,000" gradient="from-orange-400 to-yellow-500" />
      </div>
    </div>
  );
}
