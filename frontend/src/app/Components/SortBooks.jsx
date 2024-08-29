"use client";
import { useState, useEffect } from "react";
import SortFilter from "./SortFilter";
import styles from "../Styles/Booklist.module.css";

const SortBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initial fetch or other side effects can be handled here if needed
    setLoading(false);
  }, []);

  const handleBooksChange = (newBooks) => {
    setBooks(newBooks);
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h1>Sort Books</h1>
      <div className={styles.sortControls}>
        <div className={styles.sortBy}>
          <span>Sort By:</span>
          <SortFilter onBooksChange={handleBooksChange} />
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading books: {error.message}</p>
      ) : (
        <ul>
          {books.length > 0 ? (
            books.map((book, index) => (
              <li key={index} className={styles.bookItem}>
                <h2>{book.title}</h2>
                <p>Author: {book.author}</p>
                <p>
                  Genre:{" "}
                  {typeof book.genre === "string"
                    ? book.genre
                    : book.genre.name}
                </p>
                <p>Location: {book.user.location}</p>
              </li>
            ))
          ) : (
            <p>No books available</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default SortBooks;
