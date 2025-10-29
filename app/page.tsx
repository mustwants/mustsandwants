'use client'
import { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import AddHomeForm from './components/AddHomeForm'
import HomeCard from './components/HomeCard'
import { supabase } from './lib/supabaseClient'

export default function Page() {
  const [homes, setHomes] = useState<any[]>([])

  async function loadHomes() {
    const { data } = await supabase.from('user_homes').select('*').order('rank')
    if (data) setHomes(data)
  }

  useEffect(() => { loadHomes() }, [])

  async function handleOnDragEnd(result: any) {
    if (!result.destination) return
    const items = Array.from(homes)
    const [moved] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, moved)
    setHomes(items)
    for (let i = 0; i < items.length; i++) {
      await supabase.from('user_homes').update({ rank: i }).eq('id', items[i].id)
    }
  }

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Branded Header */}
      <div className="text-center">
        <h1 className="text-4xl font-heading font-bold bg-gradient-to-r from-mwAqua to-mwLime bg-clip-text text-transparent">
          Must<span className="text-mwLime">Wants</span>
        </h1>
        <p className="text-mwBlack/70 font-subheading mt-2">
          The dating app for real estate — rank your favorite homes
        </p>
      </div>

      <AddHomeForm onAdd={h => setHomes([...homes, h])} />

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="homes">
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-4"
            >
              {homes.map((home, index) => (
                <Draggable key={home.id} draggableId={home.id} index={index}>
                  {provided => (
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

      {/* Footer */}
      <footer className="text-center text-sm text-mwBlack/60 mt-8 border-t border-gray-200 pt-4">
        © {new Date().getFullYear()} MustWants — helping you find your next home together
      </footer>
    </main>
  )
}
