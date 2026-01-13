import { Routes, Route } from 'react-router-dom'
import About from './pages/about/index.jsx'
import Contact from './pages/contact/index.jsx'
import Home from './pages/home/index.jsx'
function Router({searchTerm}) {
    return (
        <Routes>
            <Route path="/" element={<Home searchTerm={searchTerm} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
    )
}

export default Router
