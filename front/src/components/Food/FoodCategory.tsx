import { MoreVert } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { EditCategory } from "./EditCategory";

type FoodCategoryProps = {
  categories: string;
  selectedMenu: string;
  setSelectedMenu: Dispatch<SetStateAction<string>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  editCategory: boolean;
  setEditCategory: Dispatch<SetStateAction<boolean>>;
};
export const FoodCategory = (props: FoodCategoryProps) => {
  const { categories, selectedMenu, setSelectedMenu, setOpen } = props;
  const [edit, setEdit] = useState(false);
  const isSelected = () => {
    if (categories == selectedMenu) {
      return true;
    } else return false;
  };

  return (
    <Stack
      onClick={() => {
        setSelectedMenu(categories);
      }}
      bgcolor={isSelected() ? "primary.main" : "common.white"}
      color={isSelected() ? "common.white" : "common.black"}
      width={"100%"}
      borderRadius={1}
      border={1}
      borderColor={"#D6D8DB"}
      padding={"8px 16px"}
      flexDirection={"row"}
      justifyContent={"space-between"}
      sx={{ cursor: "pointer" }}
    >
      <Typography fontSize={18} fontWeight={600} color={"inherit"}>
        {categories}
      </Typography>
      <Stack
        position={"relative"}
        onClick={() => {
          setEdit((prev) => !prev);
        }}
      >
        <MoreVert />
        {isSelected() && edit && (
          <EditCategory
            categories={categories}
            setOpen={setOpen}
            setEditCategory={props.setEditCategory}
          />
        )}
      </Stack>
    </Stack>
  );
};
