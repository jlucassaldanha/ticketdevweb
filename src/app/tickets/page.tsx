"use client"

import { AlertCard } from '@/components/my-components/AlertCard';
import { TicketCard, TicketCardSkeleton } from '@/components/my-components/TicketCard';
import { useAuth } from '@/contexts/authContext';
import useTickets from '@/hooks/useTickets';
import { AlertCircleIcon, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
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
    <div className='flex flex-col gap-5 justify-center items-center p-5'>
      <div className="w-full">
        <Link href="/" className="flex gap-2">
          <ArrowLeft />
          Voltar para os eventos
        </Link>
      </div>

      <div className='text-3xl font-bold w-full'>
        Meus ingressos
      </div>

      <div className='w-full'>
        {isPending && (
          <div className='flex flex-col gap-5 items-center justify-center w-full'>
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

      <div className='grid grid-cols-1 gap-5 w-full items-center justify-center'>
        {tickets.map((ticket) => (
          <div key={ticket.id} className='flex flex-col h-full w-full items-center justify-center'>
            <TicketCard
              title={ticket.event.title}
              date={new Date(ticket.event.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              location={ticket.event.location}
              seat={ticket.seatNumber || "N/A"}
              status={ticket.status === "ACTIVE" ? "Ativo" : ticket.status === "USED" ? "Utilizado" : "Cancelado"}
              qrUrl={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=000000&bgcolor=ffffff&data=${ticket.secureHash}`}
              imageUrl={ticket.event.imageUrl}
              onShare={() => handleShareTicket(ticket.secureHash)}
              onCancel={() => cancelTicket(ticket.id)}
              isLoadingCancel={isLoadingCancel}
            />
            
            {errorCancel && (
              <div className='mt-2'>
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