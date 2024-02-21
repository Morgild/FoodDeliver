"use client";
import { FoodCategory } from "@/components/FoodCategory";
import { ItemCard } from "@/components/ItemCard";
import { MenuGroup } from "@/components/MenuGroup";
import { MenuSingle } from "@/components/MenuSingle";
import { useData } from "@/components/providers/DataProvider";
import { Container, Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";

export default function Menu() {
  const [selectedMenu, setSelectedMenu] = useState("");
  const { foods, categories } = useData();
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack>
        <Grid py={4} container columnSpacing={3} rowSpacing={2}>
          {categories.map((item: any, index: number) => {
            return (
              <Grid item key={index} xs={3}>
                <MenuSingle
                  foodCategory={item.foodCategory}
                  selectedMenu={selectedMenu}
                  setSelectedMenu={setSelectedMenu}
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid container spacing={3}>
          {foods
            .filter((food) => {
              return food.foodCategory == selectedMenu;
            })
            .map((item: any, index: number) => (
              <Grid item key={index} xs={12} md={5} lg={4}>
                <ItemCard
                  foodName={item.foodName}
                  foodPrice={item.foodPrice}
                  discount={item.discount}
                  foodPic={item.foodPic}
                />
              </Grid>
            ))}
        </Grid>
      </Stack>
    </Container>
  );
}
