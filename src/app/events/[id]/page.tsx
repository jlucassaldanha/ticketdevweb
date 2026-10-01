"use client"

import { OrderCard, OrderCardSkeleton } from '@/components/my-components/OrderCard';
import { SeatSelectionCard } from '@/components/my-components/SeatSelectionCard';
import { Button } from '@/components/ui/button';
import useEventDetails from '@/hooks/useEventDetails';
import useSeatSelection from '@/hooks/useSeatSelection';
import { useParams } from 'next/navigation';

export default function EventPage() {
  const { id } = useParams() as { id: string };
  const { event, isLoading, error } = useEventDetails(id);
  const { 
    rows, 
    seatsPerRow, 
    occupiedSeats, 
    selectedSeat, 
    handleSeatClick, 
    handleProceedToCheckout 
  } = useSeatSelection(event)

  return (
    <div className='flex flex-col md:flex-row gap-5 justify-center items-center p-10'>
      <div className='flex flex-col gap-5 w-full md:w-2/3'>
        <SeatSelectionCard
          rows={rows}
          seatsPerRow={seatsPerRow}
          occupiedSeats={occupiedSeats}
          selectedSeat={selectedSeat}
          handleSeatClick={handleSeatClick}
        />
      </div>

      <div>
        <span>{error?.message}</span>
      </div>
      
      <div className='flex flex-col gap-5 w-full md:w-1/3 items-center justify-center'>
        {!event || isLoading ? (
          <OrderCardSkeleton />
        ) : (
          <OrderCard 
            title={event.title || 'Event Title'}
            date={new Date(event.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
            location={event.location || "Location"}
            seat={selectedSeat || "Nenhum"}
            price={event.price.toFixed(2).toString().replace('.', ',') || "0,00"}
          />
        )}
        <Button className="w-full" onClick={handleProceedToCheckout} disabled={selectedSeat === "Nenhum"}>
          Confirmar e Ir para o Pagamento
        </Button>
      </div>
    </div>  
  )
}