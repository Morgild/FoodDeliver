import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";

export const EditCategory = () => {
  return (
    <Stack
      position="absolute"
      top={"-50%"}
      right={"100%"}
      sx={{ transform: "translate(110%, -20%)" }}
      borderRadius={"8px"}
      bgcolor={"common.white"}
      boxShadow={1}
      zIndex={1}
      width={"200px"}
    >
      <Stack
        flexDirection={"row"}
        gap={2}
        padding={"8px 16px"}
        color={"#525252"}
      >
        <EditOutlined color="inherit" />
        <Typography>Edit name</Typography>
      </Stack>
      <Stack
        flexDirection={"row"}
        gap={2}
        padding={"8px 16px"}
        color={"#DF1F29"}
      >
        <DeleteOutline color={"inherit"} />
        <Typography color={"#DF1F29"}>Delete Category</Typography>
      </Stack>
    </Stack>
  );
};
