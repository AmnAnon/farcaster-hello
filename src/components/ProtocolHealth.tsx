"use client";
import { Card, CardContent } from "@/components/ui/card";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ProtocolHealth() {
  const { data, error } = useSWR("/api/seamless", fetcher);

  if (error) return <Card><CardContent>Error loading protocol health</CardContent></Card>;
  if (!data) return <Card><CardContent>Loading...</CardContent></Card>;

  return (
    <Card className="bg-gradient-to-r from-purple-900 to-indigo-800 text-white shadow-xl rounded-2xl">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">Protocol Health</h2>
        <div className="grid grid-cols-2 gap-4">
          {data.markets.map((m: any) => (
            <div key={m.id} className="p-3 rounded-lg bg-black/30">
              <p className="font-semibold">{m.name}</p>
              <p>Total Deposits: ${Number(m.totalDeposits).toFixed(2)}</p>
              <p>Total Borrows: ${Number(m.totalBorrows).toFixed(2)}</p>
              <p>Utilization: {(Number(m.utilizationRate) * 100).toFixed(2)}%</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
