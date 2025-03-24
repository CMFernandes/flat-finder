import  useAuthContext  from "../hooks/useAuthContext";
import useFormHandler from "../hooks/useFormHandler";
import ReusableForm from "../components/ReusableForm";
import { Box } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import useFirestore from "../hooks/useFirestore";
import { useState } from "react";

type MessageFormProps = {
  flatId: string ;
  flatOwnerId: string;
};

export default function MessageForm({ flatId, flatOwnerId }: MessageFormProps) {
  const { currentUser } = useAuthContext();
  const { addMessage } = useFirestore("Messages");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { formData, errors, handleFieldChange, validate, resetForm } = useFormHandler({
    content: "", 
  });

  const handleSubmit = async (formData: { content: string }) => {
    if (!currentUser) {
      setErrorMessage("You need to be logged in to send a message.")
      return;
    }
    const senderFullName = `${currentUser.firstName} ${currentUser.lastName}`;

    const messageData = {
      flatId,
      flatOwnerId,
      content: formData.content,
      senderName: senderFullName,
      senderEmail: currentUser.email,
      senderId: currentUser.id,
      createdAt: Timestamp.now(),
    };

    try {
      await addMessage(messageData); 
      setErrorMessage("");
      resetForm()
    } catch (error) {
      console.error("Error sending message:", error);
    };
  }
  return (
    <>
    <Box sx={{ mb: 3 }}>
      <ReusableForm
        onFormSubmit={handleSubmit}
        title="Send a Message"
        formData={formData}
        errors={errors}
        handleFieldChange={handleFieldChange}
        validate={validate}
        fields={[
          {
            name: "content",
            label: "Message",
            type: "textarea",
            required: true,
          },
        ]}
      >
      </ReusableForm>
      
    </Box>
    <Box sx={{ position: "relative", mb: 3 }}>
        {errorMessage && (
          <Box
            sx={{
              position: "absolute",
              top: "-70px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "error.main",
              padding: "8px 16px",
              fontSize: "1.2rem",
              fontWeight: "bold",
              zIndex: 10,
              width: "80%",
              textAlign: "center",
            }}
          >
            <p>{errorMessage}</p>
          </Box>
        )}
       </Box>
    </>
  );
}
