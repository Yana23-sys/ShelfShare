import styles from '../Styles/Bookpage.module.css';
import { Container, Grid, Typography, Button, Paper, Box } from '@mui/material';

const BookPage = ({book}) => {

return (  
    <Container className={styles.bookPage}>  
        <Grid container spacing={4}>  
            <Grid item xs={12} md={4}>  
                <img src={book.cover_image_url} alt={book.title} className={styles.bookImage} />  
                <Button variant="contained" color="primary" className={styles.swapButton}>  
                Swap 
                </Button>
                <Typography variant="body2" className={styles.messageOwner}>  
                Message the owner  
                </Typography>  
                <Box display="flex" alignItems="center" className={styles.ownerSection}>  
                <div className={styles.ownerImage}>

                </div>  
                <Typography variant="body2" className={styles.ownerName}>  
                    {book.user.username}
                </Typography>  
                <Button variant="outlined" color="primary" className={styles.messageButton}>  
                    Message  
                </Button>  
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