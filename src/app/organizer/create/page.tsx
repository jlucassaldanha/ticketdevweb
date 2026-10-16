"use client"

import SearchTMDBCard from '@/components/my-components/SearchTMDBCard';
import { TMDBMovieCard, TMDBMovieCardSkeleton } from '@/components/my-components/TMDBMovieCard';
import { useCreateEvent } from '@/hooks/useCreateEvent';
import useSearchTMDB from '@/hooks/useSearchTMDB';

export default function CreatePage() {
  const { isFetching, tmdbMovies, control, handleSubmit, onSubmit, clearSearch } = useSearchTMDB()

  const {
    handleSelectMovie,
    eventControl,
    handleEventSubmit,
    onEventSubmit
  } = useCreateEvent(clearSearch)

  return (
    <div className='flex flex-col gap-5 justify-center items-center p-10'>
      <div className='text-3xl font-bold w-full'>
        Dashboard do Organizador
      </div>

      <div className='w-full'>
        Crie e organize seus eventos por aqui
      </div>

      <div className='w-full'>
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

        <div>

        </div>
      </div>
    </div>
  )
}