import { Add, Close, Remove } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { number } from "yup";
import { useData } from "./providers/DataProvider";
import { usePathname, useRouter } from "next/navigation";

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
  const { basket, setBasket } = useData();
  const router = useRouter();
  const pathname = usePathname();
  const sumBasket = numberFormatter.format(
    Boolean(discount)
      ? foodPrice * foodCount * (1 - 0.01 * (discount || 0))
      : foodPrice * foodCount
  );
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
              {sumBasket}
            </Typography>
          </Stack>
          <Close
            onClick={() => {
              const newBasket = basket.filter(
                (element) => element.foodName != foodName
              );
              setBasket(newBasket);
            }}
          />
        </Stack>
        <Typography>{foodIngredients}</Typography>
        <Stack>
          <Stack width={1} gap={"12px"}></Stack>
          {!pathname.includes("/Order") && (
            <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
              <Stack
                onClick={() => {
                  const newBasket = basket.map((element) => {
                    if (element.foodName == foodName) {
                      if (element.foodCount > 1) {
                        element.foodCount -= 1;
                      }
                      return element;
                    } else {
                      return element;
                    }
                  });
                  setBasket(newBasket);
                }}
                bgcolor={"primary.main"}
                borderRadius={"10px"}
                p={"8px"}
                color={"common.white"}
              >
                <Remove />
              </Stack>
              <Typography
                px={1}
                fontSize={16}
                fontWeight={500}
                color={"#171717"}
              >
                {foodCount}
              </Typography>
              <Stack
                onClick={() => {
                  const newBasket = basket.map((element) => {
                    if (element.foodName == foodName) {
                      element.foodCount += 1;
                      return element;
                    } else {
                      return element;
                    }
                  });
                  setBasket(newBasket);
                }}
                bgcolor={"primary.main"}
                borderRadius={"10px"}
                p={"8px"}
                color={"common.white"}
              >
                <Add />
              </Stack>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};
