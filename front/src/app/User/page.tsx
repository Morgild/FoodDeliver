import { UserCard } from "@/components/UserCard";
import { EditOutlined } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";

type UserProfileProps = {};

export default function User(props: UserProfileProps) {
  const {} = props;
  return (
    <Stack
      gap={6}
      sx={{ alignItems: "center" }}
      marginTop={"76px"}
      bgcolor={"primary.main"}
      maxWidth={"432px"}
      minWidth={"432px"}
      alignSelf={"center"}
    >
      <Stack gap={5} bgcolor={"red"} alignItems={"center"}>
        <Stack>
          <Stack
            borderRadius={"50%"}
            width={120}
            height={120}
            bgcolor={"red"}
            position={"relative"}
          >
            <Image src={"/profile.png"} alt="avatar" width={120} height={120} />
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              width={34}
              height={34}
              borderRadius={5}
              border={1}
              borderColor={"#D6D8DB"}
              color={"primary.main"}
              fontSize={24}
              position={"absolute"}
              bgcolor={"common.white"}
              right={0}
              bottom={0}
            >
              <EditOutlined fontSize="inherit" />
            </Stack>
          </Stack>
        </Stack>
        <Typography fontSize={28} fontWeight={700} color={"#0D1118"}>
          Угтахбаяр
        </Typography>
      </Stack>
      <Stack
        width={1}
        alignItems={"center"}
        bgcolor={"blue"}
        gap={2}
        padding={"16px 20px"}
      >
        <UserCard />
      </Stack>
    </Stack>
  );
}
