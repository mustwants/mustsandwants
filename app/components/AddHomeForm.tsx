'use client'
import React, { useState } from 'react'

export default function AddHomeForm({ onAdd }: { onAdd: (h: { url: string; notes?: string }) => void }) {
  const [url, setUrl] = useState('')
  const [notes, setNotes] = useState('')

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (url.trim()) {
          onAdd({ url, notes })
          setUrl('')
          setNotes('')
        }
      }}
      className="bg-white rounded-lg shadow p-4 flex flex-col gap-3"
    >
      <input
        type="url"
        placeholder="Home URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-mwAqua focus:outline-none"
      />
      <textarea
        placeholder="Notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-mwAqua focus:outline-none"
      />
      <button
        type="submit"
        className="bg-mwAqua text-white rounded-md py-2 font-semibold hover:opacity-90 transition"
      >
        Add Home
      </button>
    </form>
  )
}
