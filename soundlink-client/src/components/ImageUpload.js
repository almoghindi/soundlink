import React from "react";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

const ImageUploadButton = styled("label")({
  display: "inline-block",
  position: "relative",
  width: "100%",
  height: "250px",
  backgroundColor: "white",
  border: "2px dashed #ddd",
  borderRadius: "8px",
  overflow: "hidden",
  cursor: "pointer",
  transition: "border-color 0.3s ease",

  "&:hover": {
    borderColor: "#6200ea",
  },
});

const ImagePreview = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  alignItems: "center",
});

const AddIconWrapper = styled("div")({
  position: "absolute",
  bottom: "8px",
  right: "8px",
  backgroundColor: "#6200ea",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "32px",
  height: "32px",
  cursor: "pointer",
});

const FileInput = styled("input")({
  display: "none",
});

const ImageUpload = ({ imageSrc, handleRemoveImage, handleImageChange }) => {
  return (
    <>
      <h2 className="signup-step2-title">Add your Picture</h2>

      <ImageUploadButton>
        {imageSrc ? (
          <>
            <ImagePreview src={imageSrc} alt="Uploaded" />
            <AddIconWrapper onClick={handleRemoveImage}>
              <AddIcon style={{ color: "white" }} />
            </AddIconWrapper>
          </>
        ) : (
          <>
            <CloudUploadIcon fontSize="large" />
            <FileInput
              type="file"
              onChange={handleImageChange}
              accept="image/*"
            />
            <AddIconWrapper>
              <AddIcon style={{ color: "white" }} />
            </AddIconWrapper>
          </>
        )}
      </ImageUploadButton>
      <p>Make sure the image is square</p>
    </>
  );
};

export default ImageUpload;
