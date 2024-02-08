"use client";
import { ChangeProfilePic } from "@/components/ChangeProfilePic";
import { UserCard } from "@/components/UserCard";
import { useAuth } from "@/components/providers/AuthProvider";
import { EditOutlined } from "@mui/icons-material";
import { Box, Modal, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

type UserProfileProps = { name: string; open?: boolean; onClose?: () => void };

export default function User(props: UserProfileProps) {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 448,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 1,
  };
  const {} = props;
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const { name, email, phone } = user;
  console.log(user);
  return (
    <>
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
              <Image
                src={"/profile.png"}
                alt="avatar"
                width={120}
                height={120}
              />
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
                onClick={() => {
                  setOpen((prev) => !prev);
                }}
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ChangeProfilePic handleClose={handleClose} />
        </Box>
      </Modal>
    </>
  );
}
