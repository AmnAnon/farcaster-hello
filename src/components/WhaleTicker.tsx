"use client";
import { motion } from "framer-motion";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function WhaleTicker() {
  const { data } = useSWR("/api/seamless", fetcher);
  const recentActions = data?.recentActions ?? [];

  return (
    <div className="overflow-hidden bg-black/40 text-green-400 rounded-xl p-2">
      <motion.div
        className="whitespace-nowrap flex gap-6"
        animate={{ x: [0, -500] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {recentActions.length > 0 ? (
          recentActions.map((action: any) => (
            <span key={action.id}>
              🐋 {action.type}: ${action.amount} at{" "}
              {new Date(action.timestamp * 1000).toLocaleTimeString()}
            </span>
          ))
        ) : (
          <span>No whale actions yet...</span>
        )}
      </motion.div>
    </div>
  );
}
