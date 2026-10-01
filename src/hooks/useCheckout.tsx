import { reserveTicketAction } from '@/actions/tickets';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export default function useCheckout({ eventId, seat }: { eventId: string | null, seat: string | null }) {
  const router = useRouter()

  const [paymentMethod, setPaymentMethod] = useState('PIX');

  const { mutate: processPayment, isPending, isSuccess, error } = useMutation({
    mutationFn: async ({ simulateStatus, paymentMethod }: { simulateStatus: 'APPROVED' | 'REFUSED', paymentMethod: string }) => {
      if (!eventId || !seat) {
        throw new Error('Event ID or seat is missing');
      }

      return await reserveTicketAction({
        eventId,
        seatNumber: seat,
        paymentMethod,
        paymentSimulatedStatus: simulateStatus,
      });
    },
    onSuccess: (_, variables) => {
      if (variables.simulateStatus === 'APPROVED') {
        setTimeout(() => {
          router.push('/tickets');
        }, 2500);
      }
    }
  })

  const errorMessage = error instanceof Error ? error.message : '';

  return {
    isPending,
    isSuccess,
    error: errorMessage,
    paymentMethod,
    processPayment,
    setPaymentMethod
  }
}