"use client"
import { Handle, Position } from 'reactflow'
import { Server, Database, Zap, Network } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const NodeWrapper = ({ children, title, icon: Icon, colorClass, borderClass, selected }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        "relative flex flex-col items-center justify-center min-w-[140px] p-3 rounded-xl shadow-lg border-2 transition-all duration-300",
        "bg-slate-900/80 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)]",
        borderClass,
        selected ? "ring-2 ring-violet-500 ring-offset-2 ring-offset-[#02040a] scale-105 shadow-[0_0_25px_rgba(139,92,246,0.3)]" : "hover:scale-105 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)]"
      )}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-slate-400 border-2 border-slate-900" />
      
      <div className={cn("p-2 rounded-lg mb-2", colorClass)}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="text-sm font-semibold text-slate-200">{title}</div>
      
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-slate-400 border-2 border-slate-900" />
    </motion.div>
  )
}

export const ApiNode = ({ data, selected }) => (
  <NodeWrapper title={data.label || 'API Server'} icon={Server} colorClass="bg-violet-500/20 text-violet-400" borderClass="border-violet-500/30" selected={selected} />
)

export const DbNode = ({ data, selected }) => (
  <NodeWrapper title={data.label || 'Database'} icon={Database} colorClass="bg-cyan-500/20 text-cyan-400" borderClass="border-cyan-500/30" selected={selected} />
)

export const CacheNode = ({ data, selected }) => (
  <NodeWrapper title={data.label || 'Redis Cache'} icon={Zap} colorClass="bg-rose-500/20 text-rose-400" borderClass="border-rose-500/30" selected={selected} />
)

export const LbNode = ({ data, selected }) => (
  <NodeWrapper title={data.label || 'Load Balancer'} icon={Network} colorClass="bg-cyan-500/20 text-cyan-400" borderClass="border-cyan-500/30" selected={selected} />
)

export const customNodeTypes = {
  api: ApiNode,
  db: DbNode,
  cache: CacheNode,
  lb: LbNode,
}
