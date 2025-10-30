'use client'
import { useState } from 'react'

interface AddHomeFormProps {
  onAdd: (home: { url: string; notes?: string }) => Promise<void>
}

export default function AddHomeForm({ onAdd }: AddHomeFormProps) {
  const [url, setUrl] = useState('')
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isUrlValid = url.trim().length > 0

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault()
        if (!isUrlValid || isSubmitting) return
        try {
          setIsSubmitting(true)
          await onAdd({ url: url.trim(), notes: notes.trim() ? notes.trim() : undefined })
          setUrl('')
          setNotes('')
        } finally {
          setIsSubmitting(false)
        }
      }}
      className="space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)]">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold uppercase tracking-wide text-gray-600">Home URL</span>
          <input
            type="url"
            placeholder="https://www.example.com/listing/123"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            required
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 shadow-sm transition focus:border-mwAqua focus:ring-2 focus:ring-mwAqua/40"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold uppercase tracking-wide text-gray-600">Notes (optional)</span>
          <textarea
            placeholder="Add personal notes, must-haves, or questions for your agent."
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={3}
            className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 shadow-sm transition focus:border-mwAqua focus:ring-2 focus:ring-mwAqua/40"
          />
        </label>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-500">
          Paste any home listing link. We’ll pull the headline and photo so both of you recognise it instantly.
        </p>
        <button
          type="submit"
          disabled={!isUrlValid || isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-mwBlack px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-mwBlack/20 transition hover:bg-mwPink focus:outline-none focus:ring-2 focus:ring-mwAqua disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {isSubmitting ? 'Adding…' : 'Add Home'}
        </button>
      </div>
    </form>
  )
}