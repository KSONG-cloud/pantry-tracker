import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


import { FoodGroupProvider } from './contexts/FoodGroupContext.jsx'
import { PantryProvider } from './contexts/PantryContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PantryProvider>
      <FoodGroupProvider>
        <App />
      </FoodGroupProvider>
    </PantryProvider>
  </StrictMode>,
)
