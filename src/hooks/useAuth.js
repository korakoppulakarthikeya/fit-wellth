import { useState } from 'react'
import { signIn, signOut } from '../services/authService'
export function useAuth() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  async function login(email, password) { try { const result = await signIn(email, password); setUser(result.user); setError(''); return true } catch(e) { setError(e.message); return false } }
  async function logout() { await signOut(); setUser(null) }
  return { user, error, login, logout }
}
