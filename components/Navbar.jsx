"use client"
import { signOut } from '@/lib/auth'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const router = useRouter()

  const handleLogout = async () => {
    await signOut()
    router.push('/login')
  }

  return (
    <nav>
      <h2>SDVT</h2>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  )
}