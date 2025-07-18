import { createContext } from 'react'

interface BackendContextType {
  isBackendOnline: boolean
  setBackendOnline: (online: boolean) => void
}

export const BackendContext = createContext<BackendContextType | undefined>(undefined)
