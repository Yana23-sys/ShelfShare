import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, Typography, Divider, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Example book data
const exampleBooks = [
  { id: 1, title: 'Book 1', author: 'Author 1', cover: '/path/to/cover1.jpg', condition: 'Good' },
  { id: 2, title: 'Book 2', author: 'Author 2', cover: '/path/to/cover2.jpg', condition: 'New' },
  // Add more book data as needed
];

const SwapBookModal = ({ open, onClose, book, onConfirm }) => {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleSelectBook = (book) => {
    setSelectedBook(book);
  };

  const handleConfirm = () => {
    onConfirm(selectedBook);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Choose a Book to Swap
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6">You want to swap for:</Typography>
        <List>
          <ListItem>
            <img src={book.cover_image_url} alt={book.title} style={{ width: 50, height: 75, objectFit: 'contain', marginRight: 10 }} />
            <ListItemText primary={book.title} secondary={book.author} />
          </ListItem>
        </List>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">Select a Book to Offer in Exchange:</Typography>

        {/* {selectedBook && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Swap Summary:</Typography>
            <Typography>Offering: {selectedBook.title} by {selectedBook.author}</Typography>
            <Typography>In exchange for: {book.title} by {bookToSwap.author}</Typography>
          </>
        )} */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleConfirm}
          disabled={!selectedBook}
        >
          Confirm Swap
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SwapBookModal;
