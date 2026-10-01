"use client"

import { OrderCard, OrderCardSkeleton } from '@/components/my-components/OrderCard';
import { PaymentMethodCard } from '@/components/my-components/PaymentMethodCard';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/authContext';
import useCheckout from '@/hooks/useCheckout';
import useEventDetails from '@/hooks/useEventDetails';
import { redirect, useSearchParams } from 'next/navigation';

export default function CheckoutPage() {
  const auth = useAuth()
  const searchParams = useSearchParams()
  
  const eventId = searchParams.get('eventId') || '';
  const seat = searchParams.get('seat') || '';

  const { event, isLoading, error } = useEventDetails(eventId);
  const {
    submitting,
    success,
    error: errorMessage,
    paymentMethod,
    processPayment,
    setPaymentMethod
  } = useCheckout({ eventId, seat });
  
  if (!auth.token) {
    redirect('/login')
  }

  if (auth.user?.role !== 'CONSUMER') {
    redirect('/')
  }

  return (
    <div className='flex flex-col gap-5 justify-center items-center p-10'>
      <div className='flex flex-col gap-5 w-full'>
        <h1>Finalizar Compra</h1>
      </div>

      <div className='flex flex-col md:flex-row gap-10 justify-center items-center w-full'>
        <div className='flex flex-col gap-3 w-full items-center justify-center'>
          <Card className='flex flex-col gap-5 w-full'>
            <CardContent>Método de Pagamento:</CardContent>
          </Card>
          <PaymentMethodCard onChange={setPaymentMethod} value={paymentMethod} />
        </div>

        <div className='flex flex-col gap-3 w-full items-center justify-center'>
          <Card className='flex flex-col gap-5 w-full'>
            <CardContent>Resumo do pedido:</CardContent>
          </Card>
          {!event || isLoading ? (
            <OrderCardSkeleton />
          ) : (
            <OrderCard 
              title={event.title || 'Event Title'}
              date={new Date(event.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
              location={event.location || "Location"}
              seat={seat || "Nenhum"}
              price={event.price.toFixed(2).toString().replace('.', ',') || "0,00"}
            />
          )}
        </div>
      </div>
      
    </div>
  )
}