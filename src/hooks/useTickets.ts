import { cancelTicketAction, listTicketsAction } from '@/actions/tickets';
import { Ticket } from '@/types/ticket';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function useTickets () {
  const queryClient = useQueryClient();

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

  const { mutate: cancelTicket, isPending: isLoadingCancel, error: errorCancel } = useMutation({
    mutationFn: async (id: string) => await cancelTicketAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    }
  })

  return {
    tickets,
    isPending,
    error,
    isLoadingCancel,
    errorCancel,
    cancelTicket,
    handleShareTicket
  }
}