'use client'
import { useState } from 'react'
import { addHome } from '../lib/supabaseClient'

export default function AddHomeForm({ onAdd }: { onAdd: (home: { url: string; notes?: string; tags?: string[] }) => void }) {
  const [url, setUrl] = useState('')
  const [notes, setNotes] = useState('')
  const [tags, setTags] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!url.trim()) return

    // Add home using local mock instead of Supabase
    const { data, success } = await addHome({
      url,
      notes,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean)
    })

    if (success && data) {
      onAdd(data)
      setUrl('')
      setNotes('')
      setTags('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-4 border border-gray-200">
      <label className="block">
        <span className="font-semibold text-gray-800">Paste listing URL</span>
        <input
          type="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="https://www.zillow.com/..."
          className="mt-1 w-full p-2 border rounded-md focus:ring-2 focus:ring-[#00BFA5]"
          required
        />
      </label>

      <label className="block">
        <span className="font-semibold text-gray-800">Notes</span>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Add personal notes about this home..."
          className="mt-1 w-full p-2 border rounded-md focus:ring-2 focus:ring-[#AEEA00]"
          rows={2}
        />
      </label>

      <label className="block">
        <span className="font-semibold text-gray-800">Tags (comma-separated)</span>
        <input
          type="text"
          value={tags}
          onChange={e => setTags(e.target.value)}
          placeholder="waterfront, open floor plan, near base"
          className="mt-1 w-full p-2 border rounded-md focus:ring-2 focus:ring-[#AEEA00]"
        />
      </label>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-[#00BFA5] to-[#AEEA00] text-white font-semibold py-2 rounded-md hover:opacity-90 transition"
      >
        Add Home
      </button>
    </form>
  )
}
