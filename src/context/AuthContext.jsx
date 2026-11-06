import { createContext, useContext } from 'react'
const AuthContext = createContext(null)
export const AuthProvider = AuthContext.Provider
export const useAuthContext = () => useContext(AuthContext)
