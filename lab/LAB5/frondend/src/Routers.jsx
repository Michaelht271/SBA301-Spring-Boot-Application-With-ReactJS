import {BrowserRouter, Route, Routes} from "react-router-dom";
import Orchids from "./pages/orchids/index.jsx";
import EditOrchid from "./pages/orchids/EditOrchid.jsx";
import Orchid from "./pages/orchids/_id.jsx";

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