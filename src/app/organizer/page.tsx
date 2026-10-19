"use client"

import { EventCard, EventCardSkeleton } from '@/components/my-components/EventCard'
import SearchCard from '@/components/my-components/SearchCard'
import { useAuth } from "@/contexts/authContext"
import useListMyEvents from '@/hooks/useListMyEvents'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
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
    filteredEvents,
    categoryOptions,
    control
  } = useListMyEvents()

  return (
    <div className='flex flex-col gap-5 justify-center items-center p-10'>
      <div className='text-3xl font-bold w-full'>
        Dashboard do Organizador
      </div>

      <div className='w-full'>
        Organize seus eventos por aqui
      </div>

      <div className='flex flex-col gap-6 w-full'>
        <div className='w-full flex justify-end'>
          <Link 
            className='flex gap-1 bg-primary py-2 px-3 text-primary-foreground rounded-3xl' 
            href="/organizer/create"
          >
            Criar Evento
            <PlusIcon />
          </Link>
        </div>
        <SearchCard 
          control={control} 
          categoryOptions={categoryOptions} 
        />

        <div className='flex flex-col gap-5'>
          <span className='font-bold text-lg'>Eventos</span>
          {isPending && (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5'>
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </div>
          )}

          {filteredEvents.length === 0 && !isPending && (
            <span className='text-gray-500'>Nenhum evento encontrado.</span>
          )}

          {filteredEvents.length > 0 && (
            <span className='text-gray-500'>{filteredEvents.length} evento(s) encontrado(s).</span>
          )}
          
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5'>
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} isOrganizerBanner />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}