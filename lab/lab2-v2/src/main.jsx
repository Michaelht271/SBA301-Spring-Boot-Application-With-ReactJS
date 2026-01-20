import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import Router from './Router.jsx'  // Import Router

export function Root() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <StrictMode>
                    <Router />
                </StrictMode>
            </AuthProvider>
        </BrowserRouter>
    )
}

createRoot(document.getElementById('root')).render(<Root />)