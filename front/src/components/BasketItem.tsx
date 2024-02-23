import { Add, Close, Remove } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { number } from "yup";

type BasketItemProps = {
  foodName: string;
  foodPic: string;
  foodIngredients: string;
  foodCount: number;
  foodPrice: number;
  discount?: number;
};

const numberFormatter = new Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const BasketItem = (props: BasketItemProps) => {
  const { foodName, foodPic, foodIngredients, foodCount, foodPrice, discount } =
    props;

  const [foodCountOnBasket, setFoodCountOnBasket] = useState(foodCount);
  const changeFoodCount = (change: number) => {
    setFoodCountOnBasket((prev) => {
      if (change < 0 && prev == 1) return prev;
      return prev + change;
    });
  };
  return (
    <Stack flexDirection={"row"} p={2} gap={2} borderRadius={"8px"}>
      <Stack width={0.5} flexGrow={1} position={"relative"}>
        <Image objectFit="fill" src={foodPic} fill alt="food image" />
        {Boolean(discount) && (
          <Typography
            color="common.white"
            fontSize={12}
            fontWeight={600}
            bgcolor="primary.main"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              border: 1,
              borderColor: "common.white",
              width: "fit-content",
              p: "4px 8px",
              borderRadius: "16px",
            }}
          >
            {discount}%
          </Typography>
        )}
      </Stack>
      <Stack width={0.5} gap={1}>
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack gap={"2px"}>
            <Typography fontSize={18} fontWeight={600}>
              {foodName}
            </Typography>
            <Typography fontSize={18} fontWeight={600} color={"primary.main"}>
              {numberFormatter.format(
                Boolean(discount)
                  ? foodPrice * foodCountOnBasket * (1 - discount * 0.01)
                  : foodPrice * foodCountOnBasket
              )}
            </Typography>
          </Stack>
          <Close />
        </Stack>
        <Typography>{foodIngredients}</Typography>
        <Stack>
          <Stack width={1} gap={"12px"}></Stack>
          <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
            <Stack
              onClick={() => {
                changeFoodCount(-1);
              }}
              bgcolor={"primary.main"}
              borderRadius={"10px"}
              p={"8px"}
              color={"common.white"}
            >
              <Remove />
            </Stack>
            <Typography px={1} fontSize={16} fontWeight={500} color={"#171717"}>
              {foodCountOnBasket}
            </Typography>
            <Stack
              onClick={() => {
                changeFoodCount(1);
              }}
              bgcolor={"primary.main"}
              borderRadius={"10px"}
              p={"8px"}
              color={"common.white"}
            >
              <Add />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
