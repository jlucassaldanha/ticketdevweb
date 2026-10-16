import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { TMDbMovie } from '@/types/tmdb';

export default function TMDBMovieCard({ movie }: { movie: TMDbMovie }) {
  return (
    <Card className='flex flex-row items-center overflow-hidden max-w-xl w-full'>
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