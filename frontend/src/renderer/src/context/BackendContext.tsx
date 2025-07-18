import React, { createContext, useState, useEffect, ReactNode } from 'react'

interface BackendContextType {
  isBackendOnline: boolean
  setBackendOnline: (online: boolean) => void
}

export const BackendContext = createContext<BackendContextType | undefined>(undefined)

interface BackendProviderProps {
  children: ReactNode
}

export function BackendProvider({ children }: BackendProviderProps): React.JSX.Element {
  const [isBackendOnline, setIsBackendOnline] = useState<boolean>(true)

  useEffect(() => {
    const checkBackendHealth = async (): Promise<void> => {
      try {
        const response = await fetch('http://localhost:8000/status/health', {
          signal: AbortSignal.timeout(3000) // 3 second timeout
        })
        if (response.status !== 200) {
          setIsBackendOnline(false)
          // maybe do something to say this to the user...
        } else {
          setIsBackendOnline(true)
        }
      } catch {
        setIsBackendOnline(false) // it definitely aint workin
      }
    }

    // Initial check
    checkBackendHealth()

    // Set up interval to check every 5 seconds
    const intervalId = setInterval(checkBackendHealth, 5000)

    // Cleanup interval on unmount
    return () => clearInterval(intervalId)
  }, [])

  const setBackendOnline = (online: boolean): void => {
    setIsBackendOnline(online)
  }

  return (
    <BackendContext.Provider value={{ isBackendOnline, setBackendOnline }}>
      {children}
    </BackendContext.Provider>
  )
}
