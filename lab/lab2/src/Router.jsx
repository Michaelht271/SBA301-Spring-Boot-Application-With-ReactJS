import { Routes, Route } from 'react-router-dom'
import About from './pages/about/index.jsx'
import Contact from './pages/contact/index.jsx'
import Home from './pages/home/index.jsx'
import OrchidDetail from './pages/orchid/index.jsx'
import Login from './pages/login/index.jsx'
import ProtectedRoute from './component/auth/ProtectedRoute.jsx'

function Router({searchTerm}) {
    return (
        <Routes>
            <Route path="/" element={<Home searchTerm={searchTerm} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={
                <ProtectedRoute>
                    <About />
                </ProtectedRoute>
            } />
            <Route path="/contact" element={
                <ProtectedRoute>
                    <Contact />
                </ProtectedRoute>
            } />
            <Route path="/orchid/:id" element={
                <ProtectedRoute>
                    <OrchidDetail />
                </ProtectedRoute>
            } />
        </Routes>
    )
}

export default Router
