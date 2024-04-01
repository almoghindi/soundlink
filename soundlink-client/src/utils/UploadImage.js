import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

const S3_BUCKET = process.env.REACT_APP_S3_BUCKET;
const REGION = process.env.REACT_APP_S3_REGION;

AWS.config.update({
  accessKeyId: process.env.REACT_APP_S3_API_KEY,
  secretAccessKey: process.env.REACT_APP_S3_API_SECRET,
});
const s3 = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

export const uploadFile = async (file) => {
  const uniqueFileName = `${Date.now()}-${uuidv4()}-${file.name}`;

  const params = {
    Bucket: S3_BUCKET,
    Key: uniqueFileName,
    Body: file,
    ACL: "public-read-write",
  };

  try {
    await s3.putObject(params).promise();

    const fileUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${encodeURIComponent(
      uniqueFileName
    )}`;

    return fileUrl;
  } catch (err) {
    return null;
  }
};

const extractKeyFromUrl = (url) => {
  const urlParts = url.split("/");
  return urlParts.slice(3).join("/");
};

export const deletePreviousImage = async (imageUrl) => {
  if (!imageUrl) return;

  const previousImageKey = extractKeyFromUrl(imageUrl);
  const deleteParams = {
    Bucket: process.env.REACT_APP_S3_BUCKET,
    Key: previousImageKey,
  };

  try {
    await s3.deleteObject(deleteParams).promise();
  } catch (error) {
    console.error("Error deleting previous image:", error);
    throw error; // Rethrow to handle it in the caller function
  }
};
