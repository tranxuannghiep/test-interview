export interface IMovieItem {
  id: string | null
  title: string
  subtitle: string
  image: string
  remain: number
}

export interface IMovie {
  title: string
  type: number
  items: IMovieItem[]
  totalItems: number
}

export interface ITransactionMovie {
  items: IMovie[]
  totalItems: number
}
