'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import AddHomeForm from './components/AddHomeForm'
import HomeCard from './components/HomeCard'
import Badges from './components/Badges'
import { getHomes, addHome, updateRanks } from './lib/supabaseClient'
import InvitePartnerModal from './components/InvitePartnerModal'
import type { Home } from './types'

export default function Page() {
  const [homes, setHomes] = useState<Home[]>([])
  const [inviteVisible, setInviteVisible] = useState(false)

  async function loadHomes() {
    const data = await getHomes()
    setHomes(data)
  }

  useEffect(() => { loadHomes() }, [])

  async function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return
    const reordered = Array.from(homes)
    const [moved] = reordered.splice(result.source.index, 1)
    reordered.splice(result.destination.index, 0, moved)
    const updated = await updateRanks(reordered)
    setHomes([...updated])
  }

  async function handleAddHome(h: { url: string; notes?: string; tags?: string[] }) {
    const res = await addHome(h)
    if (res.success && res.data) setHomes([...homes, res.data])
  }

  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-b from-white via-[#f9fafb] to-[#ecfdf5] text-[#1b1f1e]">
      {/* Header */}
      <header className="w-full py-6 px-4 bg-gradient-to-r from-mwAqua to-mwLime shadow-md">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
          <Image
            src="/mwlogohorizontal.png"
            alt="MustWants Logo"
            width={400}
            height={100}
            className="h-14 sm:h-16"
            priority
          />
          <p className="text-white text-center sm:text-left text-lg font-medium">
            True Visual Collaborative Decision Making © — add, rank, and share homes
          </p>
        </div>
      </header>

      {/* Main Content */}
      <section className="w-full max-w-3xl px-6 sm:px-8 py-8 flex-1">
        <AddHomeForm onAdd={handleAddHome} />
        <Badges />

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="homes">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="mt-8 space-y-4">
                {homes.map((home, index) => (
                  <Draggable key={home.id} draggableId={home.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <HomeCard home={home} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {/* Partner Invite Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setInviteVisible(true)}
            className="px-6 py-2 bg-mwAqua text-white font-medium rounded-lg shadow hover:opacity-90 transition"
          >
            Invite a Partner
          </button>
        </div>

        {/* Invite Modal */}
        <InvitePartnerModal
          visible={inviteVisible}
          onClose={() => setInviteVisible(false)}
          onInvite={(email) => {
            alert(`Invite sent to ${email}`)
            setInviteVisible(false)
          }}
        />
      </section>

      {/* Footer */}
      <footer className="w-full text-center py-6 text-sm text-gray-600 border-t border-gray-200 bg-white/60 backdrop-blur">
        <div className="flex flex-col items-center gap-2">
          <Image
            src="/mwlogomustwants.png"
            alt="MustWants Icon"
            width={40}
            height={40}
            className="w-10 h-10 opacity-80"
          />
          <p>© {new Date().getFullYear()} MustWants — helping you find your next home together</p>
        </div>
      </footer>
    </main>
  )
}
