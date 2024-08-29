"use client";

import BookList from "../Components/Booklist";
import { useState, useEffect } from 'react'
import {getAllBooks} from '../api/books';

const BooksPage = () => {
  const [books, setBooks] = useState([])
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8); // Default limit
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
      getAllBooks({ page, limit })
        .then(response => {
          console.log(response)
          setBooks(response.books)
          setTotalPages(response.totalPages)
        })
        .catch(error => {
          console.error("Error fetching books:", error)
        })
  }, [page])

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <section>
      <BookList 
        books={books} 
        page={page} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
        onBooksChange={setBooks}
      />
    </section>
  );
};

export default BooksPage;