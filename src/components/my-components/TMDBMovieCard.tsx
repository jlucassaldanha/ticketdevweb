import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { TMDbMovie } from '@/types/tmdb';
import { Skeleton } from '../ui/skeleton';

export function TMDBMovieCard({ movie, onSelectMovie }: { movie: TMDbMovie, onSelectMovie: (movie: TMDbMovie) => void }) {
  return (
    <Card 
      className='flex flex-col md:flex-row items-center overflow-hidden w-full hover:cursor-pointer hover:bg-accent/75' 
      onClick={() => onSelectMovie(movie)}>
      <div className='relative w-40 h-40 shrink-0'>
        <Image
          width={200}
          height={200}
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}` || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba'}
          alt={movie.title}
          className="relative z-20 w-full object-cover aspect-square"
        />
      </div>
      
      <div className='flex flex-col flex-1 p-4 justify-between'>
        <CardHeader className='p-0 pb-2'>
          <CardTitle className='text-lg font-bold'>{movie.title}</CardTitle>
        </CardHeader>

        <CardContent className='p-0 flex flex-col gap-1'>
          <span className='text-xs text-muted-foreground'>
            Lançamento: {movie.release_date}
          </span>
        
          <CardDescription className='text-xs line-clamp-3 mt-1'>
            {movie.overview}
          </CardDescription>
        </CardContent>
      </div>
    </Card>
  )
}

export function TMDBMovieCardSkeleton() {
  return (
    <Card className='flex flex-row items-center overflow-hidden max-w-xl w-full'>
      <Skeleton className='w-40 h-40'/>
      
      <div className='flex flex-col flex-1 p-4 justify-between'>
        <CardHeader className='p-0 pb-2'>
          <Skeleton className='h-4 w-3/4'/>
        </CardHeader>

        <CardContent className='p-0 flex flex-col gap-1'>
          <Skeleton className='h-2 w-1/4'/>
        
          <CardDescription className='text-xs line-clamp-3 mt-1'>
            <Skeleton className='h-2 w-full mb-1'/>
            <Skeleton className='h-2 w-full mb-1'/>
            <Skeleton className='h-2 w-3/4'/>
          </CardDescription>
        </CardContent>
      </div>
    </Card>
  )
}