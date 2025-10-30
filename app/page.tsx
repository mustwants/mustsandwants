'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd'
import AddHomeForm from './components/AddHomeForm'
import HomeCard from './components/HomeCard'
import Badges from './components/Badges'
import InvitePartnerModal from './components/InvitePartnerModal'
import { getHomes, addHome, updateRanks } from './lib/supabaseClient'
import type { Home, HomePreview } from './types'

const previewCache = new Map<string, HomePreview | undefined>()

async function requestPreview(url: string): Promise<HomePreview | undefined> {
  const trimmed = url.trim()
  if (!trimmed) return undefined
  if (previewCache.has(trimmed)) {
    return previewCache.get(trimmed)
  }

  try {
    const response = await fetch(`/api/preview?url=${encodeURIComponent(trimmed)}`)
    if (!response.ok) {
      previewCache.set(trimmed, undefined)
      return undefined
    }
    const payload = (await response.json()) as { metadata?: HomePreview }
    previewCache.set(trimmed, payload.metadata)
    return payload.metadata
  } catch {
    previewCache.set(trimmed, undefined)
    return undefined
  }
}

export default function Page() {
  const [homes, setHomes] = useState<Home[]>([])
  const [loadingHomes, setLoadingHomes] = useState(true)
  const [inviteVisible, setInviteVisible] = useState(false)

  useEffect(() => {
    let active = true

    async function loadHomes() {
      setLoadingHomes(true)
      const fetched = await getHomes()
      const sorted = fetched
        .slice()
        .sort((a, b) => (a.rank ?? Number.MAX_SAFE_INTEGER) - (b.rank ?? Number.MAX_SAFE_INTEGER))
        .map((home, index) => ({ ...home, rank: index + 1 }))

      const enriched = await Promise.all(
        sorted.map(async (home) => ({
          ...home,
          preview: await requestPreview(home.url),
        })),
      )

      if (active) {
        setHomes(enriched)
        setLoadingHomes(false)
      }
    }

    loadHomes()

    return () => {
      active = false
    }
  }, [])

  async function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return
    const reordered = Array.from(homes)
    const [moved] = reordered.splice(result.source.index, 1)
    reordered.splice(result.destination.index, 0, moved)
    const ranked = await updateRanks(reordered)
    setHomes(ranked)
  }

  async function handleAddHome(homeInput: { url: string; notes?: string }) {
    const response = await addHome(homeInput)
    if (!response.success || !response.data) return

    const nextRank = homes.length + 1
    const preview = await requestPreview(response.data.url)
    const newHome: Home = {
      ...response.data,
      rank: nextRank,
      preview,
    }

    const ranked = await updateRanks([...homes, newHome])
    setHomes(ranked)
  }

  const heroStats = useMemo(
    () => [
      { label: 'Shared must-haves', value: 'Align on priorities in minutes' },
      { label: 'Trusted partners', value: 'Connect with MustWants-vetted pros' },
      { label: 'Visual clarity', value: 'See every contender side-by-side' },
    ],
    [],
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7fafc] via-white to-[#f0fff4] text-[#1b1f1e]">
      <section className="relative overflow-hidden border-b border-mwAqua/30 bg-white">
        <div className="absolute -left-12 -top-12 h-64 w-64 rounded-full bg-mwAqua/20 blur-3xl" />
        <div className="absolute -bottom-16 -right-16 h-72 w-72 rounded-full bg-mwLime/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-mwAqua/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-mwBlack">
              Collaborative PCS planning
            </span>
            <h1 className="text-4xl font-heading font-bold tracking-tight text-mwBlack sm:text-5xl">
              Plan your next move together with clarity, confidence, and calm.
            </h1>
            <p className="text-lg text-gray-600">
              Curate every listing, drag to prioritise, and invite the people who matter. MustWants keeps your search organised so you can focus on what feels like home.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setInviteVisible(true)}
                className="rounded-full bg-mwBlack px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-lg shadow-mwBlack/20 transition hover:bg-mwPink"
              >
                Invite your partner
              </button>
              <a
                href="https://www.mustwants.com/find-a-home/home-search"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-mwBlack px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-mwBlack transition hover:border-mwPink hover:text-mwPink"
              >
                Explore listings
              </a>
            </div>
            <dl className="grid gap-6 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-gray-200 bg-white/70 p-4 shadow-sm backdrop-blur">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-500">{stat.label}</dt>
                  <dd className="mt-2 text-sm font-medium text-mwBlack">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative flex flex-col items-center gap-6 rounded-3xl border border-gray-200 bg-white/70 p-8 shadow-xl shadow-mwAqua/20 backdrop-blur">
            <Image
              src="/mwlogomustwants.png"
              alt="MustWants icon"
              width={80}
              height={80}
              className="drop-shadow"
            />
            <p className="text-center text-sm text-gray-600">
              Add every contender, share notes, and stay in sync while you compare homes side-by-side.
            </p>
            <Badges />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-6 rounded-3xl border border-gray-200 bg-white/90 p-8 shadow-xl shadow-mwAqua/10">
          <div className="flex flex-col gap-3 text-center">
            <h2 className="text-3xl font-heading font-semibold text-mwBlack">Add homes to your shared list</h2>
            <p className="text-base text-gray-600">
              Drop in links from anywhere on the web. We’ll pull the photo and description for quick recognition.
            </p>
          </div>

          <AddHomeForm onAdd={handleAddHome} />
        </div>

        <div className="mt-10 space-y-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-2xl font-heading font-semibold text-mwBlack">Your ranked homes</h3>
            {homes.length > 0 && (
              <p className="text-sm text-gray-500">Drag and drop to reorder—your list updates instantly.</p>
            )}
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white/90 p-4 shadow-lg shadow-mwAqua/10">
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="homes">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-4">
                    {loadingHomes && (
                      <p className="py-12 text-center text-sm text-gray-400">Loading your homes…</p>
                    )}

                    {!loadingHomes && homes.length === 0 && (
                      <p className="py-12 text-center text-sm text-gray-400">
                        No homes yet. Paste your first link above to get started.
                      </p>
                    )}

                    {homes.map((home, index) => (
                      <Draggable key={home.id} draggableId={String(home.id)} index={index}>
                        {(dragProvided) => (
                          <div
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            {...dragProvided.dragHandleProps}
                          >
                            <HomeCard home={home} position={index + 1} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </section>

      <InvitePartnerModal
        visible={inviteVisible}
        onClose={() => setInviteVisible(false)}
        onInvite={(email) => {
          alert(`Invite sent to ${email}`)
          setInviteVisible(false)
        }}
      />
    </div>
  )
}