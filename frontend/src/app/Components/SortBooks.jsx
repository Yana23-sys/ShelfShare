"use client";
import { useState, useEffect } from "react";
import { fetchSortedBooks } from "../api/books";
import { getAllLocations } from "../api/users";

const SortBooks = () => {
  const [books, setBooks] = useState([]);
  const [sortBy, setSortBy] = useState("author"); // Default sort by author
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    getAllLocations()
      .then((locations) => {
        setLocations(locations);
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
      });
  }, []);

  useEffect(() => {
    const params = {
      sort_by: sortBy,
    };

    if (sortBy === "location" && selectedLocation) {
      params.location = selectedLocation;
    }

    fetchSortedBooks(params)
      .then((sortedBooks) => {
        setBooks(sortedBooks);
      })
      .catch((error) => {
        console.error("Error fetching sorted books:", error);
      });
  }, [sortBy, selectedLocation]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    if (event.target.value !== "location") {
      setSelectedLocation(""); // Reset location filter when sorting by something other than location
    }
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  return (
    <div>
      <h1>Sort Books by {sortBy}</h1>
      <select onChange={handleSortChange} value={sortBy}>
        <option value="author">Author</option>
        <option value="genre">Genre</option>
        <option value="location">Location</option>
      </select>

      {/* Show location dropdown if sorting by location */}
      {sortBy === "location" && (
        <select onChange={handleLocationChange} value={selectedLocation}>
          <option value="">All Locations</option>
          {locations.map((loc, index) => (
            <option key={index} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      )}

      <ul>
        {books.map((book, index) => (
          <li key={index}>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre.name}</p>
            <p>Location: {book.user.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortBooks;
