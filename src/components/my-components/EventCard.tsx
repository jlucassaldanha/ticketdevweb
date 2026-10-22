"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { TicketEvent } from '@/types/event';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { CalendarIcon, EditIcon, Loader2Icon, MapPinIcon, TrashIcon } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import EventDate from './EventDate';
import EventLocation from './EventLocation';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { redirect } from 'next/navigation';

interface EventCardProps { 
  event: TicketEvent, 
  gateBanner?: boolean, 
  isOrganizerBanner?: boolean
  onDelete?: () => void
  isDeleting?: boolean 
}

export function EventCard({ event, gateBanner, isOrganizerBanner, onDelete, isDeleting }: EventCardProps) {
  const href = gateBanner 
    ? `/gate/events/${event.id}` 
    : `/events/${event.id}`;

  const isDisabled = Boolean(isOrganizerBanner);

  console.log(event)

  return (
    <Link 
      href={href} 
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : undefined}
      onClick={(e) => {
        if (isDisabled) {
          e.preventDefault()
        }
      }}
      className={`block h-full transition-opacity ${isDisabled ? 'cursor-default' : 'hover:opacity-95'}`}
    >
      <Card key={event.id} className='h-full flex flex-col justify-between'>
        <div className="absolute" />
        <Image
          width={400}
          height={200}
          src={event.imageUrl || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba'}
          alt={event.title}
          className="relative z-20 w-full object-cover"
        />

        <CardHeader className='flex flex-col gap-2'>    
          <CardTitle className="text-xl font-bold leading-tight">{event.title}</CardTitle>
          <Badge variant="default" className="shrink-0">{event.category}</Badge>
        </CardHeader>

        <CardContent>
          <CardDescription>
            {event.description.length > 100 ? event.description.substring(0, 100) + '...' : event.description}
          </CardDescription>
        </CardContent>

        <CardContent className='flex flex-col gap-1'>
          <EventDate 
            date={new Date(event.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })} 
          />

          <EventLocation location={event.location} />
        </CardContent>

        {isOrganizerBanner && (
          <CardContent className='flex flex-col justify-center items-center gap-2'>
            <span className='font-bold'>Ingressos Vendidos: {event.ticketsSold} de {event.capacity}</span>
            <Progress value={(event.ticketsSold * 100) / event.capacity} className="w-[60%]"/>
          </CardContent>
        )}
        
        {!gateBanner && (
          <CardContent className='flex items-center justify-center text-primary'>
            <span className='font-bold text-lg'>R$ {Number(event.price).toFixed(2).replace('.', ',')}</span>
          </CardContent>
        )}

        {isOrganizerBanner && (
          <CardFooter className='flex gap-5 w-full justify-center'>
            <Button disabled={event.ticketsSold > 0} onClick={() => redirect(`/organizer/create?id=${event.id}`)}>
              <EditIcon />
            </Button>
            <Button variant="destructive" onClick={onDelete} disabled={isDeleting || event.ticketsSold > 0}>
              {isDeleting ? <Loader2Icon className='animate-spin'/> : <TrashIcon /> }
            </Button>
          </CardFooter>
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
          <Skeleton className="h-4 w-2/3" />
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