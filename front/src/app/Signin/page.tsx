import { SignIn } from "@/components/SignIn";
import { Box } from "@mui/material";

export default function Signin() {
  return (
    <Box
      minWidth={"448px"}
      sx={{ margin: "auto", marginTop: "111px", marginBottom: "75px" }}
    >
      <SignIn />
    </Box>
  );
}
