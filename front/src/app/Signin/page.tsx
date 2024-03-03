import { SignIn } from "@/components/Authorization/SignIn";
import { Box } from "@mui/material";

export default function Signin() {
  return (
    <Box
      sx={{
        width: { sx: "350px", md: "450px" },
        margin: "auto",
        marginTop: "111px",
        marginBottom: "75px",
      }}
    >
      <SignIn />
    </Box>
  );
}
