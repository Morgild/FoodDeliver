import { KeyboardArrowRight } from "@mui/icons-material";
import { Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { ItemCard } from "./ItemCard";
import { useData } from "./providers/DataProvider";

type HomeFoodsProps = { categoryTitle: String };
export const HomeFoods = (props: HomeFoodsProps) => {
  const { foods } = useData();
  const { categoryTitle } = props;

  return (
    <Stack gap={3}>
      <Stack
        flexDirection={"row"}
        justifyContent="space-between"
        sx={{ px: "16px" }}
      >
        <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
          <Image src="/Star.png" alt="star" width={18} height={18} />
          <Typography fontSize={22} fontWeight={700} color={"#272727"}>
            {categoryTitle}
          </Typography>
        </Stack>
        <Stack gap={"5px"} flexDirection={"row"} alignItems={"center"}>
          <Typography fontSize={14} fontWeight={400} color={"primary.main"}>
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
        {foods.map((item: any, index: number) => (
          <Grid item key={index} xs={3}>
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
  );
};
