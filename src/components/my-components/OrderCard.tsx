import EventDate from '@/components/my-components/EventDate';
import EventLocation from '@/components/my-components/EventLocation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '../ui/skeleton';

interface OrderCardProps {
  title: string;
  date: string;
  location: string;
  seat: string;
  price: string;
}

export function OrderCard({ title, date, location, seat, price }: OrderCardProps) {
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className='flex flex-col gap-2'>
        <EventDate date={date} />
        <EventLocation location={location} />
      </CardContent>

      <CardContent className='flex flex-col gap-1'>
        <div className='flex items-center gap-2 justify-between'>
          <span>Lugar Selecionado:</span>
          <span>{seat ? seat : 'Nenhum'}</span>
        </div>
      </CardContent>

      <CardContent className='flex items-center justify-between'>
        <span>Valor:</span>
        <span className='font-bold text-lg'>R$ {price}</span>
      </CardContent>
    </Card>
  )
}

export function OrderCardSkeleton() {
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

      <CardContent className='flex items-center justify-between'>
        <Skeleton className="h-4 w-full" />
      </CardContent>
    </Card>
  )
}