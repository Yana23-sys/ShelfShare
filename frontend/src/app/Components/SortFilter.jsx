"use client";
import { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { fetchSortedBooks, getAllBooks } from "../api/books";
import { getAllLocations } from "../api/users";
import { getAllGenres } from "../api/genres";
import styles from "../Styles/Booklist.module.css";

const SortFilter = ({ onBooksChange }) => {
  const [sortBy, setSortBy] = useState(""); // Initialize with empty string for "All"
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [books, setBooks] = useState([]); // State for storing books

  useEffect(() => {
    getAllBooks()
      .then((books) => {
        if (Array.isArray(books)) {
          setBooks(books);
          const uniqueAuthors = [...new Set(books.map((book) => book.author))];
          setAuthors(uniqueAuthors);
        } else {
          console.error("Unexpected response format for Books:", books);
        }
      })
      .catch((error) => {
        console.error("Error fetching Books:", error);
      });

    // Fetch locations
    getAllLocations()
      .then((locations) => {
        if (Array.isArray(locations)) {
          setLocations(locations);
        } else {
          console.error("Unexpected response format for locations:", locations);
        }
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
      });

    // Fetch genres
    getAllGenres()
      .then((response) => {
        if (response && Array.isArray(response.genres)) {
          setGenres(response.genres.map((genre) => genre.name)); // Assuming genre object has a `name` property
        } else {
          console.error("Unexpected response format for genres:", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching genres:", error);
      });
  }, []);

  useEffect(() => {
    const params = { sort_by: sortBy };

    if (sortBy === "location" && selectedLocation) {
      params.location = selectedLocation;
    } else if (sortBy === "author" && selectedAuthor) {
      params.author = selectedAuthor;
    } else if (sortBy === "genre" && selectedGenre) {
      params.genre = selectedGenre;
    }

    if (sortBy === "") {
      // No sorting or filtering applied, show all books
      onBooksChange(books);
    } else {
      fetchSortedBooks(params)
        .then((sortedBooks) => {
          if (Array.isArray(sortedBooks)) {
            onBooksChange(sortedBooks);
          } else {
            console.error(
              "Unexpected response format for sorted books:",
              sortedBooks
            );
            onBooksChange([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching sorted books:", error);
          onBooksChange([]);
        });
    }
  }, [sortBy, selectedLocation, selectedAuthor, selectedGenre, books]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setSelectedLocation("");
    setSelectedAuthor("");
    setSelectedGenre("");
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setSelectedAuthor(event.target.value);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  return (
    <div className={styles.sortFilterContainer}>
      <FormControl className={styles.formControl}>
        <InputLabel>Sort By</InputLabel>
        <Select
          className={styles.select}
          value={sortBy}
          onChange={handleSortChange}
        >
          <MenuItem value="">All</MenuItem>
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
            {locations.map((loc, index) => (
              <MenuItem key={index} value={loc}>
                {loc}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {sortBy === "author" && (
        <FormControl className={styles.formControl}>
          <InputLabel>Author</InputLabel>
          <Select
            className={styles.select}
            value={selectedAuthor}
            onChange={handleAuthorChange}
          >
            <MenuItem value="">All Authors</MenuItem>
            {authors.map((author, index) => (
              <MenuItem key={index} value={author}>
                {author}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {sortBy === "genre" && (
        <FormControl className={styles.formControl}>
          <InputLabel>Genre</InputLabel>
          <Select
            className={styles.select}
            value={selectedGenre}
            onChange={handleGenreChange}
          >
            <MenuItem value="">All Genres</MenuItem>
            {genres.map((genre, index) => (
              <MenuItem key={index} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
};

export default SortFilter;
