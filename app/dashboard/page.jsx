"use client"

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import Sidebar from '@/components/Sidebar'
import { saveDesign, getDesigns, updateDesign, updateDesignVisibility, deleteDesign } from "@/lib/designs"
import { getUser } from "@/lib/auth"
import { motion, AnimatePresence } from 'framer-motion'
import { Save, LogOut, Layout, Plus, ExternalLink, Trash2, Globe, Lock, MoreVertical } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import { supabase } from "@/lib/supabaseClient"

const Canvas = dynamic(() => import('@/components/Canvas'), { ssr: false })

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const [designs, setDesigns] = useState([])
  const [currentId, setCurrentId] = useState(null)
  const [currentTitle, setCurrentTitle] = useState("Untitled Design")
  
  // To handle dropdowns in cards
  const [activeMenu, setActiveMenu] = useState(null)

  useEffect(() => {
    async function loadUserAndDesigns() {
      const currentUser = await getUser()
      if (!currentUser) {
        router.push('/login')
        return
      }

      setUser(currentUser)
      const { data } = await getDesigns(currentUser.id)
      setDesigns(data || [])
      setLoading(false)
    }

    loadUserAndDesigns()
  }, [router])

  const reloadDesigns = async () => {
    if (user) {
      const { data } = await getDesigns(user.id)
      setDesigns(data || [])
    }
  }

  const handleSave = async () => {
    if (!user) {
      toast.error('Not authenticated. Please log in again.')
      router.push('/login')
      return
    }

    let titleToSave = currentTitle
    if (!currentId) {
      const newTitle = prompt("Enter design title", currentTitle)
      if (!newTitle) return
      titleToSave = newTitle
      setCurrentTitle(newTitle)
    }

    const savePromise = async () => {
      if (currentId) {
        const { error } = await updateDesign(currentId, user.id, nodes, edges)
        if (error) throw new Error(error.message)
        await reloadDesigns()
      } else {
        const { data, error } = await saveDesign(user.id, titleToSave, nodes, edges)
        if (error) throw new Error(error.message)
        setCurrentId(data?.[0]?.id ?? null)
        await reloadDesigns()
      }
    }

    toast.promise(savePromise(), {
      loading: 'Saving design...',
      success: 'Saved successfully!',
      error: (err) => `Save failed: ${err.message}`,
    }, {
      style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }
    })
  }

  const createNewDesign = () => {
    setNodes([])
    setEdges([])
    setCurrentId(null)
    setCurrentTitle("Untitled Design")
    toast('New design created', { icon: '✨', style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #334155' } })
  }

  const loadDesign = (design) => {
    setNodes(design.data?.nodes || [])
    setEdges(design.data?.edges || [])
    setCurrentId(design.id)
    setCurrentTitle(design.title)
    toast.success(`Loaded ${design.title}`, { style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #334155' } })
  }

  const handleDelete = async (id, e) => {
    e.stopPropagation()
    if (!confirm('Are you sure you want to delete this design?')) return

    try {
      await deleteDesign(id, user.id)
      if (currentId === id) createNewDesign()
      await reloadDesigns()
      toast.success('Design deleted')
    } catch (err) {
      toast.error('Failed to delete design')
    }
    setActiveMenu(null)
  }

  const togglePublic = async (id, currentStatus, e) => {
    e.stopPropagation()
    try {
      await updateDesignVisibility(id, user.id, !currentStatus)
      await reloadDesigns()
      toast.success(`Design made ${!currentStatus ? 'Public' : 'Private'}`)
    } catch (err) {
      toast.error('Failed to update visibility. Check if is_public column exists in DB.')
    }
    setActiveMenu(null)
  }

  const copyShareLink = (id, e) => {
    e.stopPropagation()
    const url = `${window.location.origin}/design/${id}`
    navigator.clipboard.writeText(url)
    toast.success('Link copied to clipboard')
    setActiveMenu(null)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#050816] text-slate-200 font-sans">
      <Toaster position="top-right" />
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 flex justify-between items-center px-6 py-3 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Layout className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              SysViz
            </h1>
            <p className="text-xs text-slate-400 font-medium">Architecture Designer</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end mr-4">
            <span className="text-sm font-medium text-slate-200">{user?.email}</span>
            <span className="text-xs text-slate-500">Pro Plan</span>
          </div>
          
          <button
            onClick={createNewDesign}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors border border-transparent hover:border-slate-700"
            title="New Design"
          >
            <Plus className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-indigo-500/20"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>

          <div className="w-px h-6 bg-slate-700 mx-1"></div>

          <button
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
            title="Log Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 flex flex-col relative overflow-hidden">
          {/* Canvas Header info */}
          <div className="absolute top-4 left-4 z-10 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-700 shadow-xl flex items-center gap-3">
            <span className="font-medium text-slate-200">{currentTitle}</span>
            {currentId && (
              <span className="text-xs px-2 py-1 bg-slate-800 rounded-md text-slate-400">
                Saved
              </span>
            )}
          </div>

          <div className="flex-1 w-full h-full">
            <Canvas
              nodes={nodes}
              setNodes={setNodes}
              edges={edges}
              setEdges={setEdges}
            />
          </div>
        </main>

        {/* Right Sidebar - Saved Designs */}
        <aside className="w-80 flex flex-col bg-slate-900/50 backdrop-blur-xl border-l border-slate-800 p-4 h-[calc(100vh-65px)] overflow-y-auto">
          <div className="flex items-center justify-between mb-6 mt-2">
            <h2 className="text-lg font-semibold text-slate-200">Your Designs</h2>
            <span className="text-xs font-medium px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded-full">
              {designs.length}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {designs.length === 0 ? (
              <div className="text-center p-8 bg-slate-800/30 rounded-2xl border border-slate-800 border-dashed">
                <Layout className="w-8 h-8 text-slate-500 mx-auto mb-3" />
                <p className="text-sm text-slate-400">No designs yet.</p>
                <button onClick={createNewDesign} className="mt-4 text-sm text-indigo-400 hover:text-indigo-300 font-medium">
                  Create your first architecture
                </button>
              </div>
            ) : (
              <AnimatePresence>
                {designs.map((d) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={d.id}
                    onClick={() => loadDesign(d)}
                    className={`relative p-4 rounded-xl border cursor-pointer transition-all ${
                      currentId === d.id 
                        ? 'bg-indigo-500/10 border-indigo-500/50 shadow-lg shadow-indigo-500/5' 
                        : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-slate-200 pr-6 truncate">{d.title}</h3>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === d.id ? null : d.id) }}
                        className="absolute right-3 top-3 p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-700 transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-3 text-xs font-medium mt-3">
                      {d.is_public ? (
                        <span className="flex items-center gap-1 text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                          <Globe className="w-3 h-3" /> Public
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                          <Lock className="w-3 h-3" /> Private
                        </span>
                      )}
                      <span className="text-slate-500">
                        {new Date(d.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Dropdown Menu */}
                    {activeMenu === d.id && (
                      <div className="absolute right-2 top-10 w-40 bg-slate-800 border border-slate-700 rounded-lg shadow-xl py-1 z-20 overflow-hidden">
                        {d.is_public && (
                          <button 
                            onClick={(e) => copyShareLink(d.id, e)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" /> Copy Link
                          </button>
                        )}
                        <button 
                          onClick={(e) => togglePublic(d.id, d.is_public, e)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                        >
                          {d.is_public ? <Lock className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                          Make {d.is_public ? 'Private' : 'Public'}
                        </button>
                        <div className="h-px w-full bg-slate-700 my-1"></div>
                        <button 
                          onClick={(e) => handleDelete(d.id, e)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-400/10 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
