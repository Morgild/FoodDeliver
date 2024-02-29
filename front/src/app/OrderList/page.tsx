"use client";
import { OrderHistory } from "@/components/Order/OrderHistory";
import { OrderHistoryFoods } from "@/components/Order/OrderHistoryFoods";
import { useData } from "@/components/providers/DataProvider";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function OrderList() {
  const { orderList } = useData();
  const [selectedOrder, setSelectedOrder] = useState("");
  const select = orderList
    .filter((item) => item._id == selectedOrder)
    .map((item) => {
      if (item._id == selectedOrder) return item.foods;
    });
  const entries = Object.values(select)[0];
  console.log(entries);
  return (
    <Container
      maxWidth="lg"
      sx={{
        p: "42px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <Box p={3} borderRadius={"16px"} boxShadow={1}>
        <Stack gap={2}>
          <Typography fontSize={20} fontWeight={400}>
            Захиалгын түүх
          </Typography>
          {orderList
            // .sort((a, b) => (
            //   a.createdAt - b.createdAt;
            // ))
            .map((item, index) => (
              <OrderHistory
                key={index}
                {...item}
                setSelectedOrder={setSelectedOrder}
              />
            ))}
        </Stack>
      </Box>
      <Box minWidth={400} p={3} borderRadius={"16px"} boxShadow={1}>
        <Stack gap={2}>
          <Typography fontSize={20} fontWeight={400}>
            Захиалгын дэлгэрэнгүй
          </Typography>
          {entries?.map((item, index) => (
            <OrderHistoryFoods key={index} {...item} />
          ))}
        </Stack>
      </Box>
    </Container>
  );
}
