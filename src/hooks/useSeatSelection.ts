import { TicketEvent } from '@/types/event';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const getDynamicGrid = (capacity: number) => {
  let cols = 8;
  if (capacity > 100) cols = 12;
  else if (capacity > 40) cols = 10;

  const totalRows = Math.ceil(capacity / cols);
  const rowLetters: string[] = [];

  for (let i = 0; i < totalRows; i++) {
    const letter = String.fromCharCode(65 + i);
    rowLetters.push(letter);
  }

  return { rows: rowLetters, seatsPerRow: cols };
};

export default function useSeatSelection(event: TicketEvent | undefined) {
  const router = useRouter();

  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  const occupiedSeats = event?.tickets?.filter((ticket) => ticket.status !== 'CANCELED' && ticket.seatNumber).map((ticket) => ticket.seatNumber as string) || []

  const { rows, seatsPerRow } = event 
    ? getDynamicGrid(event.capacity) 
    : { rows: ['A', 'B', 'C', 'D', 'E'], seatsPerRow: 8 }

  const handleSeatClick = (seatCode: string) => {
    if (occupiedSeats.includes(seatCode)) return; 
    setSelectedSeat(selectedSeat === seatCode ? null : seatCode);
  };

  const handleProceedToCheckout = () => {
    if (!selectedSeat) return;
    router.push(`/checkout?eventId=${event?.id}&seat=${selectedSeat}`);
  };

  return { 
    rows, 
    seatsPerRow, 
    occupiedSeats, 
    selectedSeat, 
    handleSeatClick, 
    handleProceedToCheckout 
  }
}