import { Routes, Route } from 'react-router-dom'
import About from './pages/about/index.jsx'
import Contact from './pages/contact/index.jsx'
import Home from './pages/home/index.jsx'
import OrchidDetail from './pages/orchid/index.jsx'
function Router({searchTerm}) {
    return (
        <Routes>
            <Route path="/" element={<Home searchTerm={searchTerm} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/orchid/:id" element={<OrchidDetail />} />
        </Routes>
    )
}

export default Router
