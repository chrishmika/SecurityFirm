import { v2 as cloudinary } from "cloudinary";

export const uploadCloudinary = async ({ image }) => {
  try {
    const uploadedDocument = await cloudinary.uploader.upload(image);
    return uploadedDocument.secure_url;
  } catch (error) {
    console.log("upload file to cloudinary is failed");
  }
};

export const deleteCloudinary = async (image) => {
  try {
    const imageId = image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(imageId);
  } catch (error) {
    console.log("delete file from cloudinary is failed");
  }
};
