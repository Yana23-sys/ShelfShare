"use client";

import BookPage from "../Components/Bookpage";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getBookById } from '../../../api';

const bookpage = () => {

    const router = useRouter()
    const {book_id} = router.query
    const [book, setBook] = useState({})

    console.log(book_id)

    useEffect(() => {
        if (book_id) {
            const fetchedBook = getBookById(book_id)
            if (fetchedBook) {
                setBook(fetchedBook)
            }
        }
    }, [book_id])

    if (!book) {
        return (
            <p>Book not found</p>
        )
    }


    return (
        <BookPage book={ book } /> //key?
    );
};

export default bookpage;