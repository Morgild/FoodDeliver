import { Close, TypeSpecimenTwoTone } from "@mui/icons-material";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useData } from "../providers/DataProvider";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { Dispatch, SetStateAction } from "react";
const validationSchema = yup.object({
  foodCategory: yup.string(),
});
type CreateNewCategoryProps = {
  handleClose: () => void;
  editCategory: boolean;
  setEditCategory: Dispatch<SetStateAction<boolean>>;
  selectedMenu: string;
};
export const CreateNewCategory = (props: CreateNewCategoryProps) => {
  const { handleClose, editCategory, setEditCategory, selectedMenu } = props;
  const { postCategory, handleEditCategory } = useData();

  const formik = useFormik({
    initialValues: {
      foodCategory: editCategory ? selectedMenu : "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (!editCategory) {
        postCategory(values.foodCategory);
      } else {
        handleEditCategory(selectedMenu, values.foodCategory);
      }
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
          {editCategory ? "Edit category" : "Create new category"}
        </Typography>
      </Stack>
      <Stack
        p={3}
        gap={2}
        borderTop={1}
        borderBottom={1}
        borderColor={"#E0E0E0"}
      >
        <Typography fontSize={14} fontWeight={500}>
          Category name
        </Typography>
        <TextField
          hiddenLabel
          id="filled-hidden-label-normal"
          placeholder="Insert new category"
          variant="filled"
          name="foodCategory"
          value={formik.values.foodCategory}
          onChange={formik.handleChange}
        />
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
