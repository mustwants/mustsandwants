'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function AddHomeForm({ onAdd }: { onAdd: (h: any) => void }) {
  const [url, setUrl] = useState('')
  const [notes, setNotes] = useState('')
  const [tags, setTags] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!url.trim()) return

    const { data, error } = await supabase
      .from('user_homes')
      .insert([{ url, notes, tags: tags.split(',').map(t => t.trim()) }])
      .select()

    if (!error && data) onAdd(data[0])
    setUrl(''); setNotes(''); setTags('')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow space-y-3">
      <input
        type="url"
        required
        placeholder="Paste listing URL"
        value={url}
        onChange={e => setUrl(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <textarea
        placeholder="Notes"
        value={notes}
        onChange={e => setNotes(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <input
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={e => setTags(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <button className="bg-green-600 text-white py-2 rounded w-full">Add Home</button>
    </form>
  )
}
