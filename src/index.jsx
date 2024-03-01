import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css'
import App from './App'

const queryClient = new QueryClient();

function Root() {  
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
  		  <App />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>    
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode><Root/></React.StrictMode>
)
//<ReactQueryDevtools initialIsOpen={false} />