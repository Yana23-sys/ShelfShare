"use client";
import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Alert,
} from "@mui/material";

import { UserContext } from "../Contexts/UserContext";
import { useContext } from "react";
import { postBook } from "../api/post-book";

const genres = [
  "Fiction",
  "Non-Fiction",
  "Drama",
  "Fantasy/Magic",
  "Historic",
  "Romance",
  "Horror",
];

const PostBook = () => {
  const { user } = useContext(UserContext);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    publishedYear: "",
    imageUrl: "",
    postedDate: "",
    user: user.username || "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenreChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      genre: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!user) {
      setError("You must be logged in to post a book.");
      return;
    }

    const bookData = {
      title: formData.title,
      author: formData.author,
      genre: formData.genre,
      publication_year: formData.publishedYear,
      description: formData.description,
      cover_image_url: formData.imageUrl,
      posted_date: new Date(),
      username: user.username,
    };

    console.log("Book data:", bookData);

    postBook(bookData)
      .then((data) => {
        console.log("Book posted successfully:", data);

        setFormData({
          title: "",
          author: "",
          genre: "",
          description: "",
          publishedYear: "",
          imageUrl: "",
          postedDate: "",
          user: user.username || "",
        });

        setError("");
      })
      .catch((err) => {
        setError("There was an error posting the book. Please try again.");
      });
  };

  return (
    <Container>
      <Box>
        <form onSubmit={handleSubmit}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Year Published"
            name="publishedYear"
            value={formData.publishedYear}
            onChange={handleChange}
            margin="normal"
            fullWidth
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Genre</InputLabel>
            <Select
              name="genre"
              value={formData.genre}
              onChange={handleGenreChange}
              label="Genre"
            >
              {genres.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            required
          />
          <TextField
            label="Image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2, mb: 2, backgroundColor: "#595959" }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default PostBook;

//Post book
