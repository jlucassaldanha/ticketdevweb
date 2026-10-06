"use client"
import { AlertCard } from '@/components/my-components/AlertCard'
import { TicketCard, TicketCardSkeleton } from '@/components/my-components/TicketCard'
import useShareTicket from '@/hooks/useShareTicket'
import { AlertCircleIcon } from 'lucide-react'

export default function ShareTicketPage() {
  const { ticket, isPending, error } = useShareTicket()

  return (
    <div className='flex flex-col gap-5 justify-center items-center p-10'>
      <div className='text-3xl font-bold'>
        Ingresso compartilhado
      </div>

      <div className='w-full'>
        {isPending && (
          <TicketCardSkeleton />
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

      <div className='w-full'>
        {ticket && (
          <TicketCard
            title={ticket.event.title || "Titulo"}
            date={new Date(ticket.event.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
            location={ticket.event.location || "Localização"}
            seat={ticket.seatNumber || "Lugar"}
            status={ticket.status === "ACTIVE" ? "Ativo" : ticket.status === "USED" ? "Utilizado" : "Cancelado"}
            qrUrl={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=000000&bgcolor=ffffff&data=${ticket.secureHash}`}
            isShared
          />
        )}    
      </div>
    </div>
  )
}