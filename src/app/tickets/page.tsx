"use client"

import { TicketCard, TicketCardSkeleton } from '@/components/my-components/TicketCard';
import { useAuth } from '@/contexts/authContext';
import useListTickets from '@/hooks/useListTickets';
import { redirect } from 'next/navigation';

export default function TicketsPage() {
  const auth = useAuth();

  if (!auth.token) {
    redirect('/login')
  }

  if (auth.user?.role !== 'CONSUMER') {
    redirect('/')
  }

  const { tickets, isPending, isError } = useListTickets()

  return (
    <div className='flex flex-col gap-5 justify-center items-center p-10'>
      <div className='text-2xl font-bold w-full'>
        Meus ingressos
      </div>

      <div className='w-ful'>
        {isPending && (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            <TicketCardSkeleton />
            <TicketCardSkeleton />
            <TicketCardSkeleton />
          </div>
        )}
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            title={ticket.event.title}
            date={new Date(ticket.event.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
            location={ticket.event.location}
            seat={ticket.seatNumber || "Pista"}
            status={ticket.status === "ACTIVE" ? "Ativo" : "Inativo"}
            qrUrl={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=000000&bgcolor=ffffff&data=${ticket.secureHash}`}
          />
        ))}
      </div>
    </div>
  )
}