import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Header from "./component/layout/header.jsx";
import Footer from "./component/layout/footer.jsx";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Header/>
        <main>
            <App/>
        </main>

        <Footer/>
    </StrictMode>,
)
