import { TMDbMovie } from '@/types/tmdb'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

const eventFormSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório'),
  description: z.string().min(1, 'A sinopse/descrição é obrigatória'),
  category: z.string().min(1, 'A categoria é obrigatória'),
  imageUrl: z.string().url('URL da imagem inválida'),
  date: z.string().min(1, 'A data é obrigatória'),
  location: z.string().min(1, 'O local é obrigatório'),
})

export type EventFormData = z.infer<typeof eventFormSchema>

export function useCreateEvent(onClearSearch: () => void) {
  const { control: eventControl, handleSubmit: handleEventSubmit, setValue } = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: '',
      description: '',
      category: 'Cinema',
      imageUrl: '',
    }
  });

  const handleSelectMovie = (movie: TMDbMovie) => {
    setValue('title', movie.title);
    setValue('description', movie.overview);
    setValue('category', 'Cinema');
    
    const bannerPath = movie.poster_path 
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
      : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba';
    
    setValue('imageUrl', bannerPath);

    onClearSearch(); 
  };

  const onEventSubmit = (data: EventFormData) => {
    console.log("Dados do evento a criar:", data);
  };

  return {
    handleSelectMovie,
    eventControl,
    handleEventSubmit,
    onEventSubmit
  }
}