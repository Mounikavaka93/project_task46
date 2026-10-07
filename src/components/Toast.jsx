import { X } from 'lucide-react'
import { useShop } from '../hooks/useShop'

export function Toast() {
  const { toast, dismissToast } = useShop()
  if (!toast) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-[80] flex justify-center px-4">
      <div
        role="status"
        className="toast-in pointer-events-auto flex items-center gap-3 rounded-full border border-sand bg-ink px-4 py-2.5 text-sm text-cream shadow-soft"
      >
        <span>{toast}</span>
        <button type="button" onClick={dismissToast} aria-label="Dismiss notification" className="text-cream/70 hover:text-white">
          <X size={14} />
        </button>
      </div>
    </div>
  )
}
