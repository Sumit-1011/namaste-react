import { useContext } from "react";
import { CDN_URL } from "../utils/constants";
import UserContext from "../utils/UserContext";

const RestaurantCard = (props) => {
    const { resData } = props;
    const { loggedInUser } = useContext(UserContext);

    const { cloudinaryImageId, name, cuisines, avgRating, costForTwo } = resData?.info;
    return (
        <div className="res-card m-4 p-4 w-[250px] rounded-lg bg-gray-100 hover:bg-gray-200">
            <img className="res-logo rounded-lg" alt="res-logo" src={CDN_URL + cloudinaryImageId} />
            <h3 className="font-bold py-4 text-lg">{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{avgRating} ⭐</h4>
            <h4>{costForTwo}</h4>
            <h4>Delivery Time: {resData.info.sla.deliveryTime}</h4>
            <h4>User: {loggedInUser}</h4>
        </div>
    );
};

export const withDiscountLabel = (RestaurantCard) => {
    return (props) => {
        //const { data } = props;
        // const discountInfo = data?.resData?.info?.avgRating;
        // console.log(props);

        return (
            <div className="relative inline-block">
                <label className="absolute bg-black text-white mx-6 my-8 px-2 rounded-lg right-0">discountInfo</label>
                <RestaurantCard {...props} />
            </div>
        );
    };
};

export default RestaurantCard;