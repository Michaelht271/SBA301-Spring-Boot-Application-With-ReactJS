import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './component/layout/Header.jsx'
import Footer from './component/layout/Footer.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter} from 'react-router-dom'
import Router from './Route.jsx'
createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <StrictMode>
            <Header/>
            <main>
              <Router/>
            </main>
            <Footer />

        </StrictMode>,
    </BrowserRouter>
)
