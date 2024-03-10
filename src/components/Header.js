import { useState, useContext } from "react";
import { LOGO_URL } from "../utils/constants";
import {Link} from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";


const Header = () => {

    // let btnName = "Login";

    const [btnName, setbtnName] = useState("Login");
    const onlineStatus = useOnlineStatus();
    const {loggedInUser} = useContext(UserContext);

    return (
        <div className="flex justify-between bg-pink-100 shadow-lg sm:bg-yellow-100 lg:bg-green-100">
            <div className="logo-container">
                <img className="w-56" src={LOGO_URL}/>
            </div>
            <div className="items-center">
                <ul className="flex py-8 px-4 m-4">
                    <li className="px-4">
                        Online Status {onlineStatus ? "🟢" : "🔴"}
                    </li>
                    <li className="px-4">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="px-4">
                        <Link to="/about">About</Link>
                    </li>
                    <li className="px-4">
                        <Link to="/grocery">Grocery</Link>
                    </li>
                    <li className="px-4">
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li className="px-4">Cart</li>
                    <button 
                        className="login px-4"
                        onClick={() => {
                            btnName === "Login" ? setbtnName("Logout") : setbtnName("Login");
                        }}
                    >
                        {btnName}
                    </button>
                    <li className="px-4 font-bold">{loggedInUser }</li>
                </ul>
            </div>
        </div>
    );
};

export default Header;