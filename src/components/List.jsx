import React from "react";
import { useState, useEffect } from "react";
import Card from "./Card";

const List = ({ searchTerm }) => {
    const [breweries, setBreweries] = useState([]); // State to hold the list of breweries
    const [selectedBrewery, setSelectedBrewery] = useState(null); // This is meant to pass to card component

    // Fetch breweries by city using API filtering
    const fetchBreweriesByCity = async (city) => {
        const cityParam = city.replace(/\s+/g, "_").toLowerCase();
        //link was https://api.openbrewerydb.org/v1/breweries
        const url = `https://api.openbrewerydb.org/v1/breweries?by_city=${cityParam}&per_page=20`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(`Found ${data.length} breweries in ${city}`);
            return data;
        } catch (error) {
            console.error("Error fetching breweries by city:", error);
            return [];
        }
    }

    useEffect(() => {
        // Fetch breweries in New York city when the component mounts
        console.log("Fetching New York city breweries...");
        fetchBreweriesByCity("New York").then(breweries => {
            console.log("New York city breweries:", breweries);
            setBreweries(breweries);
        });
    }, []);

    useEffect(() => {
        if (searchTerm && searchTerm.trim()) {
            // If user typed something, search that city
            console.log(`Searching for breweries in: ${searchTerm}`);
            fetchBreweriesByCity(searchTerm).then(breweries => {
                console.log(`Found ${breweries.length} breweries in ${searchTerm}`);
                setBreweries(breweries);
            });
        } else {
            // If search is empty, default to New York
            fetchBreweriesByCity("New York").then(setBreweries);
        }
    }, [searchTerm]);
    
    return(
        <>
        <Card brewery={selectedBrewery} />
        <ul className="bg-[#FFF2C2] flex flex-col items-center p-4 rounded-lg shadow-lg max-w-md w-full text-[#7C2600]">
            {breweries.map(brewery => (
                <li 
                    key={brewery.id} 
                    className="py-2 text-center cursor-pointer hover:bg-[#7C2600]/30 rounded-lg transition-colors duration-200" 
                    onClick={() => setSelectedBrewery(brewery)}
                >
                    {brewery.name && brewery.city && brewery.state ? ` - ${brewery.name}, ${brewery.city}, ${brewery.state}` : brewery.name}
                </li>
            ))}
        </ul>
        </>
    )
}

export default List;
