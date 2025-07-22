
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


const Info = () => {
    const { id } = useParams();
    const [brewery, setBrewery] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch brewery info");
                return res.json();
            })
            .then(data => {
                setBrewery(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    return (
        <div className="flex h-screen bg-[#FFFBEA] text-[#7C2600]">
            {/* Sidebar NavBar mimic, no search */}
            <div className="flex flex-col bg-[#BD4B00]/35 h-screen w-64 text-[#7C2600]">
                <ul>
                    <div className="font-bold text-xl mb-4 mt-4">
                        <h1>Pub Finder</h1>
                    </div>
                    <li className="cursor-pointer hover:bg-[#7C2600]/20 p-2 rounded">
                        <Link to="/" className="block w-full h-full">Dashboard</Link>
                    </li>
                    <li>
                        <Link 
                            to="/about"
                            className="cursor-pointer hover:bg-[#7C2600]/20 p-2 rounded block"
                        >
                            About
                        </Link>
                    </li>
                </ul>
            </div>
            {/* Main content */}
            <div className="flex-1 flex flex-col items-center justify-center">
                <div className="border border-[#7C2600] p-6 rounded-lg shadow-lg bg-white min-w-[300px] max-w-md">
                    <h2 className="text-xl font-bold mb-2">Brewery Information</h2>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-600">{error}</p>}
                    {brewery && (
                        <>
                            <p className="mb-1"><span className="font-semibold">Name:</span> {brewery.name}</p>
                            <p className="mb-1"><span className="font-semibold">Type:</span> {brewery.brewery_type}</p>
                            <p className="mb-1"><span className="font-semibold">Address:</span> {brewery.street}, {brewery.city}, {brewery.state} {brewery.postal_code}</p>
                            {brewery.phone && <p className="mb-1"><span className="font-semibold">Phone:</span> {brewery.phone}</p>}
                            {brewery.website_url && (
                                <p className="mb-1"><span className="font-semibold">Website:</span> <a href={brewery.website_url} className="text-blue-700 underline" target="_blank" rel="noopener noreferrer">{brewery.website_url}</a></p>
                            )}
                        </>
                    )}
                </div>
                <div className="border border-[#7C2600] m-4 rounded-lg hover:shadow-lg p-2">
                    <Link to="/" className="mt-4 text-sm">Back to Home</Link>
                </div>
            </div>
        </div>
    );
}

export default Info;