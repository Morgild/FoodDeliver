"use client";
import { Container } from "@mui/material";
import { WhiteCards } from "@/components/Home/WhiteCards";
import { HomeFoods } from "@/components/Home/HomeFoods";
import { HomeCarousel } from "@/components/Home/HomeCarousel";
import { useAuth } from "@/components/providers/AuthProvider";
import { useData } from "@/components/providers/DataProvider";
import { Onsale } from "@/components/Home/OnSale";
import { LoadingPage } from "@/components/LoadingPage";
import { useEffect } from "react";

export default function Home() {
  const { isLogged, isReady, isAdmin } = useAuth();
  const { foods, categories } = useData();

  const foodCategories = foods.map((item) => {
    return item.foodCategory;
  });

  const findDistinctCategories = (arr: string[]) => {
    let distinct: string[] = [];
    for (let i = 0; i < arr.length; i++) {
      if (!distinct.includes(arr[i])) {
        distinct.push(arr[i]);
      }
    }
    return distinct;
  };

  return (
    <>
      <HomeCarousel />
      <Container
        maxWidth="lg"
        sx={{
          pt: "122px",
          pb: "82px",
          display: "flex",
          flexDirection: "column",
          gap: "80px",
        }}
      >
        <WhiteCards />
        <Onsale />
        {findDistinctCategories(foodCategories).map(
          (item: any, index: number) => (
            <HomeFoods key={index} foodCategory={item} />
          )
        )}
      </Container>
    </>
  );
}
