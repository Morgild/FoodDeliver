import { Close } from "@mui/icons-material";
import { Button, Container, Stack, TextField } from "@mui/material";
import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
type ChangeProfilePicProps = {
  handleClose?: () => void;
  imageUrl: string;
  setImageUrl: Dispatch<SetStateAction<string>>;
};
export const ChangeProfilePic = (props: ChangeProfilePicProps) => {
  const { imageUrl, setImageUrl } = props;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setSelectedFile(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/drik9j46w/upload?upload_preset=ndexq0nb",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        console.log(data);
        setImageUrl(data.secure_url);
        toast.success("Хэрэглэгчийн зураг амжилттай солигдлоо", {
          position: "top-center",
        });
      } catch (error) {
        toast.error("Image upload error:");
      }
    }
  };

  return (
    <Stack>
      <Stack
        onClick={props.handleClose}
        color={"primary.main"}
        alignItems={"flex-end"}
      >
        <Close />
      </Stack>
      <Container>
        <Stack py={1} alignItems="center">
          <Stack gap={3} width={400}>
            {imageUrl && (
              <Stack width="100%" position="relative">
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  width={"100%"}
                  height={"100%"}
                />
              </Stack>
            )}
            <TextField
              type="file"
              onChange={handleImageChange}
              variant="outlined"
            />
            <Button onClick={handleImageUpload} variant="contained">
              Upload
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};
