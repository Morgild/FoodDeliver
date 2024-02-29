import { Box, Modal, Stack, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useData } from "../providers/DataProvider";

type LogoutComfirmProps = { setOpenLogOut: Dispatch<SetStateAction<boolean>> };
export const LogoutConfirm = (props: LogoutComfirmProps) => {
  const { signOut } = useAuth();
  const { setBasket } = useData();
  const router = useRouter();
  const { setOpenLogOut } = props;
  return (
    <Stack marginTop={"40px"}>
      <Typography
        py={5}
        color={"#171717"}
        fontSize={20}
        fontWeight={600}
        width={1}
        textAlign={"center"}
      >
        Та системээс гарахдаа итгэлтэй байна уу?
      </Typography>
      <Stack flexDirection={"row"} width={1} gap={"1px"}>
        <Typography
          onClick={() => {
            signOut();
            setBasket([]);
            router.push("/");
          }}
          width={0.5}
          bgcolor={"#18BA5133"}
          textAlign={"center"}
          fontSize={20}
          fontWeight={600}
          padding={"20px"}
          sx={{
            "&:hover": {
              backgroundColor: "#18BA51",
              color: "common.white",
            },
          }}
        >
          Тийм
        </Typography>
        <Typography
          onClick={() => {
            setOpenLogOut(false);
          }}
          width={0.5}
          bgcolor={"#18BA5133"}
          textAlign={"center"}
          fontSize={20}
          fontWeight={600}
          padding={"20px"}
          sx={{
            "&:hover": {
              backgroundColor: "#18BA51",
              color: "common.white",
            },
          }}
        >
          Үгүй
        </Typography>
      </Stack>
    </Stack>
  );
};
