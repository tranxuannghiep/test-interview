import { MovieContextProvider } from 'shared/context'
import './App.css'
import { HomePage } from './modules/home/pages'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <MovieContextProvider>
      <HomePage />
      <Toaster />
    </MovieContextProvider>
  )
}

export default App
