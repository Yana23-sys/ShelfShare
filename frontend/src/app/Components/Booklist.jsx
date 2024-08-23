"use client";

import {getAllBooks} from '../api/books';
import BookCard from './Bookcard';
import { useState, useEffect } from 'react'

const BookList = () => {
    const [books, setBooks] = useState([])

    useEffect(() => {
        getAllBooks()
            .then(fetchedBooks => {
                console.log(fetchedBooks)
                setBooks(fetchedBooks)
            })
    }, [])

    return (
        <section>
        {
            books.map((book) => {
                return (
                    <BookCard book={book} key={book._id}/>
                );
            })
        }
        </section>
    );
};
export default BookList;