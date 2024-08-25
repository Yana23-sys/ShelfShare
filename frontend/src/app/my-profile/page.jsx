"use client";
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { Container, Grid, Paper, Typography, Button, Box, TextField, Avatar } from '@mui/material';  
import styles from '../Styles/MyProfile.module.css';

const MyProfile = () => {
   const { user, setUser } = useContext(UserContext);
   
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
          </Paper>  
          <Paper className={styles.profileSectionCard}>  
            <Typography variant="h6" className={styles.sectionTitle}>Current Swaps</Typography>  
          </Paper>  
          <Paper className={styles.profileSectionCard}>  
            <Typography variant="h6" className={styles.sectionTitle}>Previous Swaps</Typography>  
          </Paper>  
        </Grid>  
      </Grid>  
    </Container>
   )
}

export default MyProfile