import { useOutletContext } from 'react-router-dom'
import Orchids from "../../features/orchids/index.jsx"
import TestCount from "../../features/count/index.jsx"
import { getAllOrchids } from "../../services/orchidApi.js"; // Import the API service
import { useState, useEffect } from 'react'; // Import useState and useEffect

function Home() {
    const context = useOutletContext()
    const searchTerm = context ? context.searchTerm : ""

    const [orchidsData, setOrchidsData] = useState([]); // State to hold fetched orchids
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        const fetchOrchids = async () => {
            try {
                const data = await getAllOrchids();
                setOrchidsData(data);
            } catch (err) {
                setError("Failed to fetch orchids.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrchids();
    }, []); // Empty dependency array means this runs once on mount

    if (loading) {
        return <div className="text-center mt-5">Loading orchids...</div>;
    }

    if (error) {
        return <div className="text-center mt-5 text-danger">{error}</div>;
    }

    return (
        <div className="text-center mt-5">
            <h1>Welcome to Michael&apos;s Page</h1>
            <Orchids orchids={orchidsData} searchTerm={searchTerm} />
            <TestCount />
        </div>
    )
}

export default Home