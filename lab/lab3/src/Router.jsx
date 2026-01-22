import { Routes, Route } from 'react-router-dom'
import About from './pages/about/index.jsx'
import Contact from './pages/contact/index.jsx'
import Home from './pages/home/index.jsx'
import OrchidDetail from './pages/orchid/index.jsx'
import Login from './pages/login/index.jsx'
import OrchidManagementPage from './pages/admin/orchids/index.jsx'
import ProtectedRoute from './features/authentication/ProtectedRoute.jsx'
import MainLayout from './components/layout/MainLayout.jsx'
import { PATHS } from './constants/paths.js' // Import path constants
function Router() {
    return (
        <Routes>
            {/* Route công khai - không cần MainLayout */}
            <Route path={PATHS.LOGIN} element={<Login />} />
            {/* Routes bảo vệ - có MainLayout */}
            <Route path={PATHS.HOME} element={
                <ProtectedRoute>
                    <MainLayout />
                </ProtectedRoute>
            }>                <Route index element={<Home />} />
                <Route path={PATHS.ABOUT.substring(1)} element={<About />} />
                <Route path={PATHS.CONTACT.substring(1)} element={<Contact />} />
                <Route path={PATHS.ORCHID_DETAIL.substring(1)} element={<OrchidDetail />} />
                <Route path="admin/orchids" element={<OrchidManagementPage />} />
            </Route>
        </Routes>
    )
}
export default Router