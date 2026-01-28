
import './App.css'
import {StrictMode} from "react";
import {BrowserRouter } from 'react-router-dom'
import Router from "./Router.jsx";


function App() {


  return (
    <>
        <BrowserRouter>
            <AuthProvider>
                <StrictMode>
                    <Router/>
                </StrictMode>
            </AuthProvider>
        </BrowserRouter>

    </>
  )
}

export default App
