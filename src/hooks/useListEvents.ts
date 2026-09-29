import { listEventsAction } from '@/actions/events'
import { TicketEvent } from '@/types/event'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import z from 'zod'

const formSchema = z.object({
  search: z.string(),
  category: z.string(),
})

type SearchFormData = z.infer<typeof formSchema>

export default function useListEvents() {
  const { data: events = [], isPending, isError } = useQuery<TicketEvent[]>({
    queryKey: ['events'],
    queryFn: async () => await listEventsAction()
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

  function onSubmit(data: SearchFormData) {
    
  }

  return {
    isPending,
    isError,
    filteredEvents,
    categories,
    categoryOptions,
    control,
    handleSubmit,
    onSubmit
  }
}