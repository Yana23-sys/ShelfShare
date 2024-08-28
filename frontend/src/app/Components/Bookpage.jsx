import styles from '../Styles/Bookpage.module.css';
import { Container, Grid, Typography, Button, Box, Avatar } from '@mui/material';
import SwapModal from './SwapModal';
import { UserContext } from "../Contexts/UserContext";
import { useContext, useState } from 'react';


const BookPage = ({book, onSwap}) => {
  const { user, setUser } = useContext(UserContext);
  const [swapModalOpen, setSwapModalOpen] = useState(false);

  const handleSwapModalOpen = () => {
    setSwapModalOpen(true);
  };

  const handleSwapConfirm = (swap) => {
    // TODO: Send POST request to BE to creare swap
    console.log(swap)
    onSwap(swap)
  }

return (  
    <Container className={styles.bookPage}>  
          <Grid container spacing={4}>  
    <Grid item xs={12} md={4}>  
      <img src={book.cover_image_url} alt={book.title} className={styles.bookImage} />  

      <Box display="flex" alignItems="center" className={styles.ownerSection}>  
        <Avatar alt={book.user.username} src={book.user.avatar} className={styles.ownerAvatar} />
         
        <Typography variant="body2" className={styles.ownerName}>  
          {book.user.username}
        </Typography>  
        
        {user._id !== book.user._id && ( 
          <>
            <Button variant="contained" color="primary" className={styles.messageButton}>  
              Message  
            </Button>  

            <Button 
              variant="contained" 
              color="primary" 
              className={styles.swapButton} 
              onClick={handleSwapModalOpen}
            >
              Swap
            </Button>
          </>
        )}
      </Box>  

      {user._id && user._id !== book.user._id && (
        <SwapModal 
          open={swapModalOpen} 
          onClose={() => setSwapModalOpen(false)} 
          book={book} 
          user={user} 
          onConfirm={handleSwapConfirm}
        />
      )}
    </Grid>  

        <Grid item xs={12} md={8}>  
            <Typography variant="h4" className={styles.bookTitle}>  
                {book.title}  
            </Typography>   
            <Typography variant="body2" className={styles.bookAuthor}>  
                by {book.author} ({book.publication_year})  
            </Typography>  
            <Typography variant="body2" className={styles.bookDescription}>  
                {book.description}  
            </Typography> 

            <Typography variant="body2" className={styles.bookGenre}>
                Genre: {book.genre.name}
            </Typography>
            <Typography variant="body2" className={styles.userLocation}>
                Location: {book.user.location}
            </Typography>

        </Grid>  
    </Grid>  
    </Container>  
    );  
};  
    
export default BookPage;