import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import type { Home } from "../types"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Fallback mock client for local testing
let supabase: SupabaseClient

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey)
} else {
  console.warn("⚠️ Supabase credentials not found — using local mock mode")
  supabase = {
    from: () => ({
      select: async () => ({ data: [], error: null }),
      insert: async () => ({ data: [], error: null }),
      update: async () => ({ data: [], error: null }),
      upsert: async () => ({ data: [], error: null }),
      delete: async () => ({ data: [], error: null }),
    }),
  } as unknown as SupabaseClient
}

export { supabase }

/** Fetch all homes (mock-safe) */
export async function getHomes(): Promise<Home[]> {
  try {
    const { data } = await supabase.from("homes").select("*").order("rank", { ascending: true })
    return (data as Home[]) ?? []
  } catch {
    return []
  }
}

/** Add a home (mock-safe) */
export async function addHome(home: { url: string; notes?: string; tags?: string[] }) {
  if (!supabaseUrl || !supabaseKey) {
    return {
      success: true,
      data: {
        id: `${Date.now()}`,
        rank: 1,
        ...home,
      } satisfies Home,
    }
  }
  const { data, error } = await supabase.from("homes").insert([home]).select().single()
  return { success: !error, data: data as Home }
}

/** Update ranks (mock-safe) */
export async function updateRanks(homes: Home[]): Promise<Home[]> {
  const ranked = homes.map((home, index) => ({ ...home, rank: index + 1 }))
  if (!supabaseUrl || !supabaseKey) return ranked
  const updates = ranked.map((home) => ({ id: home.id, rank: home.rank }))
  await supabase.from("homes").upsert(updates)
  return ranked
}
