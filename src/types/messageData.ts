import { Timestamp } from "firebase/firestore";

export type MessageData = {
    flatId: string;        
    flatOwnerId: string;      
    content: string;     
    senderName: string;    
    senderEmail: string; 
    senderId: string;  
    createdAt: Timestamp;  
};