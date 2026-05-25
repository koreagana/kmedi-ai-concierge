import { useApp } from '../contexts/AppContext'
import StudioScene from './StudioScene'

export default function StudioOrchestrator() {
  const { stage } = useApp()
  return (
    <div className="fixed inset-0 overflow-hidden">
      <StudioScene />
    </div>
  )
}
