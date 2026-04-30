"use client"
import { motion } from 'framer-motion'
import { Server, Database, Zap, Network, Component } from 'lucide-react'
import { cn } from './nodes/CustomNodes'

const components = [
  { type: 'api', label: 'API Server', icon: Server, color: 'text-blue-400', bg: 'bg-blue-500/10 hover:bg-blue-500/20', border: 'border-blue-500/30' },
  { type: 'db', label: 'Database', icon: Database, color: 'text-green-400', bg: 'bg-green-500/10 hover:bg-green-500/20', border: 'border-green-500/30' },
  { type: 'cache', label: 'Cache', icon: Zap, color: 'text-red-400', bg: 'bg-red-500/10 hover:bg-red-500/20', border: 'border-red-500/30' },
  { type: 'lb', label: 'Load Balancer', icon: Network, color: 'text-purple-400', bg: 'bg-purple-500/10 hover:bg-purple-500/20', border: 'border-purple-500/30' },
]

export default function Sidebar() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <aside className="w-64 flex flex-col p-4 bg-slate-900/50 backdrop-blur-xl border-r border-slate-800 h-full">
      <div className="flex items-center gap-2 mb-6 text-slate-200">
        <Component className="w-5 h-5 text-indigo-400" />
        <h2 className="text-lg font-semibold tracking-wide">Components</h2>
      </div>
      
      <div className="grid gap-3">
        {components.map((c) => (
          <motion.div
            key={c.type}
            whileHover={{ scale: 1.02, x: 2 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "flex items-center gap-3 p-3 rounded-xl border cursor-grab active:cursor-grabbing transition-colors",
              c.bg, c.border
            )}
            onDragStart={(e) => onDragStart(e, c.type)}
            draggable
          >
            <c.icon className={cn("w-5 h-5", c.color)} />
            <span className="text-sm font-medium text-slate-300">{c.label}</span>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-auto p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
        <p className="text-xs text-slate-400 text-center leading-relaxed">
          Drag components onto the canvas to build your architecture.
        </p>
      </div>
    </aside>
  )
}