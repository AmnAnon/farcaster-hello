// src/components/sections/MarketSection.tsx
"use client";

import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Badge,
} from "@tremor/react";
import { formatCurrency } from "@/lib/utils";

export default function MarketSection({ data, isLoading }: any) {
  const markets = data?.markets || [];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Asset Markets</h2>
      <Card className="!bg-gray-800/50">
        {isLoading ? (
          <div className="p-6 text-center text-gray-400">Loading market data...</div>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell className="text-gray-400">Asset</TableHeaderCell>
                <TableHeaderCell className="text-gray-400 text-right">Total Supply</TableHeaderCell>
                <TableHeaderCell className="text-gray-400 text-right">Total Borrow</TableHeaderCell>
                {/* We can add APY columns here later */}
              </TableRow>
            </TableHead>
            <TableBody>
              {markets.map((item: any) => (
                <TableRow key={item.name}>
                  <TableCell className="text-white">{item.name}</TableCell>
                  <TableCell className="text-right text-white">
                    {formatCurrency(parseFloat(item.totalDepositBalanceUSD))}
                  </TableCell>
                  <TableCell className="text-right text-white">
                    {formatCurrency(parseFloat(item.totalBorrowBalanceUSD))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}

