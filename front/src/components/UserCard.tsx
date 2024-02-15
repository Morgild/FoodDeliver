import {
  EditOutlined,
  EmailOutlined,
  LocalPhoneOutlined,
  PersonOutline,
} from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { useAuth } from "./providers/AuthProvider";
import { title } from "process";
type UserCardProps = { title: string; text: string };
export const UserCard = (props: UserCardProps) => {
  const { title, text } = props;
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
        {title == "Таны нэр" && <PersonOutline fontSize="inherit" />}
        {title == "Утасны дугаар" && <LocalPhoneOutlined fontSize="inherit" />}
        {title == "И-мэйл" && <EmailOutlined fontSize="inherit" />}
      </Stack>
      <Stack gap={0.5} width={1}>
        <Typography fontSize={12} fontWeight={400} color={"#888A99"}>
          {title}
        </Typography>
        <Typography fontSize={16} fontWeight={400} color={"#0D1118"}>
          {text}
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
