import { filterEventByIdAction } from '@/actions/events';
import { useQuery } from '@tanstack/react-query';

export default function useEventDetails(eventId: string) {
  const { data: event, isLoading, error } = useQuery({
    queryKey: ['event', eventId],
    queryFn: () => filterEventByIdAction(eventId),
    enabled: !!eventId, 
  });

  return { 
    event, 
    isLoading, 
    error 
  }
}