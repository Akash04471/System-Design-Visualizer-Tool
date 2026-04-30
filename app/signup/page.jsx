"use client"

import { useState } from 'react'
import { signUp } from '@/lib/auth'
import { motion } from 'framer-motion'
import { Mail, Lock, Layout, UserPlus, Loader2, ArrowLeft } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import Link from 'next/link'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSignup = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    const { error } = await signUp(email, password)

    if (error) {
      toast.error(error.message, {
        style: {
          background: '#1e293b',
          color: '#f8fafc',
          border: '1px solid #ef4444'
        }
      })
      setLoading(false)
    } else {
      setSuccess(true)
      toast.success('Registration successful!', {
        duration: 5000,
        style: {
          background: '#1e293b',
          color: '#f8fafc',
          border: '1px solid #10b981'
        }
      })
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center p-4 selection:bg-indigo-500/30">
      <Toaster position="top-right" />
      
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div 
            initial={{ rotate: -20, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-2xl shadow-blue-600/20 mb-4"
          >
            <UserPlus className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Create Account</h1>
          <p className="text-slate-400">Join the next generation of designers</p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-2xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          {success ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-100 mb-3">Check your email</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                We've sent a confirmation link to <span className="text-indigo-400 font-medium">{email}</span>. Please verify your account to continue.
              </p>
              <Link 
                href="/login"
                className="inline-flex items-center text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Link>
            </motion.div>
          ) : (
            <form onSubmit={handleSignup} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">Work Email</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                  </div>
                  <input 
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="block w-full pl-11 pr-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                  </div>
                  <input 
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    className="block w-full pl-11 pr-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 px-1">
                <input type="checkbox" className="mt-1 rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-indigo-500/20" required />
                <p className="text-xs text-slate-500 leading-normal">
                  I agree to the <a href="#" className="text-slate-300 hover:underline">Terms of Service</a> and <a href="#" className="text-slate-300 hover:underline">Privacy Policy</a>.
                </p>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
          )}

          {!success && (
            <div className="mt-8 pt-6 border-t border-slate-800 text-center">
              <p className="text-slate-400 text-sm">
                Already have an account?{' '}
                <Link href="/login" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                  Sign In
                </Link>
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}