"use client"

import { AlertCard } from '@/components/my-components/AlertCard';
import { CreateEventFormCard } from '@/components/my-components/CreateEventFormCard';
import SearchTMDBCard from '@/components/my-components/SearchTMDBCard';
import { TMDBMovieCard, TMDBMovieCardSkeleton } from '@/components/my-components/TMDBMovieCard';
import { useAuth } from '@/contexts/authContext';
import { useCreateEvent } from '@/hooks/useCreateEvent';
import useSearchTMDB from '@/hooks/useSearchTMDB';
import { AlertCircleIcon, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function CreatePage() {
  const auth = useAuth()
      
  if (!auth.token) {
    redirect('/login')
  }

  if (auth.user?.role !== 'ORGANIZER') {
    redirect('/')
  }

  const { 
    isFetching, 
    tmdbMovies, 
    control, 
    handleSubmit, 
    onSubmit, 
    clearSearch 
  } = useSearchTMDB()

  const {
    handleSelectMovie,
    eventControl,
    handleEventSubmit,
    onEventSubmit,
    isSubmittingEvent,
    error,
    isSuccess,
    formState
  } = useCreateEvent(clearSearch)

  const externalIdError = formState.errors.externalId?.message

  return (
    <div className='flex flex-col gap-5 justify-center items-center p-10'>
      <div className="w-full">
        <Link href="/organizer" className="flex gap-2">
          <ArrowLeft />
          Voltar para os eventos
        </Link>
      </div>

      <div className='text-3xl font-bold w-full'>
        Dashboard do Organizador
      </div>

      <div className='w-full'>
        Crie seus eventos por aqui
      </div>

      <div className='w-full flex gap-10'>
        <div className='w-full flex flex-col gap-5'>
          <div className='w-full'>
            <SearchTMDBCard control={control} onSubmit={handleSubmit(onSubmit)}/>
          </div>
          
          {isFetching && (
            <div className='flex flex-col gap-5'>
              <TMDBMovieCardSkeleton />
              <TMDBMovieCardSkeleton />
              <TMDBMovieCardSkeleton />
            </div>
          )}

          <div className='flex flex-col gap-5'>
            {tmdbMovies.map((movie) => (
              <div key={movie.id}>
                <TMDBMovieCard 
                  movie={movie} 
                  onSelectMovie={handleSelectMovie}
                />
              </div>
            ))}
          </div>
        </div>

        <div className='w-full'>
          <CreateEventFormCard 
            control={eventControl}
            onSubmit={handleEventSubmit(onEventSubmit)}
            isSubmitting={isSubmittingEvent}
          />
        </div>
      </div>

      {error && (
        <div>
          <AlertCard 
            color='red'
            title='Erro'
            description={error.message}
            icon={<AlertCircleIcon />}
          />
        </div>
      )}

      {externalIdError && (
        <div>
          <AlertCard 
            color='red'
            title='Erro'
            description={externalIdError}
            icon={<AlertCircleIcon />}
          />
        </div>
      )}

      {isSuccess && (
        <div>
          <AlertCard 
            color='green'
            title='Sucesso'
            description="Evento criado com sucesso!"
            icon={<AlertCircleIcon />}
          />
        </div>
      )}
    </div>
  )
}