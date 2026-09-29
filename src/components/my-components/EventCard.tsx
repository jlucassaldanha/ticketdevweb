import { Card, CardContent } from '@/components/ui/card';
import { TicketEvent } from '@/types/event';

export default function EventCard({ event }: { event: TicketEvent }) {
  return (
    <Card key={event.id}>
      <CardContent>
        <h3>{event.title}</h3>
        <p>{event.description}</p>
      </CardContent>
    </Card>
  );
}