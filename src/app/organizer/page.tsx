"use client"

import { useAuth } from "@/contexts/authContext"
import useListMyEvents from '@/hooks/useListMyEvents'
import { redirect } from "next/navigation"

export default function OrganizerPage() {
  const auth = useAuth()
    
  if (!auth.token) {
    redirect('/login')
  }

  if (auth.user?.role !== 'ORGANIZER') {
    redirect('/')
  }

  const {
    isPending,
    isError,
    filteredEvents,
    categories,
    categoryOptions,
    control,
    handleSubmit,
  } = useListMyEvents()

  return (
    <div className='flex flex-col gap-5 justify-center items-center p-10'>
      <div className='text-3xl font-bold w-full'>
        Dashboard do Organizador
      </div>

      <div className='w-full'>
        Crie e organize seus eventos por aqui
      </div>

      <div>
        {filteredEvents.map((event) => (
          <div key={event.id}>
            {event.title}
          </div>
        ))}
      </div>
    </div>
  )
}