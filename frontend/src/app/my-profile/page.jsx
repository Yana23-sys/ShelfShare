"use client";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { Container, Grid, Paper, Typography, Button, Box, Avatar } from '@mui/material';  
import styles from '../Styles/MyProfile.module.css';
import { useRouter } from 'next/navigation';
import { getAllSwapsByUserId } from "../api/swaps";


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
// import Avatar from '@mui/material/Avatar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Chip from '@mui/material/Chip';


const SwapList = ({ swaps = [], currentUser }) => {
    return (
        <List dense={false}>
            {swaps.map((swap) => (
                <ListItem 
                    key={swap._id}
                    secondaryAction={
                        <Chip label={swap.status} color="primary" />
                    }
                >
                    <ListItemAvatar>
                    <Avatar>
                        {currentUser._id === swap.sender._id ? <ArrowForwardIcon /> : <ArrowBackIcon />}
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                    primary={`${swap.sender_book.title} (${swap.sender.username}) ↔️ ${swap.receiver_book.title} (${swap.receiver.username})`}
                    />
                </ListItem>
            )
            )}
        </List>
    )
}

const MyProfile = () => {
   const [swaps, setSwaps] = useState({completed: [], pending: []})
   const { user, setUser } = useContext(UserContext);
   const router = useRouter()

   console.log(user.swaps)
   
   useEffect(() => {
     if (!user._id) {
        router.push('/login')
     } else {
        getAllSwapsByUserId(user._id).then((swaps) => {
            const pending = swaps.filter(
                (swap) =>
                  swap.status === "pending" ||
                  swap.status === "accepted" ||
                  swap.status === "processing"
              );
              const completed = swaps.filter(
                (swap) =>
                  swap.status === "completed" ||
                  swap.status === "cancelled" ||
                  swap.status === "declined"
              );
              setSwaps({pending, completed})
        })
     }
   }, [])

   if (!user._id) {
    return null
   }

   return (
    <Container className={styles.profilePage}>  
      <Grid container spacing={4}>  
        <Grid item xs={12} md={4}>  
          <Paper className={styles.profileCard}>  
            <Avatar className={styles.profileImage} src={user.avatar} />  
            <Typography variant="h6" className={styles.profileTitle}>{user.username}</Typography>  
            <Typography variant="body2" className={styles.location}>  
              {user.location}
            </Typography>  
            <Box className={styles.profileDetails}>  
              <Typography variant="body1" className={styles.profileName}>{user.name}</Typography>  
              <Typography variant="body1" className={styles.profileContact}>+44-856-859-9923</Typography>  
              <Typography variant="body1" className={styles.profileEmail}>{user.email}</Typography>  
              <Button variant="contained" color="primary" className={styles.saveButton}>Save</Button>  
            </Box>  
          </Paper>  
        </Grid>  
        <Grid item xs={12} md={8}>  
          <Paper className={styles.profileSectionCard}>  
            <Typography variant="h6" className={styles.sectionTitle}>My Books</Typography>  
            <List>
                {(user.books || []).map((book) => (
                    <ListItem key={book._id}>
                        <ListItemAvatar>
                            <Avatar src={book.cover_image_url} alt={book.title} variant="square"/>
                        </ListItemAvatar>
                        <ListItemText primary={`${book.title} (${book.publication_year})`} secondary={book.author} />
                    </ListItem>
                ))}
            </List>
          </Paper>  
          <Paper className={styles.profileSectionCard}>  
            <Typography variant="h6" className={styles.sectionTitle}>Current Swaps</Typography>  
            <SwapList swaps={swaps.pending} currentUser={user} />
          </Paper>  
          <Paper className={styles.profileSectionCard}>  
            <Typography variant="h6" className={styles.sectionTitle}>Previous Swaps</Typography>  
            <SwapList swaps={swaps.completed} currentUser={user} />
          </Paper>  
        </Grid>  
      </Grid>  
    </Container>
   )
}

export default MyProfile