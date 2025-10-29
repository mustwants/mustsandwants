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
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Musts & Wants</h1>
      <AddHomeForm onAdd={h => setHomes([...homes, h])} />

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="homes">
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
              {homes.map((home, index) => (
                <Draggable key={home.id} draggableId={home.id} index={index}>
                  {provided => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
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
    </main>
  )
}
