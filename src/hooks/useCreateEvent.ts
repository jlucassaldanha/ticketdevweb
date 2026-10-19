import { createEventAction, updateEventAction } from '@/actions/events'
import { TicketEvent } from '@/types/event'
import { TMDbMovie } from '@/types/tmdb'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import z from 'zod'

const eventFormSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório'),
  description: z.string().min(1, 'A sinopse/descrição é obrigatória'),
  category: z.string().min(1, 'A categoria é obrigatória'),
  imageUrl: z.string().url('URL da imagem inválida'),
  date: z.string().min(1, 'A data é obrigatória'),
  location: z.string().min(1, 'O local é obrigatório'),
  capacity: z.number().min(1, 'O valor mínimo deve ser 1'),
  price: z.number().min(0, 'O valor não pode ser negativo'),
  externalId: z.string().min(1, 'É obrigatório selecionar um filme do catálogo de TMDb'),
})

export type EventFormData = z.infer<typeof eventFormSchema>

export function useCreateEvent(onClearSearch: () => void, editingEventId?: string | null) {
 const queryClient = useQueryClient()

  const { control: eventControl, handleSubmit: handleEventSubmit, setValue, reset, formState } = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: '',
      description: '',
      category: 'Cinema',
      imageUrl: '',
      date: '',
      location: '',
      capacity: 1,
      price: 0,
      externalId: ''
    }
  });

  const handleSelectMovie = (movie: TMDbMovie) => {
    setValue('title', movie.title);
    setValue('description', movie.overview);
    setValue('category', 'Cinema');
    setValue('externalId', String(movie.id))
    
    const bannerPath = movie.poster_path 
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
      : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba';
    
    setValue('imageUrl', bannerPath);

    onClearSearch(); 
  };

  const { mutateAsync: saveEvent, isPending: isSubmittingEvent, isError, error, isSuccess } = useMutation({
    mutationFn: async (data: EventFormData) => {
      if (editingEventId) {
        return await updateEventAction(editingEventId, data)
      } else {
        return await createEventAction(data)
      }
    },
    onSuccess: () => {
      reset()
      queryClient.invalidateQueries({ queryKey: ['organizer-events'] })
    },
  })

  const onEventSubmit = async (data: EventFormData) => {
    await saveEvent(data)
  };

  useQuery({
    queryKey: ['event-edit', editingEventId],
    queryFn: () => {
      if (!editingEventId) return null

      const cachedEvents = queryClient.getQueryData<TicketEvent[]>(['my-events'])

      const eventData = cachedEvents?.find(e => e.id === editingEventId)

      if (!eventData) return null

      let formattedDate = '';
      if (eventData.date) {
        const d = new Date(eventData.date);
        const tzOffset = d.getTimezoneOffset() * 60000;
        formattedDate = new Date(d.getTime() - tzOffset).toISOString().slice(0, 16);
      }

      reset({
        title: eventData.title,
        description: eventData.description,
        category: eventData.category,
        imageUrl: eventData.imageUrl,
        date: formattedDate,
        location: eventData.location,
        capacity: eventData.capacity,
        price: eventData.price,
        externalId: '',
      });

      return eventData;
    },
    enabled: !!editingEventId,
    staleTime: Infinity,
  })

  return {
    handleSelectMovie,
    eventControl,
    handleEventSubmit,
    onEventSubmit,
    isSubmittingEvent,
    isError,
    error,
    isSuccess,
    formState,
  }
}