'use client'
import { useEffect } from 'react'

export default function MWModal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative">
        <button
          className="absolute top-3 right-3 text-mwPink font-bold text-lg"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        {title && <h3 className="text-xl font-heading text-mwAqua mb-4">{title}</h3>}
        {children}
      </div>
    </div>
  )
}
