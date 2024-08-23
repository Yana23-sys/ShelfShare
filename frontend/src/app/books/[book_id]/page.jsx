"use client";

import BookPage from "../../Components/Bookpage";
import { getBookById } from '../../../api';
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const IndividualBookPage = () => {

  const { book_id } = useParams();
  const [book, setBook] = useState({});

  useEffect(() => {

    const id = Number(book_id);
    console.log(id, typeof id)
    
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