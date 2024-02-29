"use client";
import {
  AppBar,
  Badge,
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { CustomInput } from "../User/CustomInput";
import * as React from "react";
import { SignIn } from "../User/SignIn";
import { usePathname, useRouter } from "next/navigation";
import { Basket } from "./Basket";
import { useAuth } from "../providers/AuthProvider";
import { useData } from "../providers/DataProvider";
import { ShoppingBasket, ShoppingBasketOutlined } from "@mui/icons-material";
import { FoodCategory } from "../Food/FoodCategory";
type NavBarProps = {
  open?: boolean;
  onClose?: () => void;
  toggleDrawer: () => void;
};

const menuItems = ["НҮҮР", "ХООЛНЫ ЦЭС", "ХҮРГЭЛТИЙН БҮС"];
export const NavBar = () => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "480px",
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
  const { user, isLogged, isAdmin } = useAuth();
  const { basket, setSearchValue } = useData();
  const { name, profilePic } = user;

  const [state, setState] = React.useState(false);
  const toggleDrawer = () => {
    setState((prev) => !prev);
  };

  const menuTranslate = (menu: string) => {
    if (menu == "НҮҮР") return "/";
    if (menu == "ХООЛНЫ ЦЭС") return "/Menu";
    if (menu == "ХҮРГЭЛТИЙН БҮС") return "/DeliveryRegion";
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
          <Stack
            onClick={() => {
              router.push("/");
            }}
            sx={{ cursor: "pointer" }}
          >
            <Image src="/Logo.png" width={31.26} height={26.76} alt="logo" />
          </Stack>
          <List sx={{ display: "flex", alignItems: "center", gap: "24px" }}>
            {menuItems.map((item) => (
              <Stack key={item}>
                <Stack
                  onClick={() => {
                    if (item == "НҮҮР") {
                      router.push("/");
                    }
                    if (item == "ХООЛНЫ ЦЭС") {
                      router.push("/Menu");
                    }
                    if (item == "ХҮРГЭЛТИЙН БҮС") {
                      router.push("/DeliveryRegion");
                    }
                  }}
                  sx={{ textAlign: "center", cursor: "pointer" }}
                >
                  <Typography
                    fontSize="14px"
                    fontWeight={700}
                    color={
                      pathname == menuTranslate(item)
                        ? "primary.main"
                        : "common.black"
                    }
                  >
                    {item}
                  </Typography>
                </Stack>
              </Stack>
            ))}
            {isAdmin && (
              <Typography
                onClick={() => {
                  router.push("/Admin");
                }}
                fontSize="14px"
                fontWeight={700}
                color={pathname == "/Admin" ? "primary.main" : "common.black"}
                sx={{ cursor: "pointer" }}
              >
                ADMIN
              </Typography>
            )}
          </List>
        </Stack>
        <Stack flexDirection="row" gap={2} sx={{ alignItems: "center" }}>
          <CustomInput
            type="search"
            onChange={(event) => {
              setSearchValue(event.target.value);
            }}
          />
          <Stack
            onClick={toggleDrawer}
            gap={2}
            flexDirection={"row"}
            sx={{ p: "8px 16px", cursor: "pointer" }}
            position={"relative"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <IconButton size="small">
              <Badge badgeContent={basket.length} color="warning">
                <ShoppingBasketOutlined />
              </Badge>
            </IconButton>

            <Typography color="common.black" fontSize={14} fontWeight={700}>
              Сагс
            </Typography>
          </Stack>
          <Stack
            onClick={() => {
              if (isLogged) {
                router.push("/User");
              } else {
                handleOpen();
              }
            }}
            gap={2}
            alignItems={"center"}
            flexDirection={"row"}
            sx={{ p: "8px 16px" }}
          >
            <Stack borderRadius={"50%"} overflow={"hidden"}>
              <Image
                alt="basket"
                src={isLogged ? profilePic : "/avatar.png"}
                width={24}
                height={24}
              />
            </Stack>
            <Typography
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
        <Stack width="40vw" maxWidth={"500px"}>
          <Basket toggleDrawer={toggleDrawer} />
        </Stack>
      </Drawer>
    </Container>
  );
};
