"use client";

import { AddressForm } from "@/components/Order/AddressForm";
import { Basket } from "@/components/Header-Footer/Basket";
import { BasketItem } from "@/components/Header-Footer/BasketItem";
import { TitleGreenStar } from "@/components/Home/TitleGreenStar";
import { useData } from "@/components/providers/DataProvider";
import { ArrowBackIos, Check } from "@mui/icons-material";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useState } from "react";

export default function Order() {
  const { basket, sumBasket, postOrder, numberFormatter } = useData();
  const [district, setDistrict] = useState("");
  const [khoroo, setKhoroo] = useState("");
  const [bair, setBair] = useState("");
  const [additional, setAdditional] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(true);

  const isValid =
    Boolean(district) &&
    Boolean(khoroo) &&
    Boolean(bair) &&
    Boolean(additional) &&
    Boolean(phone);

  return (
    <Container
      maxWidth="lg"
      sx={{
        p: "42px",
        display: "flex",
        flexDirection: "column",
        gap: "22px",
      }}
    >
      <Stack
        flexDirection={{ md: "row", xs: "column" }}
        justifyContent={"space-around"}
        gap={{ xs: 3 }}
      >
        <Stack width={{ md: "432px", xs: "350px" }} gap={3}>
          <Stack
            flexDirection={"row"}
            gap={2}
            padding={"16px 24px"}
            alignItems={"center"}
          >
            <Stack
              width={48}
              height={48}
              border={1}
              borderRadius={"50%"}
              borderColor={isValid ? "primary.main" : "#0468C8"}
              alignItems={"center"}
              justifyContent={"center"}
              bgcolor={isValid ? "primary.main" : "common.white"}
            >
              <Stack
                width={24}
                height={24}
                bgcolor={isValid ? "primary.main" : "#0468C8"}
                borderRadius={"50%"}
                color={"common.white"}
              >
                {isValid && <Check color="inherit" />}
              </Stack>
            </Stack>
            <Stack>
              <Typography color={"#8B8E95"} fontSize={14} fontWeight={400}>
                Алхам 1
              </Typography>
              <Typography color={"common.black"} fontSize={20} fontWeight={400}>
                Хаягийн мэдээлэл оруулах
              </Typography>
              <Typography color={"#0468C8"} fontSize={16} fontWeight={400}>
                Хүлээгдэж байна
              </Typography>
            </Stack>
          </Stack>
          <Stack boxShadow={1} p={3} borderRadius={2}>
            <AddressForm
              setDistrict={setDistrict}
              setKhoroo={setKhoroo}
              setBair={setBair}
              setAdditional={setAdditional}
              setPhone={setPhone}
              setPaymentMethod={setPaymentMethod}
              district={district}
              khoroo={khoroo}
              bair={bair}
              additional={additional}
              phone={phone}
              paymentMethod={paymentMethod}
            />
          </Stack>
        </Stack>
        <Stack width={{ md: "432px", xs: "350px" }} gap={3}>
          <Stack
            flexDirection={"row"}
            gap={2}
            padding={"16px 24px"}
            alignItems={"center"}
          >
            <Stack
              width={48}
              height={48}
              border={1}
              borderRadius={"50%"}
              borderColor={"#0468C8"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Stack
                width={24}
                height={24}
                bgcolor={"#0468C8"}
                borderRadius={"50%"}
              ></Stack>
            </Stack>
            <Stack>
              <Typography color={"#8B8E95"} fontSize={14} fontWeight={400}>
                Алхам 2
              </Typography>
              <Typography color={"common.black"} fontSize={20} fontWeight={400}>
                Захиалга баталгаажуулах
              </Typography>
              <Typography color={"#0468C8"} fontSize={16} fontWeight={400}>
                Хүлээгдэж байна
              </Typography>
            </Stack>
            <Stack>
              <Stack borderTop={1} borderColor={"#D6D8DB"} py={1}></Stack>
            </Stack>
          </Stack>
          <Stack boxShadow={1} borderRadius={2}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              // height={"100vh"}
              justifyContent={"space-between"}
              position={"relative"}
              // overflow={"scroll"}
            >
              <Stack padding={"18px 16px"}>
                <Stack borderTop={1} borderColor={"#D6D8DB"} py={1}>
                  {Boolean(basket) &&
                    basket.map((item, index) => (
                      <BasketItem
                        key={index}
                        foodName={item.foodName}
                        foodPic={item.foodPic}
                        foodIngredients={item.foodIngredients}
                        foodCount={item.foodCount}
                        foodPrice={item.foodPrice}
                        discount={item.discount}
                      />
                    ))}
                </Stack>
              </Stack>
              <Stack
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                justifySelf={"flex-end"}
                borderColor={"#D6D8DB"}
                p={3}
                position={"relative"}
                bottom={0}
                bgcolor={"common.white"}
                width={1}
                boxShadow={3}
              >
                <Stack>
                  <Typography fontSize={18} fontWeight={400} color={"#5E6166"}>
                    Нийт төлөх дүн
                  </Typography>
                  <Typography fontSize={18} fontWeight={700} color={"#121316"}>
                    {numberFormatter.format(sumBasket)}
                  </Typography>
                </Stack>
                <Button
                  onClick={() => {
                    postOrder(
                      {
                        district,
                        khoroo,
                        bair,
                        additional,
                        phone,
                        paymentMethod,
                      },
                      basket
                    );
                  }}
                  variant="contained"
                  disabled={!Boolean(sumBasket) || !isValid}
                >
                  <Typography fontSize={14} fontWeight={400}>
                    Захиалах
                  </Typography>
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
