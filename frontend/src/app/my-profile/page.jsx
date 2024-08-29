"use client";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { Container, Grid, Paper, Typography, Button, Box, Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';  
import styles from '../Styles/MyProfile.module.css';
import { useRouter } from 'next/navigation';
import { getAllSwapsByUserId, updateSwap } from "../api/swaps";
import SwapList from "../Components/SwapList";


const MyProfile = () => {
   const [swaps, setSwaps] = useState({completed: [], pending: []})
   const { user, setUser } = useContext(UserContext);
   const router = useRouter()

   
   useEffect(() => {
     if (!user._id) {
        router.push('/login')
     } else {
        getAllSwapsByUserId(user._id).then((swaps) => {
            const pending = swaps.filter(
                (swap) => swap.status === "accepted" || swap.status === "pending");
              const completed = swaps.filter(
                (swap) => swap.status === "rejected" || 
                swap.status === "completed" || 
                (swap.status === "canceled" && swap.sender._id === user._id)
              );
              setSwaps({pending, completed})
        })
     }
   }, [user._id])

   if (!user._id) {
    return null
   }

   const handleSwapUpdate = (swapId, status) => {
    return updateSwap({ swapId, status }).then(() => {
      setSwaps((prevSwaps) => {
        const updatedPending = prevSwaps.pending
            .map((swap) =>
              swap._id === swapId ? { ...swap, status } : swap
            )
            .filter((swap) => swap.status === "accepted" || swap.status === "pending");

          const updatedCompleted = [
            ...prevSwaps.completed,
            ...prevSwaps.pending.filter(
              (swap) =>
                swap._id === swapId &&
                (swap.status === "rejected" ||
                  swap.status === "completed" ||
                  swap.status === "canceled")
            ),
          ];

          return {
            pending: updatedPending,
            completed: updatedCompleted,
          };
      });
    })
    .catch((error) => {
      console.error("Error updating swap:", error);
    });
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
            <div style={{ maxHeight: 300, overflowY: 'auto' }}>
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
            </div>
          </Paper>  

          <Paper className={styles.profileSectionCard}>  
            <Typography variant="h6" className={styles.sectionTitle}>Current Swaps</Typography>  
            <div style={{ maxHeight: 300, overflowY: 'auto' }}>
            <SwapList swaps={swaps.pending} currentUser={user} onSwapUpdate={handleSwapUpdate}/>
            </div>
          </Paper>  
          <Paper className={styles.profileSectionCard}>  
            <Typography variant="h6" className={styles.sectionTitle}>Previous Swaps</Typography>  
            <div style={{ maxHeight: 300, overflowY: 'auto' }}>
            <SwapList swaps={swaps.completed} currentUser={user} />
            </div>
          </Paper> 
           
        </Grid>  
      </Grid>  
    </Container>
   )
}

export default MyProfile