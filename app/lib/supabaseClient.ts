// app/lib/supabaseClient.ts
interface Home {
  id: string
  url: string
  notes?: string
  tags?: string[]
  rank: number
}

let homes: Home[] = []

export async function getHomes() {
  return homes.sort((a, b) => a.rank - b.rank)
}

export async function addHome(newHome: { url: string; notes?: string; tags?: string[] }) {
  const entry: Home = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    rank: homes.length + 1,
    ...newHome,
  }
  homes.push(entry)
  return { data: entry, success: true }
}

export async function updateRanks(newOrder: Home[]) {
  homes = newOrder.map((h, i) => ({ ...h, rank: i + 1 }))
  return homes
}
