import { searchTMDBMoviesAction } from '@/actions/tmdb'
import { TMDbMovie } from '@/types/tmdb'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

const formSchema = z.object({
  searchtmdb: z.string().min(1, "O campo de pesquisa não deve estar vazio."),
})

export type SearchFormData = z.infer<typeof formSchema>

export default function useSearchTMDB() {
  const [submittedSearch, setSubmittedSearch] = useState('');

  const { control, handleSubmit, reset } = useForm<SearchFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchtmdb: ''
    }
  });

  const { data: tmdbMovies = [], isFetching, isError } = useQuery<TMDbMovie[]>({
    queryKey: ['tmdb-movies', submittedSearch],
    queryFn: async () => {
      if (!submittedSearch) return []
      return await searchTMDBMoviesAction(submittedSearch)
    },
    enabled: submittedSearch.length > 0,
  }) 

  const onSubmit = (data: SearchFormData) => {
    setSubmittedSearch(data.searchtmdb)
  }

  const clearSearch = () => {
    setSubmittedSearch('');
    reset();
  }

  return {
    isFetching,
    isError,
    tmdbMovies,
    control,
    handleSubmit,
    onSubmit,
    clearSearch
  }
}