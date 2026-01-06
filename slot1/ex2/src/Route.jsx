import { Routes, Route } from 'react-router-dom'
import About from './component/pages/about/index.jsx'
import Contact from './component/pages/contact/index.jsx'
import Home from './component/pages/home/index.jsx'
function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
    )
}

export default Router
