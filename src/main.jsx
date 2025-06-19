import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


import { FoodGroupProvider } from './contexts/FoodGroupContext.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FoodGroupProvider>
      <App />
    </FoodGroupProvider>
  </StrictMode>,
)
