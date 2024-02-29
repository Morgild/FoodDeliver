"use client";
import { Stack, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
type menuSingleProps = {
  foodCategory: string;
  selectedMenu: string;
  setSelectedMenu: Dispatch<SetStateAction<string>>;
};
export const MenuSingle = (props: menuSingleProps) => {
  const { foodCategory, selectedMenu, setSelectedMenu } = props;
  const isSelected = () => {
    if (foodCategory == selectedMenu) {
      return true;
    } else return false;
  };

  return (
    <Stack
      onClick={() => {
        setSelectedMenu(foodCategory);
      }}
      bgcolor={isSelected() ? "primary.main" : "common.white"}
      color={isSelected() ? "common.white" : "common.black"}
      width={1}
      sx={{
        py: "8px",
        px: "16px",
        border: 1,
        borderColor: "#D6D8DB",
        borderRadius: "16px",
        cursor: "pointer",
      }}
    >
      <Typography
        fontSize={18}
        fontWeight={600}
        textAlign={"center"}
        color={"inherit"}
      >
        {foodCategory}
      </Typography>
    </Stack>
  );
};
