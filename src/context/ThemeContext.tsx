import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'

export type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  isDark: boolean
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const THEME_STORAGE_KEY = 'sn-theme'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'dark') return 'dark'
    if (stored === 'light') return 'light'
  } catch {
    // Local storage unavailable
  }
  // Light mode is strictly active by default on first visit
  return 'light'
}

function applyThemeToDOM(t: Theme) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  if (t === 'dark') {
    root.classList.add('dark')
    root.setAttribute('data-theme', 'dark')
    root.style.colorScheme = 'dark'
  } else {
    root.classList.remove('dark')
    root.setAttribute('data-theme', 'light')
    root.style.colorScheme = 'light'
  }
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, t)
  } catch {
    // Storage unavailable
  }
  // Broadcast event for Three.js canvas & non-React listeners
  window.dispatchEvent(new CustomEvent('sn-theme-change', { detail: { theme: t } }))
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)

  // Direct theme setter
  const setTheme = useCallback((t: Theme) => {
    setThemeState(t)
    applyThemeToDOM(t)
  }, [])

  // Immediate toggle with functional state to prevent stale closures
  const toggleTheme = useCallback(() => {
    setThemeState((prevTheme) => {
      const nextTheme: Theme = prevTheme === 'light' ? 'dark' : 'light'
      applyThemeToDOM(nextTheme)
      return nextTheme
    })
  }, [])

  // Ensure DOM is in sync on mount and handle cross-tab storage sync
  useEffect(() => {
    applyThemeToDOM(theme)

    const handleStorage = (e: StorageEvent) => {
      if (e.key === THEME_STORAGE_KEY && (e.newValue === 'light' || e.newValue === 'dark')) {
        const newTheme = e.newValue as Theme
        setThemeState(newTheme)
        applyThemeToDOM(newTheme)
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, []) // run once on mount

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark: theme === 'dark',
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
