import { Close, TypeSpecimenTwoTone } from "@mui/icons-material";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useData } from "./providers/DataProvider";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { CustomInput } from "./CustomInput";
import { ChangeEvent, useState } from "react";
const validationSchema = yup.object({
  foodCategory: yup.string(),
});
type CreateNewFoodProps = {
  handleClose: () => void;
};
export const CreateNewFood = (props: CreateNewFoodProps) => {
  const { handleClose } = props;
  const { postCategory } = useData();
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const categories = ["Cat1", "Cat2", "Cat3", "Cat4"];

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
          "https://api.cloudinary.com/v1_1/drik9j46w/upload?upload_preset=uhxxcxye",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        console.log(data);
        setImageUrl(data.secure_url);
        toast.success("Хоолны зургийг амжилттай хадгаллаа", {
          position: "top-center",
        });
      } catch (error) {
        toast.error("Image upload error:");
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      foodCategory: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      postCategory(values.foodCategory);
    },
  });

  return (
    <Stack>
      <Stack flexDirection={"row"} alignItems={"center"} padding={"16px 24px"}>
        <Close
          onClick={() => {
            handleClose();
          }}
          sx={{ cursor: "pointer" }}
        />
        <Typography
          width={1}
          color={"#161616"}
          fontSize={24}
          fontWeight={700}
          textAlign={"center"}
        >
          Create food
        </Typography>
      </Stack>
      <Stack
        p={3}
        gap={2}
        borderTop={1}
        borderBottom={1}
        borderColor={"#E0E0E0"}
      >
        <CustomInput label="Хоолны нэр" placeholder="Хоолны нэр оруулна уу!" />
        <CustomInput
          id="outlined-select-currency-native"
          select
          label="Хоолны ангилал"
          defaultValue="EUR"
          SelectProps={{
            native: true,
          }}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </CustomInput>
        <CustomInput label="Хоолны орц" placeholder="Хоолны орц оруулна уу!" />
        <CustomInput label="Хоолны үнэ" placeholder="Хоолны үнэ оруулна уу!" />
        <CustomInput
          label="Хямдарлтай эсэх"
          placeholder="Хоолны нэр оруулна уу!"
        />
        <Stack width={1} flexDirection={"row"} gap={1}>
          <Stack py={1} gap={1} alignItems="start" width={0.5}>
            <Typography>Хоолны зураг</Typography>
            <Stack gap={3} flexDirection={"row"}>
              <TextField
                type="file"
                onChange={handleImageChange}
                variant="outlined"
              />
            </Stack>
            <Typography
              onClick={handleImageUpload}
              p={1}
              bgcolor={"primary.main"}
              width={1}
              borderRadius={1}
              textAlign={"center"}
              color={"common.white"}
              mt={1}
            >
              Upload image
            </Typography>
          </Stack>
          <Stack width={0.5}>
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
          </Stack>
        </Stack>
      </Stack>
      <Stack flexDirection={"row"} justifyContent={"end"} p={3} gap={2}>
        <Typography
          onClick={() => {
            handleClose();
          }}
          padding={"10px 16px"}
          fontSize={16}
          fontWeight={700}
          borderRadius={2}
          sx={{
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#393939",
              color: "common.white",
            },
          }}
        >
          Clear
        </Typography>
        <Button
          onClick={() => {
            formik.handleSubmit();
          }}
          sx={{ cursor: "pointer" }}
          variant="contained"
          color="success"
        >
          <Typography borderRadius={"4px"} fontSize={16} fontWeight={700}>
            Continue
          </Typography>
        </Button>
      </Stack>
    </Stack>
  );
};
