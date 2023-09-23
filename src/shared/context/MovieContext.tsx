import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useGetMovies } from 'shared/hooks'
import { ITransactionMovie } from 'shared/types'
import { debounce } from 'lodash'

const MovieContext = React.createContext<{
  selectedCol: number
  selectedRow: number
  setSelectedCol: Function
  setSelectedRow: Function
  data: ITransactionMovie | null
  loading: boolean
} | null>(null)

export const MovieContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedCol, setSelectedCol] = useState(0)
  const [selectedRow, setSelectedRow] = useState(0)
  const { data, loading } = useGetMovies()

  const handleKeyDown = useCallback(
    (e: any) => {
      e.preventDefault()
      if (e.key === 'ArrowUp' && selectedCol > 0) {
        setSelectedCol((prev) => prev - 1)
        setSelectedRow(0)
        window.scroll({
          top: window.scrollY - 230,
          left: 0,
          behavior: 'smooth',
        })
      } else if (
        e.key === 'ArrowDown' &&
        selectedCol < (data?.totalItems || 0) - 1
      ) {
        setSelectedCol((prev) => prev + 1)
        setSelectedRow(0)
        window.scroll({
          top: window.scrollY + 230,
          left: 0,
          behavior: 'smooth',
        })
      } else if (
        e.key === 'ArrowLeft' &&
        selectedRow > 0 &&
        selectedRow < (data?.items[selectedCol].totalItems || 0)
      ) {
        setSelectedRow((prev) => prev - 1)
      } else if (
        e.key === 'ArrowRight' &&
        selectedRow >= 0 &&
        selectedRow < (data?.items[selectedCol].totalItems || 0) - 1
      ) {
        setSelectedRow((prev) => prev + 1)
      } else if (e.key === 'Enter') {
        if (data?.items?.[selectedCol]?.items?.[selectedRow]?.title) {
          toast.success(data?.items[selectedCol].items[selectedRow].title, {
            style: {
              maxWidth: 800,
            },
          })
        }
      }
    },
    [selectedCol, selectedRow, data]
  )

  const debouncedHandleKeyDown = debounce(handleKeyDown, 150)

  useEffect(() => {
    window.addEventListener('keydown', debouncedHandleKeyDown)
    return () => {
      window.removeEventListener('keydown', debouncedHandleKeyDown)
    }
  }, [debouncedHandleKeyDown])

  useEffect(() => {
    setTimeout(() => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    }, 500)
  }, [])

  return (
    <MovieContext.Provider
      value={{
        selectedCol: selectedCol,
        selectedRow: selectedRow,
        setSelectedCol: setSelectedCol,
        setSelectedRow: setSelectedRow,
        data,
        loading,
      }}
    >
      {children}
    </MovieContext.Provider>
  )
}

export const useMovies = () => {
  const value = React.useContext(MovieContext)
  return {
    selectedCol: value?.selectedCol,
    selectedRow: value?.selectedRow,
    setSelectedCol: value?.setSelectedCol,
    setSelectedRow: value?.setSelectedRow,
    data: value?.data,
    loading: value?.loading,
  }
}

export default MovieContext
