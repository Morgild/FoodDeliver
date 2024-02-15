"use client";
import {
  AppBar,
  Box,
  Container,
  Drawer,
  List,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { CustomInput } from "./CustomInput";
import * as React from "react";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { usePathname, useRouter } from "next/navigation";
import path from "path";
import { Basket } from "./Basket";
import { useAuth } from "./providers/AuthProvider";
type NavBarProps = {
  open?: boolean;
  onClose?: () => void;
};

const menuItems = ["НҮҮР", "ХООЛНЫ ЦЭС", "ХҮРГЭЛТИЙН БҮС"];
export const NavBar = (props: NavBarProps) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 448,
    bgcolor: "background.paper",
    border: "1px solid #DADCE0",
    boxShadow: 24,
    p: 4,
    borderRadius: "16px",
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLogged } = useAuth();
  const { name, profilePic } = user;
  const [state, setState] = React.useState(false);
  const toggleDrawer = () => {
    setState((prev) => !prev);
  };

  return (
    <Container maxWidth="lg">
      <AppBar
        position="static"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#fff",
          boxShadow: 0,
          py: "8px",
        }}
      >
        <Stack gap="24px" flexDirection="row" alignItems="center">
          <Image
            onClick={() => {
              router.push("/");
            }}
            src="/Logo.png"
            width={31.26}
            height={26.76}
            alt="logo"
          />
          <List sx={{ display: "flex", alignItems: "center", gap: "24px" }}>
            {menuItems.map((item) => (
              <Stack key={item}>
                <Stack
                  onClick={() => {
                    if (item == "НҮҮР") {
                      router.push("/");
                    }
                  }}
                  sx={{ textAlign: "center", cursor: "pointer" }}
                >
                  <Typography
                    fontSize="14px"
                    fontWeight={700}
                    color="common.black"
                  >
                    {item}
                  </Typography>
                </Stack>
              </Stack>
            ))}
          </List>
        </Stack>
        <Stack flexDirection="row" gap={2} sx={{ alignItems: "center" }}>
          <CustomInput type="search" />
          <Stack
            onClick={toggleDrawer}
            gap={2}
            flexDirection={"row"}
            sx={{ p: "8px 16px", cursor: "pointer" }}
          >
            <Image alt="basket" src="/basket.png" width={24} height={24} />
            <Typography color="common.black" fontSize={14} fontWeight={700}>
              Сагс
            </Typography>
          </Stack>
          <Stack
            gap={2}
            alignItems={"center"}
            flexDirection={"row"}
            sx={{ p: "8px 16px" }}
          >
            <Stack borderRadius={"50%"} overflow={"hidden"}>
              <img
                alt="basket"
                src={isLogged ? profilePic : "/avatar.png"}
                width={24}
                height={24}
              />
            </Stack>
            <Typography
              onClick={() => {
                if (isLogged) {
                  router.push("/User");
                } else {
                  handleOpen();
                }
              }}
              color="common.black"
              fontSize={14}
              fontWeight={700}
              sx={{ cursor: "pointer" }}
            >
              {isLogged ? name : "Нэвтрэх"}
            </Typography>
          </Stack>
        </Stack>
      </AppBar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <SignIn handleClose={handleClose} />
        </Box>
      </Modal>
      <Drawer anchor="right" open={state} onClose={toggleDrawer}>
        <Stack width="40vw">
          <Basket toggledrawer={toggleDrawer} />
        </Stack>
      </Drawer>
    </Container>
  );
};
