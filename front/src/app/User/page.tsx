"use client";
import { ChangeProfilePic } from "@/components/ChangeProfilePic";
import { UserCard } from "@/components/UserCard";
import { useAuth } from "@/components/providers/AuthProvider";
import { EditOutlined, Logout, Restore } from "@mui/icons-material";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { AxiosError } from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../common/axios";

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
  const { user, signOut, refresh, setRefresh } = useAuth();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [imageUrl, setImageUrl] = useState("");

  const { name, email, phone, profilePic } = user;
  const userInfo = [
    { title: "Таны нэр", text: name },
    { title: "Утасны дугаар", text: phone },
    { title: "И-мэйл", text: email },
  ];

  const updateUser = async (
    profilePic: string,
    name: string,
    phone: string,
    email: string
  ) => {
    try {
      const { data } = await api.post(
        "user/updateUser",
        {
          profilePic,
          name,
          phone,
          email,
        },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      console.log(data);
      toast.success(data.message, {
        position: "top-center",
        hideProgressBar: true,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message ?? error.message, {
          position: "top-center",
          hideProgressBar: true,
        });
      }
      console.log(error), "FFF";
    }
  };
  return (
    <>
      <Stack
        gap={6}
        sx={{ alignItems: "center" }}
        marginTop={"76px"}
        marginBottom={"199px"}
        maxWidth={"432px"}
        minWidth={"432px"}
        alignSelf={"center"}
      >
        <Stack gap={5} alignItems={"center"}>
          <Stack>
            <Stack width={120} height={120} position={"relative"}>
              <Stack borderRadius={"50%"} overflow={"hidden"}>
                <img
                  src={profilePic ? profilePic : imageUrl}
                  alt="avatar"
                  width={120}
                  height={120}
                />
              </Stack>

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
            {name}
          </Typography>
        </Stack>
        <Stack width={1} alignItems={"center"} gap={2} padding={"16px 20px"}>
          {userInfo.map((item) => (
            <UserCard title={item.title} text={item.text} />
          ))}
          <Stack
            width={1}
            bgcolor={"#common.white"}
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
              <Restore fontSize="inherit" />
            </Stack>
            <Stack gap={0.5} width={1} justifyContent={"center"}>
              <Typography fontSize={16} fontWeight={400} color={"#0D1118"}>
                Захиалгын түүх
              </Typography>
            </Stack>
          </Stack>
          <Stack
            onClick={() => {
              signOut();
            }}
            width={1}
            bgcolor={"common.white"}
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
              <Logout fontSize="inherit" />
            </Stack>
            <Stack gap={0.5} width={1} justifyContent={"center"}>
              <Typography fontSize={16} fontWeight={400} color={"#0D1118"}>
                Гарах
              </Typography>
            </Stack>
          </Stack>
          <Button
            onClick={() => {
              alert("test");
              updateUser(
                imageUrl,
                "new name",
                "88088722",
                "morgild1@gmail.com"
              );
              setRefresh(refresh + 1);
            }}
            fullWidth
            sx={{ py: "8px" }}
            variant="contained"
          >
            <Typography>Хадгалах</Typography>
          </Button>
        </Stack>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ChangeProfilePic
            handleClose={handleClose}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
          />
        </Box>
      </Modal>
    </>
  );
}
