import GradientCard from "@/components/ui/GradientCard";

export default function RiskSection() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Risk Metrics</h2>
      <div className="grid grid-cols-1 gap-4">
        <GradientCard title="Utilization Rate" value="45%" gradient="from-blue-400 to-sky-500" />
        <GradientCard title="Liquidation Risk" value="Low" gradient="from-red-400 to-pink-500" />
        <GradientCard title="Peg Deviations" value="Stable" gradient="from-yellow-400 to-orange-500" />
        <GradientCard title="Audit Status" value="Audited ✅" gradient="from-green-400 to-emerald-500" />
      </div>
    </div>
  );
}
