import { ArrowBackIos } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Poppins } from "next/font/google";
import { BasketItem } from "./BasketItem";
import { useData } from "../providers/DataProvider";
import { usePathname, useRouter } from "next/navigation";

type BasketProps = { toggleDrawer: () => void };

const numberFormatter = new Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const Basket = (props: BasketProps) => {
  const { basket } = useData();
  const router = useRouter();
  const pathname = usePathname();
  const { toggleDrawer } = props;
  const sumBasket = basket.reduce((sum, currentValue) => {
    return (
      sum +
      currentValue.foodPrice *
        currentValue.foodCount *
        (1 - 0.01 * (currentValue.discount || 0))
    );
  }, 0);
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      height={"100vh"}
      justifyContent={"space-between"}
      position={"relative"}
    >
      <Stack padding={"18px 16px"}>
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          pb={"18px"}
        >
          <Stack
            onClick={() => {
              toggleDrawer();
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
        <Stack borderTop={1} borderColor={"#D6D8DB"} py={1}>
          {Boolean(basket) &&
            basket.map((item, index) => (
              <BasketItem
                key={index}
                foodName={item.foodName}
                foodPic={item.foodPic}
                foodIngredients={item.foodIngredients}
                foodCount={item.foodCount}
                foodPrice={item.foodPrice}
                discount={item.discount}
              />
            ))}
        </Stack>
      </Stack>
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        justifySelf={"flex-end"}
        borderColor={"#D6D8DB"}
        p={3}
        position={"sticky"}
        bottom={0}
        bgcolor={"common.white"}
        width={1}
        boxShadow={3}
      >
        <Stack>
          <Typography fontSize={18} fontWeight={400} color={"#5E6166"}>
            Нийт төлөх дүн
          </Typography>
          <Typography fontSize={18} fontWeight={700} color={"#121316"}>
            {numberFormatter.format(sumBasket)}
          </Typography>
        </Stack>
        <Button
          onClick={() => {
            if (!pathname.includes("/Order")) {
              router.push("/Order");
              toggleDrawer();
            }
          }}
          variant="contained"
        >
          <Typography fontSize={14} fontWeight={400}>
            Захиалах
          </Typography>
        </Button>
      </Stack>
    </Box>
  );
};
