import { CircularProgress, LinearProgress, Stack } from "@mui/material";

export const LoadingPage = () => {
  return (
    <Stack
      width={"100vw"}
      height={"100vw"}
      bgcolor={"common.white"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <LinearProgress />
      <CircularProgress />
    </Stack>
  );
};
