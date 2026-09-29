import EventDate from '@/components/my-components/EventDate';
import EventLocation from '@/components/my-components/EventLocation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface OrderCardProps {
  title: string;
  date: string;
  location: string;
  seat: string;
  price: string;
}

export default function OrderCard({ title, date, location, seat, price }: OrderCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className='flex flex-col gap-1'>
        <EventDate date={date} />
        <EventLocation location={location} />
      </CardContent>

      <CardContent className='flex flex-col gap-1'>
        <div className='flex items-center gap-2 justify-between'>
          <span>Assento Selecionado:</span>
          <span>{seat ? seat : 'Nenhum'}</span>
        </div>
      </CardContent>

      <CardContent className='flex items-center justify-between'>
        <span>Valor:</span>
        <span className='font-bold text-lg'>R$ {price}</span>
      </CardContent>

      <CardFooter>
        <Button>Confirmar e Ir para o Pagamento</Button>
      </CardFooter>
    </Card>
  )
}