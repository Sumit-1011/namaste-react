import RestaurantCard from "./RestaurantCard";
import {useState, useEffect} from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { RESTRAUNT_API } from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStatus";


const Body = () => {

    //Local State Variable - Super Powerful
    const [listOfRestaurants, setlistOfRestaurants] =  useState([]);
    const [filteredRestraunts, setfilteredRestraunts] = useState([]);
    
    const [searchText, setsearchText] = useState("");

    useEffect(()=>{
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(RESTRAUNT_API);

        const json = await data.json();

        // console.log(json);
        setlistOfRestaurants(json?.data.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setfilteredRestraunts(json?.data.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };

    const onlineStatus = useOnlineStatus();

    if (onlineStatus === false) return (
        <h1>
            Looks like your Internet is not working!
        </h1>
    )

    return listOfRestaurants.length === 0 ? 
        <Shimmer/>
    : (
        <div className="body">
            <div className="filter flex">

                <div className="search p-4 m-4">
                    <input type="text" 
                    placeholder="Type Here..." 
                    className="border border-solid border-black" 
                    value={searchText} 
                    onChange={(e) => {
                        setsearchText(e.target.value);
                    }}/>

                    <button className="px-4 py-1 m-4 bg-green-100 rounded-lg" onClick={() => {

                        const filterRestraunts = listOfRestaurants.filter(
                            (res) => res.info.name.toLowerCase().includes(searchText.toLowerCase())
                        );
                        
                        setfilteredRestraunts(filterRestraunts);
                    }
                    //fetchData();
                }
                    >Search</button>

                </div>
                
                <div className="search p-4 m-4 flex items-center">
                        <button className="px-4 py-1 m-2 bg-gray-100 rounded-lg" onClick={()=>{
                        const filterdList = listOfRestaurants.filter(
                            (res) => res.info.avgRating >= 4
                        );
                        setfilteredRestraunts(filterdList);
                    }}>
                        Top Rated Restaurants
                    </button>  
                </div>
                
                
            </div>


            <div className="res-container flex flex-wrap">
                {
                    filteredRestraunts.map((restaurant) => (
                    <Link key={restaurant.info.id} to={"/restaurant/"+restaurant.info.id}><RestaurantCard resData={restaurant}/></Link>
                ))};
            </div>
        </div>
    );
};

export default Body;