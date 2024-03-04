"use client";
import { LoadingPage } from "@/components/LoadingPage";
import { OrderHistory } from "@/components/Order/OrderHistory";
import { OrderHistoryFoods } from "@/components/Order/OrderHistoryFoods";
import { useAuth } from "@/components/providers/AuthProvider";
import { useData } from "@/components/providers/DataProvider";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function OrderList() {
  const { orderList } = useData();
  const { isReady } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState("");

  const foods = orderList.find((item) => item._id == selectedOrder)?.foods;

  if (!isReady) return <LoadingPage />;
  return (
    <Container
      maxWidth="lg"
      sx={{
        p: "42px",
        display: "flex",
        flexDirection: { xs: "column-reverse", md: "row" },
        justifyContent: "space-around",
        gap: { xs: 2, md: 0 },
      }}
    >
      <Box
        p={3}
        borderRadius={"16px"}
        boxShadow={1}
        width={{ md: "432px", xs: "350px" }}
      >
        <Stack gap={2}>
          <Typography fontSize={20} fontWeight={400}>
            Захиалгын түүх
          </Typography>
          {orderList
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((item, index) => (
              <OrderHistory
                key={index}
                {...item}
                setSelectedOrder={setSelectedOrder}
              />
            ))}
        </Stack>
      </Box>
      <Box
        width={{ md: "432px", xs: "350px" }}
        p={3}
        borderRadius={"16px"}
        boxShadow={1}
      >
        <Stack gap={2}>
          <Typography fontSize={20} fontWeight={400}>
            Захиалгын дэлгэрэнгүй
          </Typography>
          {foods?.map((item, index) => (
            <OrderHistoryFoods key={index} {...item} />
          ))}
        </Stack>
      </Box>
    </Container>
  );
}
