import { Check } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type OrderHistoryFoodsProps = { foodName: string; foodCount: number };
export const OrderHistoryFoods = (props: OrderHistoryFoodsProps) => {
  const { foodName, foodCount } = props;

  return (
    <Stack
      flexDirection={"row"}
      p={2}
      gap={1}
      borderBottom={1}
      borderColor={"#D6D8DB"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Stack minWidth={200}>
        <Typography fontSize={16} fontWeight={400}>
          {foodName}
        </Typography>
      </Stack>
      <Stack>
        <Typography fontSize={16} fontWeight={400} color={"#272727"}>
          ({foodCount})
        </Typography>
      </Stack>
    </Stack>
  );
};
