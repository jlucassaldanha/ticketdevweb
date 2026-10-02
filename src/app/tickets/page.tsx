"use client"

import { AlertCard } from '@/components/my-components/AlertCard';
import { TicketCard, TicketCardSkeleton } from '@/components/my-components/TicketCard';
import { useAuth } from '@/contexts/authContext';
import useTickets from '@/hooks/useTickets';
import { AlertCircleIcon } from 'lucide-react';
import { redirect } from 'next/navigation';

export default function TicketsPage() {
  const auth = useAuth();

  if (!auth.token) {
    redirect('/login')
  }

  if (auth.user?.role !== 'CONSUMER') {
    redirect('/')
  }

  const { 
    tickets,
    isPending,
    error,
    isLoadingCancel,
    errorCancel,
    cancelTicket,
    handleShareTicket
   } = useTickets()

  return (
    <div className='flex flex-col gap-5 justify-center items-center p-10'>
      <div className='text-3xl font-bold w-full'>
        Meus ingressos
      </div>

      <div className='w-full'>
        {isPending && (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            <TicketCardSkeleton />
            <TicketCardSkeleton />
            <TicketCardSkeleton />
            <TicketCardSkeleton />
          </div>
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

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full'>
        {tickets.map((ticket) => (
          <div key={ticket.id} className='flex flex-col gap-5'>
            <TicketCard
              title={ticket.event.title}
              date={new Date(ticket.event.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
              location={ticket.event.location}
              seat={ticket.seatNumber || "Pista"}
              status={ticket.status === "ACTIVE" ? "Ativo" : ticket.status === "USED" ? "Utilizado" : "Cancelado"}
              qrUrl={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=000000&bgcolor=ffffff&data=${ticket.secureHash}`}
              onShare={() => handleShareTicket(ticket.secureHash)}
              onCancel={() => cancelTicket(ticket.id)}
              isLoadingCancel={isLoadingCancel}
            />
            
            {errorCancel && (
              <div>
                <AlertCard 
                  color='red'
                  title='Erro'
                  description={errorCancel.message}
                  icon={<AlertCircleIcon />}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}