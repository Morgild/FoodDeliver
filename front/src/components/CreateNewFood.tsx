import { Close, TypeSpecimenTwoTone } from "@mui/icons-material";
import { Button, Select, Stack, TextField, Typography } from "@mui/material";
import { useData } from "./providers/DataProvider";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { CustomInput } from "./CustomInput";
import { ChangeEvent, useState } from "react";
import { IOSSwitch } from "./IOSSwitch";
const validationSchema = yup.object({
  foodCategory: yup.string().required(),
  foodName: yup.string().required(),
  foodIngredients: yup.string().required(),
  foodPrice: yup.number().required(),
  discount: yup.number(),
});
type CreateNewFoodProps = {
  handleClose: () => void;
  categories: any;
};
export const CreateNewFood = (props: CreateNewFoodProps) => {
  const { handleClose } = props;
  const { postFood, foods } = useData();
  const [isDiscount, setIsDiscount] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { categories } = props;

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
      foodName: "",
      foodCategory: "",
      foodIngredients: "",
      foodPrice: 0,
      discount: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      postFood(
        values.foodName,
        values.foodCategory,
        values.foodIngredients,
        values.foodPrice,
        values.discount,
        imageUrl
      );
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
        <CustomInput
          label="Хоолны нэр"
          placeholder="Хоолны нэр оруулна уу!"
          name="foodName"
          value={formik.values.foodName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.foodName && Boolean(formik.errors.foodName)}
          helperText={formik.touched.foodName && formik.errors.foodName}
        />
        <CustomInput
          id="outlined-select-currency-native"
          select
          label="Хоолны ангилал"
          defaultValue="EUR"
          name="foodCategory"
          value={formik.values.foodCategory}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.foodCategory && Boolean(formik.errors.foodCategory)
          }
          helperText={formik.touched.foodCategory && formik.errors.foodCategory}
          SelectProps={{
            native: true,
          }}
        >
          {categories.map((item: any) => (
            <option key={item.foodCategory} value={item.foodCategory}>
              {item.foodCategory}
            </option>
          ))}
        </CustomInput>
        <CustomInput
          label="Хоолны орц"
          placeholder="Хоолны орц оруулна уу!"
          name="foodIngredients"
          value={formik.values.foodIngredients}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.foodIngredients &&
            Boolean(formik.errors.foodIngredients)
          }
          helperText={
            formik.touched.foodIngredients && formik.errors.foodIngredients
          }
        />
        <CustomInput
          label="Хоолны үнэ"
          placeholder="Хоолны үнэ оруулна уу!"
          name="foodPrice"
          value={formik.values.foodPrice}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.foodPrice && Boolean(formik.errors.foodPrice)}
          helperText={formik.touched.foodPrice && formik.errors.foodPrice}
        />
        <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
          <IOSSwitch
            onChange={() => {
              setIsDiscount((prev) => !prev);
            }}
          />
          <Typography>Хямдралтай эсэх</Typography>
        </Stack>
        <CustomInput
          disabled={!isDiscount}
          placeholder="Хямдралын хувь оруулна уу!"
          name="discount"
          value={formik.values.discount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.discount && Boolean(formik.errors.discount)}
          helperText={formik.touched.discount && formik.errors.discount}
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
