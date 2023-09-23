import { useCallback, useEffect, useRef, useState } from 'react'
import { MovieComponent } from './MovieComponent'
import { IMovie } from 'shared/types'
import classNames from 'classnames'
import { useMovies } from 'shared/context'
import { debounce } from 'lodash'

export interface ICateMovieComponentProps {
  data: IMovie
  indexCol: number
}
const scrollAmount = 500
export function CateMovieComponent({
  data,
  indexCol,
}: ICateMovieComponentProps) {
  const { items, title } = data
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isAtLeftmost, setIsAtLeftmost] = useState(true)
  const [isAtRightmost, setIsAtRightmost] = useState(false)
  const [isMouseMove, setIsMouseMove] = useState(false)
  const { selectedCol, selectedRow } = useMovies()

  const scrollLeft = () => {
    const container = containerRef.current
    if (container) {
      container.scrollTo({
        left: container.scrollLeft - scrollAmount,
        behavior: 'smooth',
      })
      setIsAtLeftmost(container.scrollLeft - scrollAmount <= 0)
      setIsAtRightmost(false)
    }
  }

  const scrollRight = () => {
    const container = containerRef.current
    if (container) {
      const newScrollLeft = container.scrollLeft + scrollAmount

      container.scrollTo({
        left: container.scrollLeft + scrollAmount,
        behavior: 'smooth',
      })
      setIsAtLeftmost(false)
      setIsAtRightmost(
        newScrollLeft >= container.scrollWidth - container.clientWidth
      )
    }
  }

  const handleKeyDown = useCallback(
    (e: any) => {
      e.preventDefault()
      if (selectedCol === indexCol) {
        const container = containerRef.current
        if (container) {
          if (e.key === 'ArrowLeft') {
            container.scrollTo({
              left: container.scrollLeft - 228,
              behavior: 'smooth',
            })
            setIsAtLeftmost(container.scrollLeft - scrollAmount <= 0)
            setIsAtRightmost(false)
          } else if (e.key === 'ArrowRight') {
            const newScrollLeft = container.scrollLeft + 228
            if (((selectedRow || 0) + 1) * 228 > container.clientWidth - 228) {
              container.scrollTo({
                left: container.scrollLeft + 228,
                behavior: 'smooth',
              })
            }
            setIsAtLeftmost(false)
            setIsAtRightmost(
              newScrollLeft >= container.scrollWidth - container.clientWidth
            )
          }
        }
      }
    },
    [selectedCol, selectedRow, indexCol, containerRef]
  )

  const debouncedHandleKeyDown = debounce(handleKeyDown, 150)

  useEffect(() => {
    window.addEventListener('keydown', debouncedHandleKeyDown)
    return () => {
      window.removeEventListener('keydown', debouncedHandleKeyDown)
    }
  }, [debouncedHandleKeyDown])

  useEffect(() => {
    if (selectedCol === indexCol) {
      const container = containerRef.current
      if (container) {
        if (!isMouseMove) {
          container.scrollTo({
            left: 0,
            behavior: 'smooth',
          })
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCol, indexCol, containerRef])

  return (
    <div
      className="relative"
      onMouseMove={() => setIsMouseMove(true)}
      onMouseLeave={() => setIsMouseMove(false)}
    >
      <div
        className={classNames(
          'cursor-pointer absolute -left-5 top-1/2 z-10 bg-gray-500 opacity-50 flex items-center justify-center w-10 h-10 rounded-full text-white font-bold text-lg',
          {
            hidden: isAtLeftmost,
          }
        )}
        onClick={scrollLeft}
      >
        {'<'}
      </div>
      <h2 className="text-white mb-2 text-2xl font-semibold pl-2">{title}</h2>
      <div
        className="hide-scrollbar w-full flex-1 overflow-x-scroll p-2"
        ref={containerRef}
      >
        <div className="flex gap-5">
          {items.map((item, index) => (
            <MovieComponent
              data={item}
              key={index}
              indexCol={indexCol}
              indexRow={index}
            />
          ))}
        </div>
      </div>
      <div
        className={classNames(
          'cursor-pointer absolute -right-5 top-1/2 z-10 bg-gray-500 opacity-50 flex items-center justify-center w-10 h-10 rounded-full text-white font-bold text-lg',
          {
            hidden: isAtRightmost,
          }
        )}
        onClick={scrollRight}
      >
        {'>'}
      </div>
    </div>
  )
}
