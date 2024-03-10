import { useContext } from "react";
import UserContext from "../utils/UserContext";


const About = () => {
    
const { loggedInUser } = useContext(UserContext);
    return (
        <div>
            <h1>About</h1>
            <h3>This is the About Section.</h3>
            <h3 className="text-lg font-semibold">LoggedIn User : {loggedInUser}</h3>
        </div>
    )
};
export default About;