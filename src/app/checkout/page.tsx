"use client"

import { AlertCard } from '@/components/my-components/AlertCard';
import { OrderCard, OrderCardSkeleton } from '@/components/my-components/OrderCard';
import { PaymentMethodCard } from '@/components/my-components/PaymentMethodCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/authContext';
import useCheckout from '@/hooks/useCheckout';
import useEventDetails from '@/hooks/useEventDetails';
import { AlertCircleIcon, CheckCircle2Icon } from 'lucide-react';
import { redirect, useSearchParams } from 'next/navigation';

export default function CheckoutPage() {
  const auth = useAuth()

  if (!auth.token) {
    redirect('/login')
  }

  if (auth.user?.role !== 'CONSUMER') {
    redirect('/')
  }
  
  const searchParams = useSearchParams()
  
  const eventId = searchParams.get('eventId') || '';
  const seat = searchParams.get('seat') || '';

  const { event, isLoading, error } = useEventDetails(eventId);
  const {
    isPending,
    isSuccess,
    lastStatus,
    error: errorMessage,
    paymentMethod,
    processPayment,
    setPaymentMethod
  } = useCheckout({ eventId, seat });
  
  

  return (
    <div className='flex flex-col gap-5 justify-center items-center p-10'>
      <div className='flex flex-col gap-5 w-full text-2xl font-bold'>
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
        
        {error && (
          <div>
            <AlertCard 
              color='red'
              title='Erro'
              description={error.message}
              icon={<AlertCircleIcon />}
            />
          </div>
        )}
      </div>

      {isSuccess && lastStatus === 'APPROVED' && (
        <div>
          <AlertCard 
            color='green'
            title='Pagamento Aprovado'
            description='Seu pagamento foi aprovado com sucesso!'
            icon={<CheckCircle2Icon />}
          />
        </div>
      )}

      {isSuccess && lastStatus === 'REFUSED' && (
        <div>
          <AlertCard 
            color='red'
            title='Pagamento Recusado'
            description='Seu pagamento foi recusado.'
            icon={<AlertCircleIcon />}
          />
        </div>
      )}

      {errorMessage && (
        <div >
          <AlertCard 
            color='red'
            title='Pagamento Recusado'
            description={errorMessage}
            icon={<AlertCircleIcon />}
          />
        </div>
      )}
      
      <div>
        <Card>
          <CardContent className='flex gap-5 items-center justify-center'>
            <Button 
              className="bg-green-950 hover:bg-green-900 text-green-600 " 
              onClick={() => processPayment({ simulateStatus: 'APPROVED', paymentMethod })}
              disabled={isPending}
            >
              Simular Aprovação
            </Button>
            <Button 
              variant="destructive"
              onClick={() => processPayment({ simulateStatus: 'REFUSED', paymentMethod })}
              disabled={isPending}
            >
              Simular Recusa
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}