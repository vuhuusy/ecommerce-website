const cloudName = "YOUR_CLOUD_NAME";
const apiKey = "YOUR_API_KEY";
const apiSecret = "YOUR_API_SECRET";

const uploadImageToCloudinary = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "YOUR_UPLOAD_PRESET"); // Replace with your upload preset name

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Image upload failed");
  }

  const data = await response.json();
  return data;
};

// Usage example
const imageFile = document.querySelector("#imageInput").files[0];
uploadImageToCloudinary(imageFile)
  .then((data) => {
    console.log(data);
    // Process the Cloudinary response as needed
  })
  .catch((error) => {
    console.error(error);
  });

// const uploadImageToCloudinary = async () => {
//   console.log("data call");
//   console.log(process.env);
// };

export default uploadImageToCloudinary;
