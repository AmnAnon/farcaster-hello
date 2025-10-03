"use client";

interface StatCardProps {
  title: string;
  value: string;
  isLoading: boolean;
}

export default function StatCard({ title, value, isLoading }: StatCardProps) {
  return (
    <div className="bg-gray-800/50 p-4 rounded-xl shadow-lg">
      <p className="text-sm text-gray-400 mb-2">{title}</p>
      {isLoading ? (
        <div className="h-7 w-24 bg-gray-700 rounded-md animate-pulse"></div>
      ) : (
        <p className="text-2xl font-semibold text-white">{value}</p>
      )}
    </div>
  );
}
