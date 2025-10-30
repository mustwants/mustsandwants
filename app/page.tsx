'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import AddHomeForm from './components/AddHomeForm'
import HomeCard from './components/HomeCard'
import Badges from './components/Badges'
import InvitePartnerModal from './components/InvitePartnerModal'
import { getHomes, addHome, updateRanks } from './lib/supabaseClient'
import type { Home } from './types'

export default function Page() {
  const [homes, setHomes] = useState<Home[]>([])
  const [inviteVisible, setInviteVisible] = useState(false)

  useEffect(() => {
    getHomes().then(setHomes)
  }, [])

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
    <main className="min-h-screen bg-gradient-to-b from-[#f9fafb] via-white to-[#f0fdf4] text-[#1b1f1e] font-body">
      {/* Top Nav */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-gray-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <Image
              src="/mwlogohorizontal.png"
              alt="MustWants Logo"
              width={160}
              height={48}
              priority
              className="drop-shadow-sm"
            />
          </div>
          <button
            onClick={() => setInviteVisible(true)}
            className="hidden sm:block bg-mwAqua hover:bg-mwLime text-black font-semibold px-4 py-2 rounded-lg transition-all"
          >
            Invite Partner
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-16 px-6 bg-gradient-to-r from-mwAqua to-mwLime text-black">
        <h1 className="text-5xl font-heading font-bold tracking-tight">
          Find Your <span className="text-white drop-shadow">Next Home</span> Together
        </h1>
        <p className="mt-3 text-lg text-black/80 font-subheading">
          Add homes, rank them with your partner, and decide what really matters.
        </p>
        <div className="flex justify-center mt-8">
          <Badges />
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Add and Rank Your Favorite Homes
          </h2>
          <AddHomeForm onAdd={handleAddHome} />
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Ranked List</h2>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="homes">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-4"
                >
                  {homes.length === 0 && (
                    <p className="text-center text-gray-400 italic">
                      No homes yet. Add a link above to get started.
                    </p>
                  )}
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
        </div>
      </section>

      {/* Partner Invite Modal */}
      <InvitePartnerModal
        visible={inviteVisible}
        onClose={() => setInviteVisible(false)}
        onInvite={(email) => {
          alert(`Invite sent to ${email}`)
          setInviteVisible(false)
        }}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-6 text-center text-sm text-gray-600">
        <div className="flex flex-col items-center gap-3">
          <Image
            src="/mwlogomustwants.png"
            alt="MustWants Icon"
            width={48}
            height={48}
            className="opacity-80"
          />
          <p>© {new Date().getFullYear()} MustWants — helping you find your next home together</p>
        </div>
      </footer>
    </main>
  )
}
