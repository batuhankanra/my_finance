
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './router'
import { Provider } from 'react-redux'
import { store } from './store'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Toaster richColors position='top-center' />
    <RouterProvider router={router} />  
  </Provider>
)
