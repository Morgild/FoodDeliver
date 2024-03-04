import { Category, DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { useData } from "../providers/DataProvider";

type EditCategoryProps = {
  categories: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setEditCategory: Dispatch<SetStateAction<boolean>>;
};

export const EditCategory = (props: EditCategoryProps) => {
  const { categories, setOpen, setEditCategory } = props;
  const { deleteCategory } = useData();
  return (
    <Stack
      position="absolute"
      top={"-50%"}
      right={"100%"}
      sx={{ transform: "translate(110%, -20%)" }}
      borderRadius={"8px"}
      bgcolor={"common.white"}
      boxShadow={1}
      zIndex={1}
      width={"200px"}
    >
      <Stack
        flexDirection={"row"}
        gap={2}
        padding={"8px 16px"}
        color={"#525252"}
        onClick={() => {
          setEditCategory(true);
          setOpen(true);
        }}
      >
        <EditOutlined color="inherit" />
        <Typography>Edit name</Typography>
      </Stack>
      <Stack
        flexDirection={"row"}
        gap={2}
        padding={"8px 16px"}
        color={"#DF1F29"}
        onClick={() => {
          deleteCategory(categories);
        }}
      >
        <DeleteOutline color={"inherit"} />
        <Typography color={"#DF1F29"}>Delete Category</Typography>
      </Stack>
    </Stack>
  );
};
