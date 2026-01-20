import Orchids from "../../component/orchids/index.jsx";
import { orchids } from "../../data/orchids"
import TestCount from "../../component/count/index.jsx";
function Home({searchTerm}) {
    return (
        <div className="text-center mt-5">
            <h1>Welcome to Michael&apos;s Page</h1>
            <Orchids orchids={orchids}  searchTerm={searchTerm}/>
            <TestCount/>
        </div>
    )
}

export default Home
