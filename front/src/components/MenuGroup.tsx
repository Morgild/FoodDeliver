"use client";
import { Grid, Stack } from "@mui/material";
import { MenuSingle } from "./MenuSingle";
import { Dispatch, SetStateAction, useState } from "react";
import { useData } from "./providers/DataProvider";
const menuText = ["Main course", "Appetizers", "Beverage", "On sale"];

type MenuGroupProps = {
  selectedMenu: string;
  setSelectedMenu: Dispatch<SetStateAction<string>>;
};

export const MenuGroup = (props: MenuGroupProps) => {
  const { selectedMenu, setSelectedMenu } = props;
  const { categories } = useData();
  return (
    <>
      <Grid py={4} container columnSpacing={3} rowSpacing={1}>
        {categories.map((item: any, index: number) => {
          return (
            <Grid item key={index} xs={3}>
              <MenuSingle
                menuText={item.foodCategory}
                selectedMenu={selectedMenu}
                setSelectedMenu={setSelectedMenu}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
