"use client";
import { Grid, Stack } from "@mui/material";
import { MenuSingle } from "./MenuSingle";
import { Dispatch, SetStateAction, useState } from "react";
import { useData } from "./providers/DataProvider";
const categories = ["Main course", "Appetizers", "Beverage", "On sale", "sS"];

type MenuGroupProps = {
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
};

export const MenuGroup = (props: MenuGroupProps) => {
  const { selectedCategory, setSelectedCategory } = props;
  // const { categories } = useData();
  return (
    <>
      <Grid py={4} container columnSpacing={3} rowSpacing={1}>
        {categories.map((item: any, index: number) => {
          return (
            <Grid item key={index} xs={3}>
              <MenuSingle
                foodCategory={item.foodCategory}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
