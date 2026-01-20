import { Routes, Route } from 'react-router-dom'
import About from './pages/about/index.jsx'
import Contact from './pages/contact/index.jsx'
import Home from './pages/home/index.jsx'
import OrchidDetail from './pages/orchid/index.jsx'
import Login from './pages/login/index.jsx'
import ProtectedRoute from './component/auth/ProtectedRoute.jsx'
import MainLayout from './component/layout/MainLayout.jsx'
function Router() {
    return (
        <Routes>
            {/* Route công khai - không cần MainLayout */}
            <Route path="/login" element={<Login />} />
            {/* Routes bảo vệ - có MainLayout */}
            <Route path="/" element={
                <ProtectedRoute>
                    <MainLayout />
                </ProtectedRoute>
            }>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="orchid/:id" element={<OrchidDetail />} />
            </Route>
        </Routes>
    )
}
export default Router