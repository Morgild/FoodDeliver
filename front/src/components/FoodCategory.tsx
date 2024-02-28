import { MoreVert } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { EditCategory } from "./EditCategory";

type FoodCategoryProps = {
  categories: string;
  selectedMenu: string;
  setSelectedMenu: Dispatch<SetStateAction<string>>;
};
export const FoodCategory = (props: FoodCategoryProps) => {
  const { categories, selectedMenu, setSelectedMenu } = props;
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
        // setEdit(false);
      }}
      bgcolor={isSelected() ? "primary.main" : "common.white"}
      color={isSelected() ? "common.white" : "common.black"}
      width={1}
      borderRadius={1}
      border={1}
      borderColor={"#D6D8DB"}
      padding={"8px 16px"}
      flexDirection={"row"}
      justifyContent={"space-between"}
      sx={{ cursor: "pointer" }}
    >
      <Typography fontSize={18} fontWeight={600} color={"inherit"}>
        {props.categories}
      </Typography>
      <Stack
        position={"relative"}
        onClick={() => {
          setEdit((prev) => !prev);
        }}
      >
        <MoreVert />
        {isSelected() && edit && <EditCategory />}
      </Stack>
    </Stack>
  );
};
