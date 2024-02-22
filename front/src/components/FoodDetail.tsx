import { Add, Close, Remove } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
type FoodDetailProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  foodName: string;
  foodPrice: number;
  discount?: number;
  foodPic: string;
  foodIngredients?: string;
};
export const FoodDetail = (props: FoodDetailProps) => {
  const { setOpen, foodName, foodPrice, discount, foodPic, foodIngredients } =
    props;
  const [foodCount, setFoodCount] = useState(1);
  const [foodTotal, setFoodTotal] = useState(0);
  const changeFoodCount = (change: number) => {
    setFoodCount((prev) => {
      if (change < 0 && prev == 1) return prev;
      return prev + change;
    });
  };
  return (
    <Stack flexDirection={"row"} gap={"33px"} height={1}>
      <Stack
        position={"relative"}
        borderRadius={3}
        overflow={"hidden"}
        width={0.5}
        sx={{ aspectRatio: 3 / 2 }}
      >
        <Image objectFit="fill" src={foodPic} alt="food image" fill />
      </Stack>

      <Stack gap={2} width={0.5}>
        <Stack alignItems={"end"} width={1}>
          <Close
            onClick={() => {
              setOpen(false);
            }}
            sx={{ cursor: "pointer" }}
          />
        </Stack>
        <Stack>
          <Typography fontSize={28} fontWeight={700} color={"common.black"}>
            {foodName}
          </Typography>
          <Stack flexDirection={"row"} gap={2} alignItems={"center"}>
            <Typography color={"primary.main"} fontSize={18} fontWeight={600}>
              {foodPrice}₮
            </Typography>
            <Typography
              color={"#171717"}
              fontSize={16}
              fontWeight={500}
              sx={{ textDecoration: "line-through" }}
            >
              {discount ? (1 - discount / 100) * foodPrice : foodPrice}₮
            </Typography>
          </Stack>
        </Stack>
        <Stack width={1} gap={"12px"}>
          <Typography fontSize={18} fontWeight={600} color={"common.black"}>
            Орц
          </Typography>
          <Typography
            borderRadius={1}
            padding={1}
            bgcolor={"#F6F6F6"}
            fontSize={16}
            fontWeight={400}
          >
            {foodIngredients}
          </Typography>
        </Stack>
        <Typography>Тоо</Typography>
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Stack
            onClick={() => {
              changeFoodCount(-1);
              setFoodTotal(foodCount * foodPrice);
            }}
            bgcolor={"primary.main"}
            borderRadius={"10px"}
            p={"8px"}
            color={"common.white"}
          >
            <Remove />
          </Stack>
          <Typography fontSize={16} fontWeight={500} color={"#171717"}>
            {foodCount}
          </Typography>
          <Stack
            onClick={() => {
              changeFoodCount(1);
              setFoodTotal(foodCount * foodPrice);
            }}
            bgcolor={"primary.main"}
            borderRadius={"10px"}
            p={"8px"}
            color={"common.white"}
          >
            <Add />
          </Stack>
        </Stack>
        <Button variant="contained">Сагслах</Button>
        <Typography color={"primary.main"} fontSize={18} fontWeight={600}>
          {Boolean(foodTotal) && foodTotal}
        </Typography>
      </Stack>
    </Stack>
  );
};
