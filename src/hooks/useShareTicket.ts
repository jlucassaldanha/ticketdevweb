import { shareTicketAction } from '@/actions/tickets';
import { SharedTicket } from '@/types/ticket';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function useShareTicket() {
  const { hash } = useParams() as { hash: string }

  const { data: ticket, isPending, error } = useQuery<SharedTicket>({
    queryKey: ['sharedTicket'],
    queryFn: async () => await shareTicketAction(hash),
  })

  return {
    ticket,
    isPending,
    error
  }
}