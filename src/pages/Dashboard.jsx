import { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { supabase } from '../lib/supabaseClient'
import AddHomeForm from '../components/AddHomeForm'
import HomeCard from '../components/HomeCard'

export default function Dashboard() {
  const [homes, setHomes] = useState([])

  async function loadHomes() {
    const { data, error } = await supabase
      .from('user_homes')
      .select('*')
      .order('rank', { ascending: true })
    if (!error) setHomes(data)
  }

  useEffect(() => { loadHomes() }, [])

  async function handleOnDragEnd(result) {
    if (!result.destination) return
    const reordered = Array.from(homes)
    const [moved] = reordered.splice(result.source.index, 1)
    reordered.splice(result.destination.index, 0, moved)
    setHomes(reordered)

    // Update ranks
    for (let i = 0; i < reordered.length; i++) {
      await supabase.from('user_homes').update({ rank: i }).eq('id', reordered[i].id)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">MustWants — Rank Your Favorite Homes</h1>
      <AddHomeForm onAdd={newHome => setHomes([...homes, newHome])} />

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="homes">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
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
    </div>
  )
}
