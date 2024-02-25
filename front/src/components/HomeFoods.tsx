import { KeyboardArrowRight } from "@mui/icons-material";
import { Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { ItemCard } from "./ItemCard";
import { useData } from "./providers/DataProvider";
import { useState } from "react";
import { TitleGreenStar } from "./TitleGreenStar";

type HomeFoodsProps = { foodCategory: String };
export const HomeFoods = (props: HomeFoodsProps) => {
  const { foods } = useData();
  const { foodCategory } = props;
  const [seeAll, setSeeAll] = useState(4);
  const handleSeeAll = () => {
    if (seeAll == 4) {
      setSeeAll(40);
    } else setSeeAll(4);
  };

  return (
    <Stack gap={3}>
      <Stack
        flexDirection={"row"}
        justifyContent="space-between"
        sx={{ px: "16px" }}
      >
        <TitleGreenStar title={foodCategory} />
        <Stack
          onClick={handleSeeAll}
          gap={"5px"}
          flexDirection={"row"}
          alignItems={"center"}
        >
          <Typography
            fontSize={14}
            fontWeight={400}
            color={"primary.main"}
            sx={{ cursor: "pointer" }}
          >
            Бүгдийг харах
          </Typography>
          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            alignItems={"center"}
            color={"primary.main"}
          >
            <KeyboardArrowRight sx={{ height: "100%", fontSize: "14px" }} />
          </Typography>
        </Stack>
      </Stack>
      <Grid container spacing={3}>
        {foods
          .filter((food) => {
            return food.foodCategory == foodCategory;
          })
          .filter((food, index) => index < seeAll)
          .map((item: any, index: number) => (
            <Grid item key={index} xs={3}>
              <ItemCard
                foodName={item.foodName}
                foodPrice={item.foodPrice}
                discount={item.discount}
                foodPic={item.foodPic}
                foodIngredients={item.foodIngredients}
                foodCategory={item.foodCategory}
              />
            </Grid>
          ))}
      </Grid>
    </Stack>
  );
};
