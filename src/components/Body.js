import RestaurantCard from "./RestaurantCard";
import {useState, useEffect} from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { RESTRAUNT_API } from "../utils/constants";


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

    return listOfRestaurants.length === 0 ? 
        <Shimmer/>
    : (
        <div className="body">
            <div className="filter">

                <div className="search">
                    <input type="text" 
                    placeholder="Type Here..." 
                    className="search-box" 
                    value={searchText} 
                    onChange={(e) => {
                        setsearchText(e.target.value);
                    }}/>

                    <button className="search-btn" onClick={() => {

                        const filterRestraunts = listOfRestaurants.filter(
                            (res) => res.info.name.toLowerCase().includes(searchText.toLowerCase())
                        );
                        
                        setfilteredRestraunts(filterRestraunts);
                    }
                    //fetchData();
                }
                    >Search</button>

                </div>


                <button className="filter-btn" onClick={()=>{
                    const filterdList = listOfRestaurants.filter(
                        (res) => res.info.avgRating >= 4
                    );
                    setfilteredRestraunts(filterdList);
                }}>
                    Top Rated Restaurants
                </button>
                
            </div>


            <div className="res-container">
                {
                    filteredRestraunts.map((restaurant) => (
                    <Link key={restaurant.info.id} to={"/restaurant/"+restaurant.info.id}><RestaurantCard resData={restaurant}/></Link>
                ))};
            </div>
        </div>
    );
};

export default Body;