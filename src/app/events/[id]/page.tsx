"use client";

import { AlertCard } from "@/components/my-components/AlertCard";
import {
  OrderCard,
  OrderCardSkeleton,
} from "@/components/my-components/OrderCard";
import { SeatSelectionCard, SeatSelectionCardSkeleton } from "@/components/my-components/SeatSelectionCard";
import { Button } from "@/components/ui/button";
import useEventDetails from "@/hooks/useEventDetails";
import useSeatSelection from "@/hooks/useSeatSelection";
import { AlertCircleIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function EventPage() {
  const { id } = useParams() as { id: string };

  const { event, isLoading, error } = useEventDetails(id);

  const {
    rows,
    seatsPerRow,
    occupiedSeats,
    selectedSeat,
    handleSeatClick,
    handleProceedToCheckout,
  } = useSeatSelection(event);

  console.log(event?.imageUrl)

  return (
    <div className="flex flex-col gap-6 md:gap-10 justify-center items-center p-4 md:p-10">
      <div className="w-full">
        <Link href="/" className="flex gap-2">
          <ArrowLeft />
          Voltar para os eventos
        </Link>
      </div>

      <div className="text-3xl font-bold w-full">
        Escolha seu Lugar
      </div>

      <div className="flex flex-col md:flex-row gap-5 w-full">
        {!event || isLoading ? (
          <SeatSelectionCardSkeleton />
        ) : (
          <div className="flex flex-col gap-5 w-full md:w-2/3">
            <SeatSelectionCard
              rows={rows}
              seatsPerRow={seatsPerRow}
              occupiedSeats={occupiedSeats}
              selectedSeat={selectedSeat}
              handleSeatClick={handleSeatClick}
            />
          </div>
        )}
        

        <div className="flex flex-col gap-5 w-full md:w-1/3 items-center justify-center">
          {error && (
            <div>
              <AlertCard
                color="red"
                title="Erro"
                description={error.message || ""}
                icon={<AlertCircleIcon />}
              />
            </div>
          )}
          
          {!event || isLoading ? (
            <OrderCardSkeleton />
          ) : (
            <OrderCard
              title={event.title || "Event Title"}
              date={new Date(event.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              location={event.location || "Location"}
              seat={selectedSeat || "Nenhum"}
              price={
                event.price.toFixed(2).toString().replace(".", ",") || "0,00"
              }
            />
          )}
          <Button
            className="w-full"
            onClick={handleProceedToCheckout}
            disabled={!selectedSeat}
          >
            Confirmar e Ir para o Pagamento
          </Button>
        </div>
      </div>
    </div>
  );
}
