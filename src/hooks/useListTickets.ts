import { listTicketsAction } from '@/actions/tickets';
import { Ticket } from '@/types/ticket';
import { useQuery } from '@tanstack/react-query';

export default function useListTickets () {
  const { data: tickets = [], isPending, error } = useQuery<Ticket[]>({
    queryKey: ['tickets'],
    queryFn: async () => await listTicketsAction(),
  })
  
  const handleShareTicket = (hash: string) => {
    const url = `${window.location.origin}/tickets/share/${hash}`

    navigator.clipboard.writeText(url)
      .then(() => alert('Link de compartilhamento copiado para a área de transferência!'))
      .catch(() => alert(`Copie este link para compartilhar: ${url}`))
  }

  return {
    tickets,
    isPending,
    error,
    handleShareTicket
  }
}