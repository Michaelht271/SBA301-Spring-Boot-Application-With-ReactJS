import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from "./Header.jsx"
import Footer from "./Footer.jsx"
import author from "../../data/author.js"
import HomeCarousel from "../ui/carousel/index.jsx";

export default function MainLayout() {
    const [searchTerm, setSearchTerm] = useState("")

    return (
        <>
            <HomeCarousel/>
            <Header onSearchChange={setSearchTerm} />
            <main>
                <Outlet context={{ searchTerm }} />
            </main>
            <Footer author={author} />
        </>
    )
}