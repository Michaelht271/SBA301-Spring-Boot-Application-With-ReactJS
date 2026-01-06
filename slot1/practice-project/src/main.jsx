import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './component/layout/Header.jsx'
import Footer from './component/layout/Footer.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Header/>
 <main>
     <h1>
         Welcome to Michael Page
     </h1>
 </main>
      <Footer />

  </StrictMode>,
)
