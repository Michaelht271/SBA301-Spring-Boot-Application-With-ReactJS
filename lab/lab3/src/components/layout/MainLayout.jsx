import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from "./Header.jsx"
import Footer from "./Footer.jsx"
import { getAuthors } from '../../services/apis.js'
import HomeCarousel from "../ui/carousel/index.jsx";

export default function MainLayout() {
    const [searchTerm, setSearchTerm] = useState("")
    const [author, setAuthor] = useState(null);
    useEffect(() => {
        getAuthors().then(data => {
            setAuthor(data);
        });
    }, []);

    return (
        <>
            <HomeCarousel/>
            <Header onSearchChange={setSearchTerm} />
            <main>
                <Outlet context={{ searchTerm }} />
            </main>
            {author && <Footer author={author} />}
        </>
    )
}