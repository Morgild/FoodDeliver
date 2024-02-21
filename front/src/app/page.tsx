"use client";
import { Container } from "@mui/material";
import { WhiteCards } from "@/components/WhiteCards";
import { HomeFoods } from "@/components/HomeFoods";
import { HomeCarousel } from "@/components/HomeCarousel";
import { useAuth } from "@/components/providers/AuthProvider";
import { useData } from "@/components/providers/DataProvider";
import { Onsale } from "@/components/OnSale";

export default function Home() {
  const { isLogged } = useAuth();
  const { foods, categories } = useData();

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

        {categories.map((item: any, index: number) => (
          <HomeFoods key={index} foodCategory={item.foodCategory} />
        ))}
      </Container>
    </>
  );
}
