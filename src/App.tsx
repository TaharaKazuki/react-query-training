import './App.css'
import { Posts } from './Posts'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Blog Posts</h1>
        <Posts />
        <ReactQueryDevtools />
      </div>
    </QueryClientProvider>
  )
}

export default App
