"use client";
import { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { fetchSortedBooks } from "../api/books";
import { getAllLocations } from "../api/users";
import styles from "../Styles/Booklist.module.css";

const SortFilter = ({ onBooksChange }) => {
  const [sortBy, setSortBy] = useState("author"); // Default sort by author
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    getAllLocations()
      .then((locations) => {
        if (Array.isArray(locations)) {
          setLocations(locations);
        } else {
          console.error("Unexpected response format:", locations);
        }
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
      });
  }, []);

  useEffect(() => {
    const params = { sort_by: sortBy };
    if (sortBy === "location" && selectedLocation) {
      params.location = selectedLocation;
    }

    fetchSortedBooks(params)
      .then((sortedBooks) => {
        if (Array.isArray(sortedBooks)) {
          onBooksChange(sortedBooks);
        } else {
          console.error("Unexpected response format:", sortedBooks);
          onBooksChange([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching sorted books:", error);
        onBooksChange([]);
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
    <div className={styles.sortFilterContainer}>
      <Typography variant="h6" className={styles.sortLabel}>
        Sort By
      </Typography>
      <FormControl className={styles.formControl}>
        <InputLabel>Sort By</InputLabel>
        <Select
          className={styles.select}
          value={sortBy}
          onChange={handleSortChange}
        >
          <MenuItem value="author">Author</MenuItem>
          <MenuItem value="genre">Genre</MenuItem>
          <MenuItem value="location">Location</MenuItem>
        </Select>
      </FormControl>

      {sortBy === "location" && (
        <FormControl className={styles.formControl}>
          <InputLabel>Location</InputLabel>
          <Select
            className={styles.select}
            value={selectedLocation}
            onChange={handleLocationChange}
          >
            <MenuItem value="">All Locations</MenuItem>
            {Array.isArray(locations) && locations.length > 0 ? (
              locations.map((loc, index) => (
                <MenuItem key={index} value={loc}>
                  {loc}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">No Locations Available</MenuItem>
            )}
          </Select>
        </FormControl>
      )}
    </div>
  );
};

export default SortFilter;
