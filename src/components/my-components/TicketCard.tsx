import EventDate from '@/components/my-components/EventDate';
import EventLocation from '@/components/my-components/EventLocation';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '../ui/skeleton';
import { Badge } from '../ui/badge';
import Image from 'next/image';

interface TicketCardProps {
  title: string;
  date: string;
  location: string;
  seat: string;
  status: string;
  qrUrl: string
}

export function TicketCard({ title, date, location, seat, status, qrUrl }: TicketCardProps) {
  return (
    <Card className='flex'>
      <CardHeader>
        <CardAction>
          <Badge>{status}</Badge>
        </CardAction>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className='flex flex-col gap-2'>
        <EventDate date={date} />
        <EventLocation location={location} />
        <div className='flex items-center gap-2'>
          <span>Assento:</span>
          <span>{seat}</span>
        </div>
      </CardContent>

      <CardContent className='w-full flex items-center justify-center'>
        <Image
          className='rounded-sm items-center justify-center' 
          src={qrUrl}
          alt='QR Code'
          width={150}
          height={150}
        />
      </CardContent>
    </Card>
  )
}

export function TicketCardSkeleton() {
  return (
    <Card className='w-full'>
      <CardHeader>
        <Skeleton className="h-8 w-full" />
      </CardHeader>

      <CardContent className='flex flex-col gap-2'>
        <Skeleton className="h-5 w-1/4" />
        <Skeleton className="h-5 w-3/4" />
      </CardContent>

      <CardContent className='flex flex-col gap-1'>
        <div className='flex items-center gap-2 justify-between'>
          <Skeleton className="h-5 w-2/3" />
        </div>
      </CardContent>

      <CardContent className='flex flex-col gap-1'>
        <Skeleton className="h-50 w-50" />
      </CardContent>
    </Card>
  )
}