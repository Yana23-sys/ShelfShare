import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Typography,
  Chip,
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const SwapList = ({ swaps = [], currentUser, onSwapUpdate }) => {
  return (
    <List dense={false}>
      {swaps.map((swap) => (
        <ListItem
          key={swap._id}
          secondaryAction={
            (swap.status === "pending" &&
              currentUser._id === swap.receiver._id && (
                <>
                  <IconButton
                    color="success"
                    aria-label="ok"
                    onClick={() => onSwapUpdate(swap._id, "accepted")}
                  >
                    <DoneIcon />
                  </IconButton>
                  <IconButton
                    aria-label="cancel"
                    color="error"
                    onClick={() => onSwapUpdate(swap._id, "rejected")}
                  >
                    <ClearIcon />
                  </IconButton>
                </>
              )) ||
            (swap.status === "pending" &&
              currentUser._id === swap.sender._id && (
                <>
                  <Chip label={swap.status} color="info" />
                  <IconButton
                    aria-label="cancel"
                    color="error"
                    onClick={() => onSwapUpdate(swap._id, "canceled")}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </>
              )) ||
            (swap.status === "accepted" && (
              <Chip label={swap.status} color="success" />
            )) ||
            (swap.status === "rejected" && (
              <Chip label={swap.status} color="error" />
            )) ||
            (swap.status === "canceled" &&
              currentUser._id === swap.sender._id && (
                <Chip label={swap.status} color="error" />
              ))
          }
        >
          <ListItemAvatar>
            <Avatar>
              {currentUser._id === swap.sender._id ? (
                <ArrowForwardIcon />
              ) : (
                <ArrowBackIcon />
              )}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                style={{
                  maxWidth: "80%",
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                }}
              >
                {`${swap.sender_book.title} (${
                  currentUser._id === swap.sender._id
                    ? "Me"
                    : swap.sender.username
                }) ↔️ ${swap.receiver_book.title} (${
                  currentUser._id === swap.receiver._id
                    ? "Me"
                    : swap.receiver.username
                })`}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default SwapList;
