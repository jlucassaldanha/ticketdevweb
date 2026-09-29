'use client'

import Hero from '@/components/my-components/Hero';
import useListEvents from '@/hooks/useListEvents';
import SearchCard from '@/components/my-components/SearchCard';
import EventCard from '@/components/my-components/EventCard';

export default function Home() {
  const { isPending, filteredEvents, categoryOptions, control} = useListEvents()

  return (
    <div className='py-6 px-6'>
      <div className='flex flex-col justify-center items-center gap-5 text-center py-20'>
        <h1 className='text-5xl font-bold'>
          Garanta seus ingressos <br />
          <span>
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
          {filteredEvents.length === 0 && isPending && (
            <span className='text-gray-500'>Carregando eventos...</span>
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
