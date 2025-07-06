import { v2 as cloudinary } from "cloudinary";

export const uploadCloudinary = async ({ image }) => {
  try {
    const uploadedDocument = await cloudinary.uploader.upload(newData.NICCopy);
    return uploadedDocument.secure_url;
  } catch (error) {}
};

export const deleteCloudinary = async ({ image }) => {
  const imageId = post.img.split("/").pop().split(".")[0];
  await cloudinary.uploader.destroy(imageId);
};
