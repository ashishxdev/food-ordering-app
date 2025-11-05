import { LOGO_URL } from "../utils/constant";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {

    const[btnNameReact, setbtnNameReact] = useState("Login")

    const onlinestatus = useOnlineStatus();

    const {loggedInUser} = useContext(UserContext)

    useEffect(()=>{
    }, [btnNameReact]);

    const cartItems = useSelector((store) => store.cart.items)

    return (
        <div className="flex justify-between items-center px-6 py-3 bg-white shadow-md sticky top-0 z-50">
            <div className="logo-container flex items-center">
                <img className="w-25" src={LOGO_URL}/>
            </div>
            <div className="flex items-center">
                <ul className="flex items-center gap-6 text-gray-700 font-medium">

                    <li className="flex items-center hover:text-orange-500 transition-colors duration-200">
                        Online Status:{" "}
                        <span
                        className={`ml-2 w-3 h-3 rounded-full ${
                        onlinestatus ? "bg-green-500" : "bg-red-500"
                        }`}
                        ></span>
                    </li>

                    <li className="hover:text-orange-500 transition-colors duration-200"><Link to="/">Home</Link></li>
                    <li className="hover:text-orange-500 transition-colors duration-200"><Link to="/about">About Us</Link></li>
                    <li className="hover:text-orange-500 transition-colors duration-200"><Link to="/contact">Contact Us</Link></li>
                    <li className="hover:text-orange-500 transition-colors duration-200">
                        <Link to="/grocery">Grocery</Link></li>
                    <li className="hover:text-orange-500 transition-colors duration-200">
                        <Link to="/cart">({cartItems.length}) Cart 🛒</Link></li>
                    <button className="px-4 py-1 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-200" onClick={()=>{
                        btnNameReact == "Login"
                        ? setbtnNameReact("Logout") 
                        : setbtnNameReact("Login") 
                        }}>{btnNameReact}</button>

                    <li className="px-2 font-semibold text-gray-600">{loggedInUser}</li>

                </ul>
            </div>
        </div>
    )
}

export default Header;