import React from "react";
import { useState, useEffect } from "react";
import Card from "./Card";
//add event for summary of highest rated spot
//reach out about stretch 
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

    // Fetch breweries by type using API filtering
    const fetchBreweriesByType = async (type) => {
        const url = `https://api.openbrewerydb.org/v1/breweries?by_type=${type}&per_page=20`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(`Found ${data.length} ${type} breweries`);
            return data;
        } catch (error) {
            console.error("Error fetching breweries by type:", error);
            return [];
        }
    }

    // Fetch breweries by city and type combined
    const fetchBreweriesByCityAndType = async (city, type) => {
        const cityParam = city.replace(/\s+/g, "_").toLowerCase();
        const url = `https://api.openbrewerydb.org/v1/breweries?by_city=${cityParam}&by_type=${type}&per_page=20`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(`Found ${data.length} ${type} breweries in ${city}`);
            return data;
        } catch (error) {
            console.error("Error fetching breweries by city and type:", error);
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
            // Check if it's a combined filter (city|type:brewerytype)
            if (searchTerm.includes("|type:")) {
                const [city, typeWithPrefix] = searchTerm.split("|");
                const breweryType = typeWithPrefix.replace("type:", "");
                console.log(`Filtering by city: ${city} and type: ${breweryType}`);
                fetchBreweriesByCityAndType(city, breweryType).then(breweries => {
                    console.log(`Found ${breweries.length} ${breweryType} breweries in ${city}`);
                    setBreweries(breweries);
                });
            } else if (searchTerm.startsWith("type:")) {
                // Type filter only
                const breweryType = searchTerm.replace("type:", "");
                console.log(`Filtering by brewery type: ${breweryType}`);
                fetchBreweriesByType(breweryType).then(breweries => {
                    console.log(`Found ${breweries.length} ${breweryType} breweries`);
                    setBreweries(breweries);
                });
            } else {
                // City search only
                console.log(`Searching for breweries in: ${searchTerm}`);
                fetchBreweriesByCity(searchTerm).then(breweries => {
                    console.log(`Found ${breweries.length} breweries in ${searchTerm}`);
                    setBreweries(breweries);
                });
            }
        } else {
            // If search is empty, default to New York
            fetchBreweriesByCity("New York").then(setBreweries);
        }
    }, [searchTerm]);
    
    return(
        <>
        <Card brewery={selectedBrewery} />
        <div className="bg-[#FFF2C2] flex flex-col items-center p-4 rounded-lg shadow-lg max-w-md w-full text-[#7C2600]">
            {/* Header describing the list format */}
            <div className="w-full mb-3 pb-2 border-b-2 border-[#7C2600]/20">
                <h3 className="text-lg font-semibold text-center text-[#7C2600] mb-1">
                    Brewery Directory
                </h3>
                <p className="text-sm text-center text-[#7C2600]/70">
                    Name • City • State
                </p>
            </div>
            
            <ul className="w-full">
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
        </div>
        </>
    )
}

export default List;
