export const fetchBooks = async (sortBy) => {
  // Hardcoded data for testing
  const books = [
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Fiction",
      user: { location: "New York" },
    },
    {
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian",
      user: { location: "London" },
    },
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      genre: "Romance",
      user: { location: "Paris" },
    },
    // Add more books as needed
  ];

  // Sort books based on sortBy parameter
  const sortedBooks = books.sort((a, b) => {
    if (sortBy === "author") {
      return a.author.localeCompare(b.author);
    } else if (sortBy === "genre") {
      return a.genre.localeCompare(b.genre);
    } else if (sortBy === "location") {
      return a.user.location.localeCompare(b.user.location);
    }
    return 0;
  });

  return sortedBooks;
};
