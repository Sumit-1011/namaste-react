import ItemList from "./ItemList";

const RestaurantCategory = ({ data, showItems, setshowIndex, showIndex }) => {

    const handleClick = () => {
        setshowIndex(prevIndex => prevIndex === showIndex ? null : data.index);
    };

    return <div>
        
        <div className="w-6/12 mx-auto my-2 shadow-lg bg-gray-50 p-4">
            <div className="flex justify-between" onClick={handleClick}>
            <span className="font-bold text-lg">{data.title} ({data.itemCards.length})</span>
            <span>⬇️</span>
            </div>

            {showItems && <ItemList items={data.itemCards} />}
        </div>
    </div>
}

export default RestaurantCategory;