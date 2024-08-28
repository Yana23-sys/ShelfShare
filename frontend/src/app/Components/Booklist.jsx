"use client";
import { useState } from "react";
import BookCard from "./Bookcard";
import { Grid } from "@mui/material";
import SortFilter from "./SortFilter";
import styles from "../Styles/Booklist.module.css";

const Booklist = ({ initialBooks = [] }) => {
  const [books, setBooks] = useState(initialBooks);

  return (
    <div className={styles.container}>
      <SortFilter onBooksChange={setBooks} />

      <Grid container spacing={4} className={styles.gridContainer}>
        {books.length > 0 ? (
          books.map((book, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <BookCard book={book} />
            </Grid>
          ))
        ) : (
          <p className={styles.noBooksMessage}>No books available</p>
        )}
      </Grid>
    </div>
  );
};

export default Booklist;
