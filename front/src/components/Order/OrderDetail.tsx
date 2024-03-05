import { Check } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

type OrderDetailProps = {
  deliveryStatus: string;
  createdAt: Date;
  _id: string;
  userID: string;
  selectedOrder: string;
  setSelectedOrder: Dispatch<SetStateAction<string>>;
};
export const OrderDetail = (props: OrderDetailProps) => {
  const {
    deliveryStatus,
    _id,
    userID,
    selectedOrder,
    setSelectedOrder,
    createdAt,
  } = props;
  return (
    <Stack
      onClick={() => {
        setSelectedOrder(_id);
      }}
      flexDirection={"row"}
      gap={1}
      alignItems={"center"}
      bgcolor={"common.white"}
      boxShadow={_id == selectedOrder ? 2 : 0}
      borderRadius={2}
      p={1}
      sx={{ cursor: "pointer" }}
      width={1}
      overflow={"hidden"}
    >
      <Stack
        width={{ md: 36, xs: 24 }}
        height={{ md: 36, xs: 24 }}
        sx={{ aspectRatio: 1 / 1 }}
        border={1}
        borderRadius={"50%"}
        borderColor={deliveryStatus == "Амжилттай" ? "primary.main" : "#0468C8"}
        alignItems={"center"}
        justifyContent={"center"}
        bgcolor={
          deliveryStatus == "Амжилттай" ? "primary.main" : "common.white"
        }
      >
        <Stack
          width={{ md: 18, xs: 12 }}
          height={{ md: 18, xs: 12 }}
          bgcolor={deliveryStatus == "Амжилттай" ? "primary.main" : "#0468C8"}
          borderRadius={"50%"}
          color={"common.white"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {deliveryStatus == "Амжилттай" && <Check color="inherit" />}
        </Stack>
      </Stack>
      <Stack>
        <Typography fontSize={14} fontWeight={600}>
          OrderID:{_id.slice(-10)}
        </Typography>

        <Typography fontSize={12}>{deliveryStatus}</Typography>
        <Stack flexDirection={"row"} gap={1}>
          <Typography fontSize={12}>
            {createdAt.toString().slice(0, 10)}
          </Typography>
          <Typography fontSize={12}>
            {createdAt.toString().slice(11, 19)}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
