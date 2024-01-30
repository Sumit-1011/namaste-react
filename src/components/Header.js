import { useState } from "react";
import { LOGO_URL } from "../utils/constants";

const Header = () => {

    // let btnName = "Login";

    const [btnName, setbtnName] = useState("Login");

    return (
        <div className="header">
            <div className="logo-container">
                <img className="logo" src={LOGO_URL}/>
            </div>
            <div className="nav-items">
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Conatct Us</li>
                    <li>Cart</li>
                    <button 
                        className="login"
                        onClick={() => {
                            btnName === "Login" ? setbtnName("Logout") : setbtnName("Login");
                        }}
                    >
                        {btnName}
                    </button>
                </ul>
            </div>
        </div>
    );
};

export default Header;