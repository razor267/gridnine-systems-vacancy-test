import React from 'react'
import {createRoot} from 'react-dom/client'
import './styles/index.scss'
import App from './pages/App/App'

createRoot(document.getElementById('root') as HTMLDivElement).render(<App/>)
