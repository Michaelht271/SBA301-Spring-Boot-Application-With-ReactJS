import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import Header from './component/layout/Header.jsx'
import Footer from './component/layout/Footer.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Router from './Router.jsx'
import author from './data/author'
import { AuthProvider } from './context/AuthContext.jsx'

function Root() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <BrowserRouter>
            <AuthProvider>
                <StrictMode>
                    <Header onSearchChange={setSearchTerm} />
                    <main>
                        <Router searchTerm={searchTerm} />
                    </main>
                    <Footer author={author} />
                </StrictMode>
            </AuthProvider>
        </BrowserRouter>
    );
}

createRoot(document.getElementById('root')).render(<Root />);
