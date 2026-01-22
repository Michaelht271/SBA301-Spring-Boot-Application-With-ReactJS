import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import Router from './Router.jsx'  // Import Router

export default function App() {
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
