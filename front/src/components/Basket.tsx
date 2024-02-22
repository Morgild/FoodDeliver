import { ArrowBackIos } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Poppins } from "next/font/google";
import { BasketItem } from "./BasketItem";

type BasketProps = { toggledrawer: () => void };
type Basket = {
  foodName: string;
  foodCategory: string;
  foodIngredients: string;
  foodPrice: number;
  discount?: number;
  foodPic: string;
  foodCount: number;
};

export const Basket = (props: BasketProps) => {
  const { toggledrawer } = props;
  const basketFoods = JSON.parse(localStorage.getItem("basket")) as Basket[];
  console.log(basketFoods);
  return (
    <Box
      padding={"18px 16px"}
      display={"flex"}
      flexDirection={"column"}
      height={"100vh"}
      justifyContent={"space-between"}
    >
      <Stack>
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          pb={"18px"}
        >
          <Stack
            onClick={() => {
              toggledrawer();
            }}
            width={48}
            height={48}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ cursor: "pointer" }}
          >
            <ArrowBackIos />
          </Stack>
          <Stack justifyContent={"center"} alignItems={"center"} height={1}>
            <Typography
              textAlign={"center"}
              width={1}
              fontSize={20}
              fontWeight={900}
              color={"common.black"}
            >
              Таны сагс
            </Typography>
          </Stack>

          <Stack width={48} height={48}></Stack>
        </Stack>
        <Stack borderTop={1} borderBottom={1} borderColor={"#D6D8DB"} py={1}>
          {basketFoods.map((item, index) => (
            <BasketItem
              key={index}
              foodName={item.foodName}
              foodPic={item.foodPic}
              foodIngredients={item.foodIngredients}
              foodCount={item.foodCount}
            />
          ))}
        </Stack>
      </Stack>
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        justifySelf={"flex-end"}
      >
        <Stack>
          <Typography fontSize={18} fontWeight={400} color={"#5E6166"}>
            Нийт төлөх дүн
          </Typography>
          <Typography fontSize={18} fontWeight={700} color={"#121316"}>
            34800
          </Typography>
        </Stack>
        <Button variant="contained">
          <Typography fontSize={14} fontWeight={400}>
            Захиалах
          </Typography>
        </Button>
      </Stack>
    </Box>
  );
};
