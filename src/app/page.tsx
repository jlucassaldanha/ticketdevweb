'use client'

import useListEvents from '@/hooks/useListEvents';
import SearchCard from '@/components/my-components/SearchCard';
import { EventCard, EventCardSkeleton } from '@/components/my-components/EventCard';
import { LogoTicketDev } from '@/components/my-components/LogoTicketDev';

export default function Home() {
  const { isPending, filteredEvents, categoryOptions, control} = useListEvents()

  return (
    <div className='p-10'>

      <div className='text-6xl md:text-7xl flex justify-center items-center'>
        <LogoTicketDev />
      </div>

      <div className='flex flex-col justify-center items-center gap-5 text-center py-20'>
        <h1 className='text-5xl font-bold'>
          Garanta seus ingressos <br />
          <span className='text-cyan'>
            com segurança.
          </span>
        </h1>
      </div>

      <div className='flex flex-col gap-6'>
        <SearchCard 
          control={control} 
          categoryOptions={categoryOptions} 
        />

        <div className='flex flex-col gap-5'>
          <span className='font-bold text-lg'>Eventos</span>

          {isPending && (
            <span className='text-gray-500'>Acordando o servidor, devido ao plano gratuito isso pode levar até um minuto...</span>
          )}

          {isPending && (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
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
          
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
