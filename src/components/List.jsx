import React, { useState, useEffect } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, Legend,
} from 'recharts';

const List = ({ searchTerm }) => {
  const [breweries, setBreweries] = useState([]);
  const [selectedBrewery, setSelectedBrewery] = useState(null);

  // Fetch logic (unchanged)
  const fetchBreweriesByCity = async (city) => {
    const cityParam = city.replace(/\s+/g, "_").toLowerCase();
    const url = `https://api.openbrewerydb.org/v1/breweries?by_city=${cityParam}&per_page=10`;
    try {
      const res = await fetch(url);
      return await res.json();
    } catch (error) {
      console.error("Error fetching breweries by city:", error);
      return [];
    }
  };

  const fetchBreweriesByType = async (type) => {
    const url = `https://api.openbrewerydb.org/v1/breweries?by_type=${type}&per_page=20`;
    try {
      const res = await fetch(url);
      return await res.json();
    } catch (error) {
      console.error("Error fetching breweries by type:", error);
      return [];
    }
  };

  const fetchBreweriesByCityAndType = async (city, type) => {
    const cityParam = city.replace(/\s+/g, "_").toLowerCase();
    const url = `https://api.openbrewerydb.org/v1/breweries?by_city=${cityParam}&by_type=${type}&per_page=20`;
    try {
      const res = await fetch(url);
      return await res.json();
    } catch (error) {
      console.error("Error fetching breweries by city and type:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchBreweriesByCity("New York").then(setBreweries);
  }, []);

  useEffect(() => {
    if (searchTerm && searchTerm.trim()) {
      if (searchTerm.includes("|type:")) {
        const [city, typeWithPrefix] = searchTerm.split("|");
        const breweryType = typeWithPrefix.replace("type:", "");
        fetchBreweriesByCityAndType(city, breweryType).then(setBreweries);
      } else if (searchTerm.startsWith("type:")) {
        const breweryType = searchTerm.replace("type:", "");
        fetchBreweriesByType(breweryType).then(setBreweries);
      } else {
        fetchBreweriesByCity(searchTerm).then(setBreweries);
      }
    } else {
      fetchBreweriesByCity("New York").then(setBreweries);
    }
  }, [searchTerm]);

  // Chart Helpers
  const getBreweryTypeData = () => {
    const count = {};
    breweries.forEach(b => {
      const type = b.brewery_type || "Unknown";
      count[type] = (count[type] || 0) + 1;
    });
    return Object.entries(count).map(([name, value]) => ({ name, value }));
  };

  const getBreweryStateData = () => {
    const count = {};
    breweries.forEach(b => {
      const state = b.state || "Unknown";
      count[state] = (count[state] || 0) + 1;
    });
    return Object.entries(count).map(([state, count]) => ({ state, count }));
  };

  const COLORS = ['#BD4B00', '#7C2600', '#FF9800', '#FBC02D', '#D84315', '#5D4037'];

  return (
    <>
      <Card brewery={selectedBrewery} />
      <div className="flex flex-row w-full justify-center items-start gap-6 mt-4">
        {/* Brewery List */}
        <div className="bg-[#FFF2C2] flex flex-col items-center p-4 rounded-lg shadow-lg max-w-md w-full text-[#7C2600]">
          <div className="w-full mb-3 pb-2 border-b-2 border-[#7C2600]/20">
            <h3 className="text-lg font-semibold text-center mb-1">
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
                {brewery.name && brewery.city && brewery.state
                  ? ` - ${brewery.name}, ${brewery.city}, ${brewery.state}`
                  : brewery.name}
                <div className="hover:underline text-m text-[#7C2600]">
                  <p><Link to={`info/${brewery.id}`}>Link</Link></p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Charts Column */}
        <div className="flex flex-col gap-6 w-full max-w-xl">
          {/* CHART 1: Brewery Types */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-center font-semibold mb-2 text-[#7C2600]">Brewery Types</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={getBreweryTypeData()}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {getBreweryTypeData().map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* CHART 2: Breweries by State  */}
          <div className="bg-white rounded-lg shadow-md p-4 mt-auto">
            <h3 className="text-center font-semibold mb-2 text-[#7C2600]">Breweries per State</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={getBreweryStateData()}>
                <XAxis dataKey="state" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#BD4B00" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
