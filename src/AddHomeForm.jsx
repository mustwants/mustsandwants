import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function AddHomeForm({ onAdd }) {
  const [url, setUrl] = useState('')
  const [notes, setNotes] = useState('')
  const [tags, setTags] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!url.trim()) return

    const { data, error } = await supabase
      .from('user_homes')
      .insert([{ url, notes, tags: tags.split(',').map(t => t.trim()) }])
      .select()

    if (error) console.error(error)
    else onAdd(data[0])

    setUrl('')
    setNotes('')
    setTags('')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded-xl space-y-3">
      <input
        type="url"
        placeholder="Paste home listing URL"
        value={url}
        onChange={e => setUrl(e.target.value)}
        className="border p-2 w-full rounded"
        required
      />
      <textarea
        placeholder="Notes"
        value={notes}
        onChange={e => setNotes(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={e => setTags(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded w-full">Add Home</button>
    </form>
  )
}
