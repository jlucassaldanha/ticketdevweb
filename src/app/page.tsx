'use client'

import Hero from '@/components/my-components/Hero';
import useListEvents from '@/hooks/useListEvents';
import SearchCard from '@/components/my-components/SearchCard';
import EventCard from '@/components/my-components/EventCard';

export default function Home() {
  const { filteredEvents, categoryOptions, control} = useListEvents()

  return (
    <div className='py-6 px-6'>
      <Hero />

      <div className='flex flex-col gap-5'>
        <SearchCard 
          control={control} 
          categoryOptions={categoryOptions} 
        />

        <div className='flex flex-col gap-5'>
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
