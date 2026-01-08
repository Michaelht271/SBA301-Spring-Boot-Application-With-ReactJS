import Orchid from "../../component/orchids/index.jsx";
import { orchids } from "../../data/orchids"
function Home() {
    return (
        <div className="text-center mt-5">
            <h1>Welcome to Michael&apos;s Page</h1>
            <Orchid orchids={orchids} />
        </div>
    )
}

export default Home
