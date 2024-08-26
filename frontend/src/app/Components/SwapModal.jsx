import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, Typography, Divider, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const SwapBookModal = ({ open, onClose, book, user, onConfirm }) => {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleSelectBook = (book) => {
    setSelectedBook(book);
  };

  const handleConfirm = () => {
    const swap = {
        sender: user._id,
        receiver: selectedBook.user._id,
        senderBook: book._id,
        receiverBook: selectedBook._id
    }
    setSelectedBook(null);
    onConfirm(swap);
    onClose();
  };

  const handleClose = () => {
    setSelectedBook(null);
    onClose();
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Choose a Book to Swap
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
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

        <div style={{ maxHeight: 200, overflowY: 'auto' }}>
            <List>
            {user.books.map((book) => (
                <ListItem
                key={book._id}
                button
                selected={selectedBook?._id === book._id}
                onClick={() => handleSelectBook(book)}
                >
                <img src={book.cover_image_url} alt={book.title} style={{ width: 50, height: 75, objectFit: 'contain', marginRight: 16 }} />
                <ListItemText primary={book.title} secondary={`${book.author} - Used/Very Good`} />
                </ListItem>
            ))}
            </List>
        </div>

        {selectedBook && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Swap Summary:</Typography>
            <Typography>Offering: {selectedBook.title} by {selectedBook.author}</Typography>
            <Typography>In exchange for: {book.title} by {book.author}</Typography>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
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
