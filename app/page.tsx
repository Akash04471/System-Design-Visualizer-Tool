"use client"

import { motion } from "framer-motion"
import { 
  Layout, 
  ArrowRight, 
  Share2, 
  Database, 
  ShieldCheck, 
  MousePointer2, 
  Zap, 
  Code, 
  Component
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="group relative p-8 rounded-3xl bg-slate-900/30 backdrop-blur-xl border border-slate-800/50 hover:border-violet-500/50 transition-all duration-500"
  >
    <div className="relative">
      <div className="w-12 h-12 bg-violet-500/10 text-violet-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-500">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-slate-100 mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
  </motion.div>
)

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-[#02040a] text-slate-200 selection:bg-violet-500/30 overflow-x-hidden font-sans">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-600/20">
              <Layout className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">SDVT</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#tech" className="hover:text-white transition-colors">Stack</a>
            <a href="https://github.com/Akash04471/System-Design-Visualizer-Tool" target="_blank" className="hover:text-white transition-colors flex items-center gap-2">
              <Code className="w-4 h-4" /> Github
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="px-5 py-2.5 text-sm font-semibold text-slate-300 hover:text-white transition-colors">
              Log in
            </Link>
            <Link href="/signup" className="px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white rounded-xl shadow-lg shadow-violet-600/20 transition-all active:scale-95">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/10 blur-[140px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/10 blur-[140px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-8"
          >
            <Zap className="w-4 h-4" />
            <span>Aurora Cyberpunk Edition</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tight text-white mb-8"
          >
            Design Systems <br />
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-rose-400 bg-clip-text text-transparent">
              Without Friction.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            The premium visualizer for system architects. Build, collaborate, and share your infrastructure designs in real-time with our sleek canvas editor.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="/signup" className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white rounded-2xl font-bold text-lg shadow-xl shadow-violet-600/20 transition-all flex items-center justify-center gap-2">
              Start Building Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto px-8 py-4 bg-slate-900/50 backdrop-blur-xl border border-slate-800 hover:border-slate-700 text-slate-200 rounded-2xl font-bold text-lg transition-all flex items-center justify-center">
              View Dashboard
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Floating Elements / Mock Canvas Preview */}
      <section className="py-20 px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto rounded-[32px] overflow-hidden border border-slate-800 bg-slate-900/30 backdrop-blur-sm p-4 relative"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-50" />
          <div className="aspect-[16/9] rounded-2xl bg-slate-950 flex items-center justify-center relative overflow-hidden group">
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#334155 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            
            {/* Mock Nodes */}
            <div className="relative w-full h-full p-12 flex items-center justify-center gap-8">
               <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="p-4 rounded-xl bg-slate-900 border border-violet-500/50 shadow-[0_0_20px_rgba(139,92,246,0.1)] flex items-center gap-3"
               >
                 <Code className="w-5 h-5 text-violet-400" />
                 <span className="text-sm font-semibold">Load Balancer</span>
               </motion.div>

               <div className="w-16 h-[2px] bg-violet-500/30 rounded-full" />

               <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="p-4 rounded-xl bg-slate-900 border border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.1)] flex items-center gap-3"
               >
                 <Database className="w-5 h-5 text-cyan-400" />
                 <span className="text-sm font-semibold">Main Cluster</span>
               </motion.div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-12 text-center">
                <span className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold text-sm shadow-lg shadow-violet-600/20">Interactive Editor</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Built for Architects</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Everything you need to visualize, optimize, and share your system designs in one premium package.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={MousePointer2}
              title="Fluid Editor"
              description="Seamless drag-and-drop experience powered by React Flow. Build architectures in seconds."
              delay={0.1}
            />
            <FeatureCard 
              icon={Component}
              title="Smart Components"
              description="Pre-configured nodes for API Servers, Databases, Caches, and Load Balancers."
              delay={0.2}
            />
            <FeatureCard 
              icon={Share2}
              title="Shareable Links"
              description="Generate read-only public links instantly. Collaboration made simple."
              delay={0.3}
            />
            <FeatureCard 
              icon={ShieldCheck}
              title="Secure by Design"
              description="Full RLS security on Supabase. Your private designs stay private."
              delay={0.4}
            />
            <FeatureCard 
              icon={Zap}
              title="Modern Stack"
              description="Built with Next.js 15, Tailwind CSS, and Framer Motion for a 2026-level experience."
              delay={0.5}
            />
            <FeatureCard 
              icon={Database}
              title="Cloud Sync"
              description="Auto-save functionality ensures you never lose a node. Access designs anywhere."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-slate-800 bg-slate-950/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <Layout className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">SDVT</span>
          </div>

          <p className="text-slate-500 text-sm">
            © 2026 System Design Visualizer Tool. Built for the modern engineer.
          </p>

          <div className="flex items-center gap-6">
            <a href="https://github.com/Akash04471/System-Design-Visualizer-Tool" target="_blank" className="text-slate-400 hover:text-white transition-colors">
              <Code className="w-6 h-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
