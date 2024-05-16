import { CircularProgress, LinearProgress, Stack } from "@mui/material";

export const LoadingPage = () => {
  return (
    <Stack
      width={"100vw"}
      height={"100vw"}
      bgcolor={"common.white"}
      justifyContent={"center"}
      alignItems={"start"}
    >
             <Typography fontsize={24}>Please Wait</Typography>
      <Typography fontsize={24}>...Loading Data</Typography>
      <CircularProgress />
    </Stack>
  );
};
