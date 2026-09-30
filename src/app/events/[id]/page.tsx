import OrderCard from '@/components/my-components/OrderCard';
import { Card, CardContent } from '@/components/ui/card';

export default function EventPage() {
  return (
    <div className='flex flex-col md:flex-row gap-5 justify-center items-center h-screen'>
      <Card>
        <CardContent>Teste</CardContent>
      </Card>
    
      <OrderCard 
        title="Evento de Teste"
        date="01/01/2023"
        location="São Paulo, SP"
        seat="A1"
        price="50,00"
      />
    </div>
  )
}