"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar,
  PieChart, Pie, Cell
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function ChartsSection() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/analytics");
        setData(res.data);
      } catch (err) {
        console.error("Error fetching chart data:", err);
      }
    }
    fetchData();
  }, []);

  if (!data) return <p className="text-gray-500">Loading charts...</p>;

  // ✅ Mock timeseries for line chart
  const inflowOutflowData = [
    { time: "Day 1", inflow: 100000, outflow: 90000 },
    { time: "Day 2", inflow: 125000, outflow: 110000 },
    { time: "Day 3", inflow: 150000, outflow: 120000 },
  ];

  // ✅ Borrow vs Supply (bar chart)
  const borrowSupplyData = [
    { name: "Borrow", value: data.totalBorrow },
    { name: "Supply", value: data.totalSupply },
  ];

  // ✅ Asset Allocation (pie chart)
  const assetAllocData = data.assetPrices.map((a: any) => ({
    name: a.symbol,
    value: a.price, // for demo – later replace with % of portfolio
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
      {/* Line Chart */}
      <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">Inflow vs Outflow</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={inflowOutflowData}>
            <CartesianGrid strokeDasharray="3 3" />
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
      <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">Borrow vs Supply</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={borrowSupplyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">Asset Allocation</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={assetAllocData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label
            >
              {assetAllocData.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
