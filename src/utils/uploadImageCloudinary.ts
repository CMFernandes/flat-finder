
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME

export const uploadImageToCloudinary = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "flat-finder-images"); 
  
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });
  
      const data = await res.json();
      return data.secure_url; 
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
};