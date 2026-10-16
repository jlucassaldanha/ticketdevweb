"use client"

import SearchTMDBCard from '@/components/my-components/SearchTMDBCard';
import TMDBMovieCard from '@/components/my-components/TMDBMovieCard';
import useSearchTMDB from '@/hooks/useSearchTMDB';

export default function CreatePage() {
  const { isFetching, tmdbMovies, control, handleSubmit, onSubmit} = useSearchTMDB()

  return (
    <div className='flex flex-col gap-5 justify-center items-center p-10'>
      <div className='text-3xl font-bold w-full'>
        Dashboard do Organizador
      </div>

      <div className='w-full'>
        Crie e organize seus eventos por aqui
      </div>

      <div className='w-full'>
        <SearchTMDBCard control={control} onSubmit={handleSubmit(onSubmit)}/>
      </div>

      <div className='flex flex-col gap-5'>
        {isFetching ? (
          <span>carregando</span>
        ) 
          :  
          tmdbMovies.map((movie) => (
          <div key={movie.id}>
            <TMDBMovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  )
}