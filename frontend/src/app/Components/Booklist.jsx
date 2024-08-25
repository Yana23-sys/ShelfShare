import BookCard from './Bookcard';
import { Grid } from '@mui/material';  
  
const Booklist = ({ books }) => {  
  return (  
    <Grid container spacing={4} style={{ padding: "20px" }}>  
      {books.map((book, index) => (  
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>  
          <BookCard book={book} />  
        </Grid>  
      ))}  
    </Grid>  
  );  
};

export default Booklist;