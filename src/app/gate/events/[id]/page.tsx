"use client"

import { AlertCard } from '@/components/my-components/AlertCard';
import { useAuth } from '@/contexts/authContext';
import useEventDetails from '@/hooks/useEventDetails';
import { AlertCircleIcon } from 'lucide-react';
import { redirect, useParams } from 'next/navigation';

export default function GateEventPage() {
  const auth = useAuth()
    
  if (!auth.token) {
    redirect('/login')
  }

  if (auth.user?.role !== 'VALIDATOR' && auth.user?.role !== 'ORGANIZER') {
    redirect('/')
  }

  const { id } = useParams() as { id: string };

  const { event, isLoading, error } = useEventDetails(id);

  return (
    <div className='flex flex-col gap-5 justify-center items-center p-10'>
      <div className='text-3xl font-bold w-full'>
        {event?.title}
      </div>

      <div className='flex flex-col gap-5 w-full md:w-1/3 items-center justify-center'>
        {error && (
          <div>
            <AlertCard 
              color='red'
              title='Erro'
              description={error.message || ''}
              icon={<AlertCircleIcon />}
            />
          </div>
        )}

        {!event || isLoading ? (
          <div>
            Carregando...
          </div>
        ) : (
          <div>
            conteudo
          </div>  
        )}
      </div>
    </div>
  )
}