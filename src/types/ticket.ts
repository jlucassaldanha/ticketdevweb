import { TicketEvent } from "./event";

export interface Ticket {
  id: string
  seatNumber: string | null
  status: string
  secureHash: string;
  event: TicketEvent;
}

export interface ReserveTicketResponse {
  id: string;
  secureHash: string;
  seatNumber: string;
  status: string;
  event: TicketEvent;
}

export interface SharedTicket {
  id: string;
  seatNumber: string | null;
  status: string;
  secureHash: string;
  client: {
    name: string;
  };
  event: {
    location: string
    title: string
    date: Date
  };
}

export interface ValidateTicketResponse {
  ticket?: SharedTicket| null;
  correctEventTitle?: string;
}