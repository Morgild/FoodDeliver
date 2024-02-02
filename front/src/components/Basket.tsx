import { ArrowBackIos } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { Poppins } from "next/font/google";

type BasketProps = { toggledrawer: () => void };

export const Basket = (props: BasketProps) => {
  const { toggledrawer } = props;
  return (
    <Box padding={"26px 24px"}>
      <Stack flexDirection={"row"} justifyContent={"space-between"}>
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
        <Stack justifyContent={"center"}>
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
    </Box>
  );
};
