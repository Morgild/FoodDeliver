import { Add, Close, Remove } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { bool } from "yup";
import { useData } from "../providers/DataProvider";
import { useAuth } from "../providers/AuthProvider";
import { toast } from "react-toastify";
type FoodDetailProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  foodName: string;
  foodPrice: number;
  discount?: number;
  foodPic: string;
  foodIngredients: string;
  foodCategory: string;
};
export const FoodDetail = (props: FoodDetailProps) => {
  const {
    setOpen,
    foodName,
    foodPrice,
    discount,
    foodPic,
    foodIngredients,
    foodCategory,
  } = props;
  const { isLogged } = useAuth();
  const { basket, setBasket } = useData();
  const [foodCount, setFoodCount] = useState(1);
  const [foodTotal, setFoodTotal] = useState(0);
  const [inBasket, setInBasket] = useState(false);

  const numberFormatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
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
        borderRadius={1}
        overflow={"hidden"}
        width={0.5}
        sx={{ aspectRatio: 1 / 1 }}
      >
        <Image objectFit="fill" src={foodPic} alt="food image" fill />
        <Typography
          color="common.white"
          fontSize={18}
          fontWeight={600}
          bgcolor="primary.main"
          sx={{
            position: "absolute",
            top: "8%",
            right: "10%",
            border: 1,
            borderColor: "common.white",
            width: "fit-content",
            borderRadius: "16px",
          }}
          padding={Boolean(discount) ? "4px 16px" : 0}
        >
          {Boolean(discount) && discount} {Boolean(discount) && "%"}
        </Typography>
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
        <Stack position={"relative"}>
          <Typography fontSize={28} fontWeight={700} color={"common.black"}>
            {foodName}
          </Typography>
          <Stack flexDirection={"row"} gap={2} alignItems={"center"}>
            <Typography color={"primary.main"} fontSize={18} fontWeight={600}>
              {discount
                ? numberFormatter.format((1 - discount / 100) * foodPrice)
                : numberFormatter.format(foodPrice)}
              ₮
            </Typography>
            <Typography
              color={"#171717"}
              fontSize={16}
              fontWeight={500}
              sx={{ textDecoration: "line-through" }}
            >
              {Boolean(discount) && numberFormatter.format(foodPrice)}
              {Boolean(discount) && "₮"}
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
            }}
            bgcolor={"primary.main"}
            borderRadius={"10px"}
            p={"8px"}
            color={"common.white"}
          >
            <Add />
          </Stack>
        </Stack>
        <Button
          variant="contained"
          onClick={() => {
            let inBasket = false;
            const newBasket = basket.map((element) => {
              if (element.foodName == foodName) {
                inBasket = true;
                element.foodCount += foodCount;
                return element;
              } else {
                return element;
              }
            });
            if (!inBasket) {
              setBasket([
                ...basket,
                {
                  foodName,
                  foodCategory,
                  foodIngredients,
                  foodPrice,
                  discount,
                  foodPic,
                  foodCount,
                },
              ]);
            } else {
              setBasket(newBasket);
            }
            setOpen(false);
          }}
        >
          Сагслах
        </Button>
      </Stack>
    </Stack>
  );
};
