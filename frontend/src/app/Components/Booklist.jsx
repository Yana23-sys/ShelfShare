"use client";
import BookCard from "./Bookcard";
import { Grid, Pagination, Stack } from "@mui/material";
import SortFilter from "./SortFilter";
import styles from "../Styles/Booklist.module.css";

const Booklist = ({ books, page, totalPages, onPageChange, onBooksChange }) => {

  return (
    <div className={styles.container}>
      <SortFilter onBooksChange={onBooksChange} />

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

      <Stack spacing={2} alignItems="center">
        <Pagination
          count={totalPages}
          page={page}
          onChange={(event, value) => onPageChange(value)}
          showFirstButton
          showLastButton
          siblingCount={1} // Number of siblings to show before/after the current page
          boundaryCount={1} // Number of boundary pages (first and last) to show
          color="primary"
          size="large"
        />
      </Stack>
    </div>
  );
};

export default Booklist;
