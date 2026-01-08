import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Header from './component/layout/Header.jsx'
import Footer from './component/layout/Footer.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter} from 'react-router-dom'
import Router from './Router.jsx'

import author from './interface/author'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <StrictMode>
            <Header/>
            <main>
                <Router/>
            </main>
            <Footer author={author} />
        </StrictMode>,
    </BrowserRouter>
)