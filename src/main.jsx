import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NoFoundPage from './components/NoFoundPage.jsx'
import About from './components/About.jsx'
import Info from './components/Info.jsx'

const router = createBrowserRouter([
  {path: '/', element: <App />},
  {path: '*', element: <NoFoundPage />},
  {path: '/about', element: <About />},
  {path: '/info/:id', element: <Info />},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
