import {BrowserRouter, Route, Routes} from "react-router-dom";
import Orchids from "./components/orchid/index.jsx";
import EditOrchid from "./components/orchid/EditOrchid.jsx";
import Orchid from "./components/orchid/_id.jsx";

export default function Routers() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Orchids/>}/>
                <Route path={"/orchid/:id"} element={<Orchid/>}/>
                <Route path={"/edit/:id"} element={<EditOrchid/>}/>
            </Routes>
        </BrowserRouter>
    );
}