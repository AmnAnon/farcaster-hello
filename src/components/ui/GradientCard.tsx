import { motion } from "framer-motion";

interface GradientCardProps {
  title: string;
  value: string;
  gradient: string;
}

export default function GradientCard({ title, value, gradient }: GradientCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`p-5 rounded-2xl shadow-lg bg-gradient-to-r ${gradient}`}
    >
      <p className="text-sm font-medium text-white">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </motion.div>
  );
}
