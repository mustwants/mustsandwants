import { createClient } from '@supabase/supabase-js'
import type { Home } from '../types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
export const supabase = createClient(supabaseUrl, supabaseKey)

/** Fetch all homes, ordered by rank */
export async function getHomes(): Promise<Home[]> {
  const { data, error } = await supabase
    .from('homes')
    .select('*')
    .order('rank', { ascending: true })

  if (error) {
    console.error('Error fetching homes:', error.message)
    return []
  }
  return data as Home[]
}

/** Add new home entry */
export async function addHome(home: { url: string; notes?: string; tags?: string[] }) {
  const { data, error } = await supabase
    .from('homes')
    .insert([{ ...home, rank: Date.now() }])
    .select()
    .single()

  if (error) {
    console.error('Error adding home:', error.message)
    return { success: false }
  }

  return { success: true, data }
}

/** Update ranking order after drag/drop */
export async function updateRanks(homes: Home[]): Promise<Home[]> {
  const updates = homes.map((home, index) => ({
    id: home.id,
    rank: index + 1,
  }))

  const { error } = await supabase.from('homes').upsert(updates)

  if (error) {
    console.error('Error updating ranks:', error.message)
  }

  return homes
}

