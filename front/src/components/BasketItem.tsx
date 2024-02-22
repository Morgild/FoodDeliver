import { Add, Close, Remove } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";

type BasketItemProps = {
  foodName: string;
  foodPic: string;
  foodIngredients: string;
  foodCount: number;
};
export const BasketItem = (props: BasketItemProps) => {
  const { foodName, foodPic, foodIngredients, foodCount } = props;
  return (
    <Stack flexDirection={"row"} p={2} gap={2} borderRadius={"8px"}>
      <Stack width={0.5} flexGrow={1} position={"relative"}>
        <Image objectFit="fill" src={foodPic} fill alt="food image" />
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
              34800
            </Typography>
          </Stack>
          <Close />
        </Stack>
        <Typography>{foodIngredients}</Typography>
        <Stack>
          <Stack width={1} gap={"12px"}></Stack>
          <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
            <Stack
              bgcolor={"primary.main"}
              borderRadius={"10px"}
              p={"8px"}
              color={"common.white"}
            >
              <Remove />
            </Stack>
            <Typography px={1} fontSize={16} fontWeight={500} color={"#171717"}>
              {foodCount}
            </Typography>
            <Stack
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
