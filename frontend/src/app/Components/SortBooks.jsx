// components/SortBooks.jsx
"use client";
import { useState, useEffect } from "react";
import SortFilter from "./SortFilter";
import styles from "../Styles/Booklist.module.css";

const SortBooks = () => {
  const [books, setBooks] = useState([]);

  return (
    <div className={styles.container}>
      <h1>Sort Books</h1>
      <SortFilter onBooksChange={setBooks} />

      <ul>
        {books.length > 0 ? (
          books.map((book, index) => (
            <li key={index} className={styles.bookItem}>
              <h2>{book.title}</h2>
              <p>Author: {book.author}</p>
              <p>Genre: {book.genre.name}</p>
              <p>Location: {book.user.location}</p>
            </li>
          ))
        ) : (
          <p>No books available</p>
        )}
      </ul>
    </div>
  );
};

export default SortBooks;
