import { useEffect } from 'react'
import { useMovies } from 'shared/context/MovieContext'
import { CateMovieComponent, SkeletonCateMovieComponent } from '../components'

const HEIGHT_MOVIE = 230
const PADDING = 40

export function HomePage() {
  const { data, loading, selectedCol, mouseMove, setMouseMove } = useMovies()

  useEffect(() => {
    if (!mouseMove && typeof selectedCol === 'number') {
      window.scroll({
        top: PADDING + selectedCol * HEIGHT_MOVIE,
        left: 0,
        behavior: 'smooth',
      })
    }
  }, [selectedCol, mouseMove])

  useEffect(() => {
    window.addEventListener('keydown', function (e) {
      e.preventDefault()
    })
    return () => {
      window.addEventListener('keydown', function (e) {
        e.preventDefault()
      })
    }
  }, [])
  return (
    <div
      className="container mx-auto px-10 py-10"
      onMouseMove={() => setMouseMove && setMouseMove(true)}
      onMouseLeave={() => setMouseMove && setMouseMove(false)}
    >
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
