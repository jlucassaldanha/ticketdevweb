import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TicketEvent } from '@/types/event';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { CalendarIcon, MapPinIcon } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import EventDate from './EventDate';
import EventLocation from './EventLocation';

export function EventCard({ event, gateBanner }: { event: TicketEvent, gateBanner?: boolean }) {
  return (
    <Link href={gateBanner ? `/gate/events/${event.id}` : `/events/${event.id}`} >
      <Card key={event.id} className='h-full flex flex-col justify-between'>
        <div className="absolute" />
        <Image
          width={400}
          height={200}
          src={event.imageUrl || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba'}
          alt={event.title}
          className="relative z-20 w-full object-cover aspect-square"
        />
        <CardHeader>
          <CardAction>
            <Badge variant="secondary">{event.category}</Badge>
          </CardAction>
          
          <CardTitle>{event.title}</CardTitle>
        </CardHeader>

        <CardContent>
          <CardDescription>
            {event.description.length > 100 ? event.description.substring(0, 100) + '...' : event.description}
          </CardDescription>
        </CardContent>

        <CardContent className='flex flex-col gap-1'>
          <EventDate 
            date={new Date(event.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })} 
          />

          <EventLocation location={event.location} />
        </CardContent>

        {!gateBanner && (
          <CardContent className='flex items-center justify-center'>
            <span className='font-bold text-lg'>R$ {event.price.toFixed(2).replace('.', ',')}</span>
          </CardContent>
        )}
      </Card>
    </Link>
    
  );
}

export function EventCardSkeleton() {
  return (
    <Card className='h-full flex flex-col justify-between'>
      <Skeleton className="relative z-20 w-full object-cover rounded-none aspect-square" />
      
      <CardHeader>
        <CardTitle><Skeleton className="h-5 w-full" /></CardTitle>
      </CardHeader>

      <CardContent>
        <CardDescription className='flex flex-col gap-1'>
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-2/3" />
        </CardDescription>
      </CardContent>

      <CardContent className='flex flex-col gap-1'>
        <div className='flex items-center gap-2'>
          <CalendarIcon className="h-4 w-4" />
          <Skeleton className="h-4 w-1/3" />
        </div>

        <div className='flex items-center gap-2'>
          <MapPinIcon className="h-4 w-4" />
          <Skeleton className="h-4 w-2/3" />
        </div> 
      </CardContent>

      <CardContent className='flex items-center justify-center'>
        <Skeleton className="h-8 w-1/3" />
      </CardContent>
    </Card>
  );
}