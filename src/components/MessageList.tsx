import { useEffect, useState } from "react";
import { Box, Typography, Divider, List, ListItem, ListItemText } from "@mui/material";
import { MessageData } from "../types/messageData"; 
import useFirestore from "../hooks/useFirestore"; 
import useAuthContext from "../hooks/useAuthContext";
import { FlatData } from "../types/flatData";

type MessageListProps = {
  flat: FlatData; 
};

export default function MessageList({ flat }: MessageListProps) {
  const { currentUser } = useAuthContext();
  const [messages, setMessages] = useState<MessageData[]>([]);
  const { getMessagesByFlatId } = useFirestore("Messages"); 

  useEffect(() => {
    const fetchMessages = async () => {
      if (!flat.id || !currentUser) return;

      try {
        const allMessages = await getMessagesByFlatId(flat.id);

        const sortedMessages = allMessages.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);

        if (currentUser?.id === flat.flatOwnerId) {
          
          setMessages(sortedMessages);
        } else {
          const userMessages = sortedMessages.filter(message => message.senderId === currentUser.id);
          
          setMessages(userMessages);
        }
      } catch (error) {
        console.error("Error fetching messages: ", error);
      }
    };

    fetchMessages();
  }, [flat.id, currentUser, getMessagesByFlatId]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Messages
      </Typography>
      <Divider sx={{ mb: 2}} />
      <List>
        {messages.length > 0 ? (
          messages.map((message) => (
            <ListItem key={message.createdAt.toString()} sx={{ mb: 2 }}>
              <ListItemText
                primary={`From: ${message.senderName} ${currentUser?.id === message.flatOwnerId ? `(${message.senderEmail})` : ""}`}
                secondary={message.content}
              />
              <Typography variant="body2" color="text.secondary">
                {new Date(message.createdAt.seconds * 1000).toLocaleString()}
              </Typography>
            </ListItem>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No messages to show.
          </Typography>
        )}
      </List>
    </Box>
  );
};

