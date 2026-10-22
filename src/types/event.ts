import { Ticket } from './ticket';

export interface TicketEvent {
  id: string
  title: string
  description: string
  imageUrl: string
  externalId: string  
  ticketsSold: number
  category: string
  date: string
  location: string
  capacity: number
  price: string
  tickets?: Ticket[]
}