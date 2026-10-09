import { validateTicketAction } from '@/actions/gate';
import { ValidationResult } from '@/types/gate';
import { ValidateTicketResponse } from '@/types/ticket';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const validationSchema = z.object({
  hash: z.string().min(1, 'Insira o hash do ingresso')
})

type ValidationFormData = z.infer<typeof validationSchema>

export function useValidateTicket(eventId: string) {
  const [ validationResult, setValidationResult ] = useState<ValidationResult>({ status: 'NONE', message: ' ' })

  const { mutate: validateTicket, isPending } = useMutation({
    mutationFn: async (hash: string) => {
      const data = await validateTicketAction({
        secureHash: hash.trim(),
        currentEventId: eventId
      })

      return data as ValidateTicketResponse
    },
    onSuccess: (data: ValidateTicketResponse) => {
      setValidationResult({
        status: 'VALID',
        message: 'Entrada autorizada!',
        ticketDetails: {
          movieTitle: data.ticket?.event?.title || 'Filme selecionado',
          seatNumber: data.ticket?.seatNumber || 'Pista',
          clientName: data.ticket?.client?.name || 'Cliente'
        }
      })
    },
    onError: (err: unknown) => {
      const apiError = err as { status?: number; data?: ValidateTicketResponse; message?: string };
      const errorData = apiError?.data;

      if (apiError.status === 409) {
        setValidationResult({
          status: 'ALREADY_USED',
          message: 'ATENÇÃO: Este ingresso já foi validado na portaria!',
          ticketDetails: {
            movieTitle: errorData?.ticket?.event?.title || 'Filme selecionado',
            seatNumber: errorData?.ticket?.seatNumber || 'Pista',
            clientName: errorData?.ticket?.client?.name || 'Cliente'
          }
        });
      } else if (apiError.status === 400) {
        setValidationResult({
          status: 'WRONG_EVENT',
          message: 'EVENTO INCORRETO! Este ingresso pertence ao filme:',
          ticketDetails: {
            movieTitle: errorData?.correctEventTitle || 'Outro filme',
            seatNumber: errorData?.ticket?.seatNumber || 'Pista',
            clientName: errorData?.ticket?.client?.name || 'Cliente'
          }
        });
      } else {
        setValidationResult({
          status: 'INVALID',
          message: apiError.message || 'ALERTA DE SEGURANÇA: Ingresso inválido ou assinatura corrompida!'
        });
      }
    }
  })

  const resetValidation = () => setValidationResult({ status: 'NONE', message: '' });

  const { control, handleSubmit, reset } = useForm<ValidationFormData>({
    resolver: zodResolver(validationSchema),
    defaultValues: { hash: '' }
  })

  const onSubmit = (data: ValidationFormData) => {
    validateTicket(data.hash, {
      onSuccess: () => reset()
    })
  }

  return {
    validateTicket,
    isPending,
    validationResult,
    resetValidation,
    control,
    handleSubmit,
    onSubmit
  };
}
