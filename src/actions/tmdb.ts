'use server'

import { apiFetch } from '@/lib/api'
import { TMDbMovie } from '@/types/tmdb'

export async function searchTMDBMoviesAction(searchQuery: string) {
  try {  
    return await apiFetch<TMDbMovie[]>(`/api/catalog/search?query=${encodeURIComponent(searchQuery)}`)
  } catch (error) {
    console.error('Error searching TMDb:', error);
    throw error;
  }
}