import { useState, useEffect } from "react";
import BookCard from "./Bookcard";
import { Grid, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { fetchSortedBooks } from "../api/books";
import { getAllLocations } from "../api/users";

const Booklist = ({ initialBooks = [] }) => {
  const [books, setBooks] = useState(initialBooks);
  const [sortBy, setSortBy] = useState("author"); // Default sort by author
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    fetchSortedBooks({ sort_by: sortBy, location: selectedLocation })
      .then((sortedBooks) => {
        if (Array.isArray(sortedBooks)) {
          setBooks(sortedBooks);
        } else {
          console.error("Unexpected response format:", sortedBooks);
          setBooks([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching sorted books:", error);
        setBooks([]);
      });
  }, [sortBy, selectedLocation]);

  useEffect(() => {
    getAllLocations()
      .then((locations) => {
        setLocations(locations);
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
      });
  }, []);

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
    <div style={{ padding: "20px" }}>
      <FormControl fullWidth>
        <InputLabel>Sort By</InputLabel>
        <Select value={sortBy} onChange={handleSortChange}>
          <MenuItem value="author">Author</MenuItem>
          <MenuItem value="genre">Genre</MenuItem>
          <MenuItem value="location">Location</MenuItem>
        </Select>
      </FormControl>

      {/* Show location dropdown if sorting by location */}
      {sortBy === "location" && (
        <FormControl fullWidth style={{ marginTop: "20px" }}>
          <InputLabel>Location</InputLabel>
          <Select value={selectedLocation} onChange={handleLocationChange}>
            <MenuItem value="">All Locations</MenuItem>
            {locations.map((loc, index) => (
              <MenuItem key={index} value={loc}>
                {loc}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <Grid container spacing={4} style={{ marginTop: "20px" }}>
        {books.length > 0 ? (
          books.map((book, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <BookCard book={book} />
            </Grid>
          ))
        ) : (
          <p>No books available</p>
        )}
      </Grid>
    </div>
  );
};

export default Booklist;
