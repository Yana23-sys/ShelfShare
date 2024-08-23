"use client";

import BookPage from "../../Components/Bookpage";
import { useState, useEffect } from "react";
import { getBookById } from "../../../../api";
import { useParams } from "next/navigation";

const IndividualBookPage = () => {

  const { book_id } = useParams();
  const [book, setBook] = useState({});

  useEffect(() => {

    const id = Number(book_id);
    if (id) {
      const fetchedBook = getBookById(id);

      if (fetchedBook) {
        setBook(fetchedBook);

      } else {
        console.error("Book not found");
      }
    }
  }, [book_id]);

  return (
    <section>
      <BookPage book={book} />
    </section>
  );
};

export default IndividualBookPage;