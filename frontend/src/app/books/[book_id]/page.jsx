"use client";

import BookPage from "../../Components/Bookpage";
import { useState, useEffect } from "react";
import { getBookById } from "../../api/books";
import { useParams } from "next/navigation";

const IndividualBookPage = () => {

  const { book_id } = useParams();
  const [book, setBook] = useState({genre: {}, user: {}});

  useEffect(() => {
    getBookById(book_id)
      .then((book) => setBook(book))
  }, [book_id]);

  return (
    <section>
      <BookPage book={book} />
    </section>
  );
};

export default IndividualBookPage;