import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import './Layout.css'

export default function Layout() {
    return (
        <>
            <Navbar />
            <div className="mainbox">
                <Outlet />
            </div>

        </>
    )
};