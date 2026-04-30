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
        "bg-slate-900/80 backdrop-blur-md",
        borderClass,
        selected ? "ring-2 ring-offset-2 ring-offset-slate-950 ring-blue-500 scale-105" : "hover:scale-105"
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
  <NodeWrapper title={data.label || 'API Server'} icon={Server} colorClass="bg-blue-500/20 text-blue-400" borderClass="border-blue-500/30" selected={selected} />
)

export const DbNode = ({ data, selected }) => (
  <NodeWrapper title={data.label || 'Database'} icon={Database} colorClass="bg-green-500/20 text-green-400" borderClass="border-green-500/30" selected={selected} />
)

export const CacheNode = ({ data, selected }) => (
  <NodeWrapper title={data.label || 'Redis Cache'} icon={Zap} colorClass="bg-red-500/20 text-red-400" borderClass="border-red-500/30" selected={selected} />
)

export const LbNode = ({ data, selected }) => (
  <NodeWrapper title={data.label || 'Load Balancer'} icon={Network} colorClass="bg-purple-500/20 text-purple-400" borderClass="border-purple-500/30" selected={selected} />
)

export const customNodeTypes = {
  api: ApiNode,
  db: DbNode,
  cache: CacheNode,
  lb: LbNode,
}
