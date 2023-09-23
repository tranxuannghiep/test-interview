import * as React from 'react'
import { useMovies } from 'shared/context/MovieContext'
import { CateMovieComponent, SkeletonCateMovieComponent } from '../components'

export function HomePage() {
  const { data, loading } = useMovies()
  return (
    <div className="container mx-auto px-10 py-10">
      <div className="flex flex-col gap-6">
        {loading ? (
          <div className="space-y-8 animate-pulse">
            {Array.from(Array(10)).map((_, index) => (
              <SkeletonCateMovieComponent key={index} />
            ))}
          </div>
        ) : (
          data?.items.map((cateMovie, index) => (
            <CateMovieComponent data={cateMovie} key={index} indexCol={index} />
          ))
        )}
      </div>
    </div>
  )
}
