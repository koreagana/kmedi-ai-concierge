import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

export type AppStage =
  | 'entering'   // video plays, studio fades in
  | 'greeting'   // avatars greet (voice)
  | 'menu'       // hologram FUI menu active
  | 'service'    // service detail panel
  | 'hospital'   // hospital selection
  | 'pricing'    // price display
  | 'contact'    // WeChat / payment

export type Language = 'zh' | 'ko' | 'en' | 'ar'

interface AppState {
  stage: AppStage
  setStage: (s: AppStage) => void
  language: Language
  setLanguage: (l: Language) => void
  selectedService: string | null
  setSelectedService: (s: string | null) => void
  selectedHospital: string | null
  setSelectedHospital: (h: string | null) => void
}

const AppContext = createContext<AppState>({} as AppState)

export function AppProvider({ children }: { children: ReactNode }) {
  const [stage, setStage] = useState<AppStage>('entering')
  const [language, setLanguage] = useState<Language>('zh')
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null)

  return (
    <AppContext.Provider value={{
      stage, setStage,
      language, setLanguage,
      selectedService, setSelectedService,
      selectedHospital, setSelectedHospital,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
