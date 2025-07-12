import React from "react";
import { useState, useEffect } from "react";
import Card from "./Card";

const List = () => {
    const [breweries, setBreweries] = useState([]);
    const [selectedBrewery, setSelectedBrewery] = useState(null);

    const API_URL = "https://api.openbrewerydb.org/v1/breweries";

    const filterBeweries = async (city) => {
        const cityParam = city.replace(/\s+/g, "_"); // Replace spaces with underscores
    const url = `https://api.openbrewerydb.org/v1/breweries?by_city=${cityParam}`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching breweries by city:", error);
        return null;
    }
    }

    useEffect(() => {
        console.log("useEffect running - fetching New York breweries");
        filterBeweries("New York").then(setBreweries);
    }, []);


    return(
        <>
        <Card brewery={selectedBrewery} />
        <ul className="bg-[#FFF2C2] flex flex-col items-center p-4 rounded-lg shadow-lg max-w-md w-full text-[#7C2600]">
            {breweries.map(brewery => (
                <li 
                    key={brewery.id} 
                    className="py-2 text-center cursor-pointer hover:bg-gray-100" 
                    onClick={() => setSelectedBrewery(brewery)}
                >
                    {brewery.name}
                </li>
            ))}
        </ul>
        </>
    )
}

export default List;
