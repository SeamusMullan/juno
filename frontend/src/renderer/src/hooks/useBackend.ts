import { useContext } from 'react'
import { BackendContext } from '../context/BackendContext'

interface BackendContextType {
  isBackendOnline: boolean
  setBackendOnline: (online: boolean) => void
}

export function useBackend(): BackendContextType {
  const context = useContext(BackendContext)
  if (context === undefined) {
    throw new Error('useBackend must be used within a BackendProvider')
  }
  return context
}
