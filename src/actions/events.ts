"use server"

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