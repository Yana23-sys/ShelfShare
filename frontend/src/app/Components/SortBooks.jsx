import { useState, useEffect } from "react";
import { fetchBooks } from "../../utils/api";

const SortBooks = () => {
  const [books, setBooks] = useState([]);
  const [sortBy, setSortBy] = useState("author"); // Default sort by author

  useEffect(() => {
    const fetchSortedBooks = async () => {
      const sortedBooks = await fetchBooks(sortBy);
      setBooks(sortedBooks);
    };

    fetchSortedBooks();
  }, [sortBy]);

  return (
    <div>
      <h1>Sort Books by {sortBy}</h1>
      <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
        <option value="author">Author</option>
        <option value="genre">Genre</option>
        <option value="location">Location</option>
      </select>
      <ul>
        {books.map((book, index) => (
          <li key={index}>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Location: {book.user.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortBooks;
