"use client";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar,
  PieChart, Pie, Cell
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

interface ChartsSectionProps {
  assetPrices: any;
  isLoading: boolean;
}

export default function ChartsSection({ assetPrices, isLoading }: ChartsSectionProps) {
  
  if (isLoading || !assetPrices) {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Performance Charts</h2>
        <p className="text-gray-400">Loading chart data...</p>
      </div>
    );
  }

 
  const assetAllocData = Object.keys(assetPrices).map(key => ({
    name: key.toUpperCase(),
    value: assetPrices[key].usd,
  }));

  
  const inflowOutflowData = [
    { time: "Day 1", inflow: 100000, outflow: 90000 },
    { time: "Day 2", inflow: 125000, outflow: 110000 },
    { time: "Day 3", inflow: 150000, outflow: 120000 },
  ];

 
  const borrowSupplyData = [
    { name: "Borrow", value: 2200000 },
    { name: "Supply", value: 5400000 },
  ];

 
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {/* Pie Chart */}
      <div className="bg-gray-800 p-4 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-2 text-white">Asset Allocation</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={assetAllocData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {assetAllocData.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      {/* Line Chart */}
      <div className="bg-gray-800 p-4 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-2 text-white">Inflow vs Outflow</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={inflowOutflowData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="inflow" stroke="#82ca9d" />
            <Line type="monotone" dataKey="outflow" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-gray-800 p-4 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-2 text-white">Borrow vs Supply</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={borrowSupplyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
