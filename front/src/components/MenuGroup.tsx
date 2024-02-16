"use client";
import { Grid, Stack } from "@mui/material";
import { MenuSingle } from "./MenuSingle";
import { Dispatch, SetStateAction, useState } from "react";
const menuText = ["Main course", "Appetizers", "Beverage", "On sale"];

type MenuGroupProps = {
  selectedMenu: string;
  setSelectedMenu: Dispatch<SetStateAction<string>>;
};

export const MenuGroup = (props: MenuGroupProps) => {
  const { selectedMenu, setSelectedMenu } = props;
  return (
    <Grid py={4} container spacing={3}>
      {menuText.map((item, index) => (
        <Grid item key={index} xs={3}>
          <MenuSingle
            menuText={item}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
          />
        </Grid>
      ))}
    </Grid>
  );
};
