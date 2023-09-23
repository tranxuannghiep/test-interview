import { AxiosResponse } from 'axios'
import { noLoginInstance } from '../helpers'
import { BaseResponse, ITransactionMovie } from '../types'

class MovieService {
  getMovies(): Promise<AxiosResponse<BaseResponse<ITransactionMovie>>> {
    return noLoginInstance.get('/gh/tconns/demo-tdm/data_recommend.json')
  }
}

const movieService = new MovieService()
export default movieService
