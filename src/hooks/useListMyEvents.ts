import { deleteEventAction, listMyEventsAction } from '@/actions/events'
import { TicketEvent } from '@/types/event'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import z from 'zod'

const formSchema = z.object({
  search: z.string(),
  category: z.string(),
})

type SearchFormData = z.infer<typeof formSchema>

export default function useListMyEvents() {
  const { data: events = [], isPending, isError } = useQuery<TicketEvent[]>({
    queryKey: ['my-events'],
    queryFn: async () => await listMyEventsAction()
  }) 

  const { control, watch, handleSubmit } = useForm<SearchFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: '',
      category: 'TODAS'
    }
  });

  const currentSearch = watch('search');
  const currentCategory = watch('category');

  const categories = [ 'TODAS', ...Array.from(new Set(events.map(event => event.category)))];

  const categoryOptions = [
    ...categories.map(cat => ({ label: cat, value: cat }))
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(currentSearch.toLowerCase()) || event.description.toLowerCase().includes(currentSearch.toLowerCase());

    const matchesCategory = currentCategory === 'TODAS' || event.category === currentCategory;

    return matchesSearch && matchesCategory;
  });

  const queryClient = useQueryClient()

  const { mutateAsync: deleteEvent, isPending: isDeleting } = useMutation({
    mutationFn: async (eventId: string) => {
      return await deleteEventAction(eventId) 
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-events'] })
    }
  })

  return {
    isPending,
    isError,
    filteredEvents,
    categories,
    categoryOptions,
    control,
    handleSubmit,
    deleteEvent,
    isDeleting
  }
}