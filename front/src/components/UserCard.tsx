import { EditOutlined, PersonOutline } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";

export const UserCard = () => {
  return (
    <Stack
      width={1}
      bgcolor={"#F6F6F6"}
      flexDirection={"row"}
      borderRadius={"4px"}
      padding={"8px 20px"}
      gap={1}
      justifyContent={"space-between"}
    >
      <Stack
        padding={1}
        alignItems={"center"}
        justifyContent={"center"}
        borderRadius={"50%"}
        bgcolor={"common.white"}
        fontSize={"24px"}
        alignSelf={"center"}
      >
        <PersonOutline fontSize="inherit" />
      </Stack>
      <Stack gap={0.5} width={1}>
        <Typography fontSize={12} fontWeight={400} color={"#888A99"}>
          Таны нэр
        </Typography>
        <Typography fontSize={16} fontWeight={400} color={"#0D1118"}>
          Угтахбаяр
        </Typography>
      </Stack>
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        color={"primary.main"}
      >
        <EditOutlined />
      </Stack>
    </Stack>
  );
};
