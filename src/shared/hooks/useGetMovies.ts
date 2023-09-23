import { useCallback, useEffect, useState } from 'react'
import { ITransactionMovie } from '../types'
import movieService from '../services/movie.service'

export function useGetMovies() {
  const [data, setData] = useState<ITransactionMovie | null>(null)
  const [loading, setLoading] = useState(true)
  const getMovies = useCallback(async () => {
    try {
      const res = await movieService.getMovies()
      setData(res.data.data)
      setTimeout(() => {
        setLoading(false)
      }, 500)
    } catch (error) {
      setTimeout(() => {
        setLoading(false)
      }, 500)
      //handle error
    }
  }, [])

  useEffect(() => {
    getMovies()
  }, [getMovies])
  return { data, loading }
}
