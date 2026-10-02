'use server'

import { apiFetch } from '@/lib/api';
import { Ticket } from '@/types/ticket';

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

export async function listTicketsAction() {
  return await apiFetch<Ticket[]>('/api/tickets/my-tickets')
}

export async function cancelTicketAction(id: string) {
  try {
    await apiFetch(`/api/tickets/${id}/cancel`, {
      method: 'POST'
    })
  } catch (err) {
    alert(err instanceof Error ? err.message : 'Falha ao cancelar o ingresso.')
  }
}