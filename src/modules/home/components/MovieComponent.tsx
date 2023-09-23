import classNames from 'classnames'
import * as React from 'react'
import { useMovies } from 'shared/context/MovieContext'
import { IMovieItem } from 'shared/types'

export interface IMovieComponentProps {
  data: IMovieItem
  indexCol: number
  indexRow: number
}

export function MovieComponent({
  data,
  indexCol,
  indexRow,
}: IMovieComponentProps) {
  const { selectedCol, selectedRow, setSelectedCol, setSelectedRow } =
    useMovies()
  return (
    <div
      className={classNames(
        'bg-bgMovie rounded-lg w-52 text-white duration-500 cursor-pointer',
        {
          '!text-black !bg-white scale-105 transition-all':
            selectedCol === indexCol && selectedRow === indexRow,
        }
      )}
      onMouseMove={() => {
        setSelectedCol && setSelectedCol(indexCol)
        setSelectedRow && setSelectedRow(indexRow)
      }}
    >
      <div className="w-52 h-32">
        <img
          src={data.image}
          alt=""
          className="object-cover block w-full h-full rounded-t-lg"
        />
      </div>
      <div className="px-3 py-2">
        <p className="text-[14px] truncate">{data.title}</p>
        <p className="text-xs text-subText truncate">{data.subtitle}</p>
      </div>
    </div>
  )
}
