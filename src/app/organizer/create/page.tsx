"use client"

import SearchTMDBCard from '@/components/my-components/SearchTMDBCard';
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

      <div>
        {isFetching ? (
          <span>carregando</span>
        ) 
          :  
          tmdbMovies.map((movie) => (
          <span key={movie.id}>{movie.title}</span>
        ))}
      </div>
    </div>
  )
}