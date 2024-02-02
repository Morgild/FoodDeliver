import { SignUp } from "@/components/SignUp";
import { Box } from "@mui/material";

export default function Signup() {
  return (
    <Box
      minWidth={"448px"}
      sx={{ margin: "auto", marginTop: "111px", marginBottom: "75px" }}
    >
      <SignUp />
    </Box>
  );
}
