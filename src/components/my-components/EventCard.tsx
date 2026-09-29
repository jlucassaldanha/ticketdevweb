import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TicketEvent } from '@/types/event';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { CalendarIcon, MapPinIcon } from 'lucide-react';

export default function EventCard({ event }: { event: TicketEvent }) {
  return (
    <Link href={`/events/${event.id}`} >
      <Card key={event.id} className='h-full flex flex-col justify-between'>
        <Image
          width={400}
          height={200}
          src={event.imageUrl || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba'}
          alt={event.title}
          className="relative z-20 w-full object-cover"
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
          <div className='flex items-center gap-2'>
            <CalendarIcon className="h-4 w-4" />
            <span>{new Date(event.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
          </div>

          <div className='flex items-center gap-2'>
            <MapPinIcon className="h-4 w-4" />
            <span>{event.location}</span>
          </div> 
        </CardContent>

        <CardContent className='flex items-center justify-center'>
          <span className='font-bold text-lg'>R$ {event.price.toFixed(2).replace('.', ',')}</span>
        </CardContent>
      </Card>
    </Link>
    
  );
}