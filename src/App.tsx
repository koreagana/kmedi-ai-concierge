import { AppProvider } from './contexts/AppContext'
import StudioOrchestrator from './components/StudioOrchestrator'

export default function App() {
  return (
    <AppProvider>
      <StudioOrchestrator />
    </AppProvider>
  )
}
