import { Ticket } from './ticket';

export interface TicketEvent {
  id: string
  title: string
  description: string
  imageUrl: string
  ticketsSold: number
  category: string
  date: string
  location: string
  capacity: number
  price: number
  tickets?: Ticket[]
}