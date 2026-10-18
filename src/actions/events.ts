"use server"

import { EventFormData } from '@/hooks/useCreateEvent';
import { apiFetch } from '@/lib/api';
import { TicketEvent } from '@/types/event';

export async function listEventsAction() {
  try {
    return await apiFetch<TicketEvent[]>('/api/events')
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
} 

export async function filterEventByIdAction(id: string) {
  try {
    const events = await apiFetch<TicketEvent[]>('/api/events')
    return events.find((event) => event.id === id)
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
} 

export async function listMyEventsAction() {
  try {
    return await apiFetch<TicketEvent[]>('/api/events/my-events')
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}

export async function createEventAction(data: EventFormData) {
  const parsedDate = new Date(data.date)
  if (isNaN(parsedDate.getTime())) {
    throw new Error("Data inválida fornecida.")
  }

  const payload = {
    ...data,
    price: data.price
  }

  return await apiFetch('/api/events', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}

export async function updateEventAction(eventId: string, data: EventFormData) {
  const parsedDate = new Date(data.date)
  if (isNaN(parsedDate.getTime())) {
    throw new Error("Data inválida fornecida.")
  }

  const payload = {
    ...data,
    price: data.price
  }

  return await apiFetch(`/api/events/${eventId}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  })
}