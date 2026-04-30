"use client"

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { getPublicDesign } from '@/lib/designs'
import { motion } from 'framer-motion'
import { ArrowLeft, Copy, Share2, AlertCircle, LayoutTemplate } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

const Canvas = dynamic(() => import('@/components/Canvas'), { ssr: false })

export default function PublicDesignPage() {
  const params = useParams()
  const router = useRouter()
  const { id } = params

  const [design, setDesign] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadDesign() {
      if (!id) return
      
      try {
        const { data, error } = await getPublicDesign(id)
        if (error || !data) {
          setError(error?.message || 'Design not found or is not public.')
        } else {
          setDesign(data)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadDesign()
  }, [id])

  const copyShareLink = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    toast.success('Share link copied to clipboard!', {
      style: {
        background: '#1e293b',
        color: '#f8fafc',
        border: '1px solid #334155'
      }
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (error || !design) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 text-center"
        >
          <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-100 mb-2">Design Not Found</h1>
          <p className="text-slate-400 mb-8 leading-relaxed">
            The design you are looking for does not exist, or it has been set to private by the owner.
          </p>
          <button 
            onClick={() => router.push('/dashboard')}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#050816] text-slate-200">
      <Toaster position="top-right" />
      
      {/* Top Navbar */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-slate-900/80 backdrop-blur-md border-b border-slate-800"
      >
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/dashboard')}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="h-6 w-px bg-slate-700" />
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-500/20 text-indigo-400 rounded-lg flex items-center justify-center">
              <LayoutTemplate className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-100 leading-tight">
                {design.title || 'Untitled Design'}
              </h1>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="flex w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Public View (Read-Only)
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={copyShareLink}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-lg font-medium transition-colors"
        >
          <Share2 className="w-4 h-4" />
          Share Link
        </button>
      </motion.header>

      {/* Canvas Area */}
      <main className="flex-1 relative">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="absolute inset-0"
        >
          <Canvas
            nodes={design.data?.nodes || []}
            edges={design.data?.edges || []}
            readOnly={true}
          />
        </motion.div>
      </main>
    </div>
  )
}
