import { listTicketsAction } from '@/actions/tickets';
import { Ticket } from '@/types/ticket';
import { useQuery } from '@tanstack/react-query';

export default function useListTickets () {
  const { data: tickets = [], isPending, isError } = useQuery<Ticket[]>({
    queryKey: ['tickets'],
    queryFn: async () => await listTicketsAction(),
  }) 

  return {
    tickets,
    isPending,
    isError
  }
}