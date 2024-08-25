import Link from 'next/link';  
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';  
import styles from '../Styles/Bookcard.module.css';  
  
const BookCard = ({ book }) => {  
  return (  
      <Card className={styles.bookCard} component={Link} href={`/books/${book._id}`} passHref>  
        <div className={styles.bookCardImageContainer}>  
          <CardMedia  
            component="img"  
            alt={book.title}  
            image={book.cover_image_url}  
            title={book.title}  
            className={styles.bookImage}  
          />  
        </div>  
        <CardContent className={styles.bookContent}>  
          <Typography className={styles.bookTitle} variant="h6" component="div">  
            {book.title}  
          </Typography>  
          <Typography className={styles.bookAuthor} variant="body2" color="text.secondary">  
            {book.author} ({book.publication_year})
          </Typography>  
          <Typography className={styles.bookGenre} variant="body2" color="text.secondary">  
            {book.genre.name}
          </Typography>  
          <Typography className={styles.bookOwner} variant="body2" color="text.secondary">  
            @{book.user.username} ({book.user.location})
          </Typography>  
          <Button variant="contained" color="primary" className={styles.bookSwapButton}>  
            Swap  
          </Button>  
        </CardContent>  
      </Card>  
  );  
};  
  
export default BookCard;
