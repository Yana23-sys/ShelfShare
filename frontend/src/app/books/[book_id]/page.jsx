"use client";

import BookPage from "../../Components/Bookpage";
import { useState, useEffect } from "react";
import { getBookById } from "../../api/books";
import { useParams } from "next/navigation";
import { createSwap } from "../../api/swaps";

const IndividualBookPage = () => {

  const { book_id } = useParams();
  const [book, setBook] = useState({genre: {}, user: {}});

  useEffect(() => {
    getBookById(book_id)
      .then((book) => setBook(book))
  }, [book_id]);

  return (
    <section>
      <BookPage book={book} onSwap={createSwap} />
    </section>
  );
};

export default IndividualBookPage;