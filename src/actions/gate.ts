'use server'

import { apiFetch } from '@/lib/api'

interface ValidatePayload {
  secureHash: string
  currentEventId: string
}

export async function validateTicketAction(payload: ValidatePayload) {
  return await apiFetch('/api/gate/validate', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}