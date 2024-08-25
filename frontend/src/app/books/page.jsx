"use client";

import BookList from "../Components/Booklist";
import { useState, useEffect } from 'react'
import {getAllBooks} from '../api/books';

const IndividualBookPage = () => {
  const [books, setBooks] = useState([])

  useEffect(() => {
      getAllBooks()
          .then(fetchedBooks => {
              setBooks(fetchedBooks)
          })
  }, [])

  return (
    <section>
      <BookList books={books}/>
    </section>
  );
};

export default IndividualBookPage;