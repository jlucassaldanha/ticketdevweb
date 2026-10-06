import EventDate from '@/components/my-components/EventDate';
import EventLocation from '@/components/my-components/EventLocation';
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '../ui/skeleton';
import { Badge } from '../ui/badge';
import Image from 'next/image';
import { Button } from '../ui/button';
import { TicketMinus, TicketX } from 'lucide-react';

interface TicketCardProps {
  title: string;
  date: string;
  location: string;
  seat: string;
  status: string;
  qrUrl: string;
  isShared?: boolean
  isLoadingCancel?: boolean
  onShare?: () => void
  onCancel?: () => void
}

export function TicketCard({ 
  title, 
  date, 
  location, 
  seat, 
  status, 
  qrUrl, 
  isShared, 
  isLoadingCancel, 
  onShare, 
  onCancel 
}: TicketCardProps) {
  return (
    <Card className='flex flex-col h-full w-full justify-between'>
      <CardHeader>
        <CardAction>
          <Badge variant={status === 'Ativo' ? 'default' : status === 'Cancelado' ? 'destructive' : 'outline'}>{status}</Badge>
        </CardAction>
        <CardTitle className='font-extrabold text-2xl'>{title}</CardTitle>
      </CardHeader>

      <CardContent className='flex flex-col gap-2'>
        <EventDate date={date} />
        <EventLocation location={location} />
        <div className='flex items-center gap-2'>
          <span>Lugar:</span>
          <span>{seat}</span>
        </div>
      </CardContent>

      <CardContent className='w-full flex items-center justify-center'>
        {status === 'Cancelado' ? (
          <div className='text-red-500 flex flex-col items-center'>
            <TicketX size={150} />
            <span className='font-bold text-2xl'>INGRESSO CANCELADO</span>
          </div>
        ) : status === 'Utilizado' ? (
          <div className='flex flex-col items-center'>
            <TicketMinus size={150} />
            <span className='font-bold text-2xl'>INGRESSO UTILIZADO</span>
          </div>
        ) : (
          <Image
            className='items-center justify-center aspect-square' 
            src={qrUrl}
            alt='QR Code'
            width={150}
            height={150}
          />
        )}
      </CardContent>
      
      {status !== 'Cancelado' && status !== 'Utilizado' && !isShared && (
        <CardFooter className='w-full'>
          <div className='w-full flex justify-center gap-5'>
            <Button onClick={onShare}>Compartilhar</Button>
            <Button variant="destructive" onClick={onCancel} disabled={isLoadingCancel}>{isLoadingCancel ? "Cancelando..." : "Cancelar compra"}</Button>
          </div>
        </CardFooter>
      )}
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

      <CardContent className='flex gap-1 w-full justify-center'>
        <Skeleton className="h-50 w-3/4" />
      </CardContent>

      <CardContent className='flex w-full justify-center'>
        <Skeleton className="h-10 w-4/5" />
      </CardContent>
    </Card>
  )
}