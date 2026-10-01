'use server'

import { apiFetch } from '@/lib/api';

interface ReservePayload {
  eventId: string;
  seatNumber: string;
  paymentMethod: string;
  paymentSimulatedStatus: 'APPROVED' | 'REFUSED'
}

export async function reserveTicketAction(payload: ReservePayload) {
  return await apiFetch('/api/tickets/reserve', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}