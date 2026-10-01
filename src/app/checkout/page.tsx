"use client"

import { OrderCard } from '@/components/my-components/OrderCard';
import { PaymentMethod } from '@/components/my-components/PaymentMethod';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/authContext';
import { redirect } from 'next/navigation';

export default function CheckoutPage() {
  const auth = useAuth()
  
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
          <PaymentMethod />
        </div>

        <div className='flex flex-col gap-3 w-full items-center justify-center'>
          <Card className='flex flex-col gap-5 w-full'>
            <CardContent>Resumo do pedido:</CardContent>
          </Card>
          <OrderCard 
            date='04/11/2001'
            location='Local do Evento'
            price='100,00'
            seat='A1'
            title='Nome do Evento'
          />
        </div>
      </div>
      
    </div>
  )
}