import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestrauntMenu from "../utils/useRestrauntMenu";

const RestaurantMenu = () => {

    const {resId} = useParams();        //resId is the params and here it is destructured at the fly
    
    const resInfo  = useRestrauntMenu(resId);


    if(resInfo === null) return <Shimmer/>;

    const {name, cuisines, costForTwoMessage} = resInfo?.cards[0]?.card?.card?.info;

    const {itemCards} = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;
    //console.log(itemCards);

    return (
        <div className="menu">
            <h1>{name}</h1>
            <p>{cuisines.join(", ")} - {costForTwoMessage}</p>
            <h2>Menu</h2>
            <ul>
                {itemCards.map(items => <li key = {items?.card?.info?.id}>
                    {items?.card?.info?.name}  -  {"Rs."} {items?.card?.info?.price/100}</li>)
                }
            </ul>
        </div>
    );
};

export default RestaurantMenu;