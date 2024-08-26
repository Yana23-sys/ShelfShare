import styles from '../Styles/Bookpage.module.css';
import { Container, Grid, Typography, Button, Box, Avatar } from '@mui/material';
import SwapModal from './SwapModal';
import { UserContext } from "../Contexts/UserContext";
import { useContext, useState } from 'react';


const BookPage = ({book}) => {
  const { user, setUser } = useContext(UserContext);
  const [swapModalOpen, setSwapModalOpen] = useState(false);

  const handleSwapModalOpen = () => {
    setSwapModalOpen(true);
  };

  const handleSwapConfirm = (swap) => {
    // TODO: Send POST request to BE to creare swap
    console.log(swap)
  }

return (  
    <Container className={styles.bookPage}>  
        <Grid container spacing={4}>  
            <Grid item xs={12} md={4}>  
                <img src={book.cover_image_url} alt={book.title} className={styles.bookImage} />  
                {user._id && user._id !== book.user._id && (<>
                    <Button variant='contained' color='primary' onClick={handleSwapModalOpen}>Swap</Button>
                    <SwapModal 
                        open={swapModalOpen} 
                        onClose={() => setSwapModalOpen(false)} 
                        book={book} 
                        user={user} 
                        onConfirm={handleSwapConfirm}
                    />
                </>)}

                <Box display="flex" alignItems="center" className={styles.ownerSection}>  
                <Avatar alt={book.user.username} src={book.user.avatar} className={styles.ownerAvatar}/>
                 
                <Typography variant="body2" className={styles.ownerName}>  
                    {book.user.username}
                </Typography>  
                {user._id !== book.user._id &&  
                    <Button variant="outlined" color="primary" className={styles.messageButton}>  
                        Message  
                    </Button> }
                
                </Box>  
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
                <Typography>
                    TODO: refactor this page to display more info, such as: book condition, location, etc.
                </Typography> 
            </Grid>  
        </Grid>  
    </Container>  
    );  
};  
    
export default BookPage;