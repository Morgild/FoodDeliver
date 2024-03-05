import {
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { useData } from "../providers/DataProvider";
import Image from "next/image";

import { CheckBox, DeliveryDining, RamenDining } from "@mui/icons-material";
import { CustomSelect } from "./CustomSelect";

type OrderDetailProps = {
  selectedOrder: string;
  setSelectedOrder: Dispatch<SetStateAction<string>>;
};
export const AllOrderDetail = (props: OrderDetailProps) => {
  const { allOrders, numberFormatter, changeOrderStatus } = useData();
  const { selectedOrder } = props;
  const foods = allOrders.find((item) => item._id == selectedOrder)?.foods;
  const selected = allOrders.find((item) => item._id == selectedOrder);
  const address = allOrders.find(
    (item) => item._id == selectedOrder
  )?.deliveryAddress;
  const [changeStatus, setChangeStatus] = useState(selected?.deliveryStatus);

  return (
    <Stack gap={1}>
      <Typography color={"primary.main"} fontSize={22} fontWeight={600}>
        Order detail
      </Typography>
      <Stack flexDirection={"row"} gap={2}>
        <Typography fontSize={18} fontWeight={600}>
          Order ID:
        </Typography>
        <Typography>{selectedOrder}</Typography>
      </Stack>
      <Stack flexDirection={"row"} gap={1}>
        <Typography fontSize={18} fontWeight={600}>
          User ID:
        </Typography>
        <Typography>{selected?.userID}</Typography>
      </Stack>
      <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
        <Typography fontSize={18} fontWeight={600}>
          Delivery Status:
        </Typography>
        <Stack
          flexDirection={"row"}
          bgcolor={"#D6D8DB"}
          p={0.5}
          borderRadius={2}
        >
          <Stack
            onClick={() => {
              changeOrderStatus(selectedOrder, "Хүлээгдэж буй");
            }}
            flexDirection={"row"}
            gap={1}
            bgcolor={
              selected?.deliveryStatus == "Амжилттай" ? "#D6D8DB" : "#0468C8"
            }
            borderRadius={2}
            p={1}
            color={"common.white"}
            sx={{ cursor: "pointer" }}
          >
            <DeliveryDining />
            <Typography>Хүлээгдэж буй</Typography>
          </Stack>
          <Stack
            onClick={() => {
              changeOrderStatus(selectedOrder, "Амжилттай");
            }}
            flexDirection={"row"}
            gap={1}
            bgcolor={
              selected?.deliveryStatus == "Амжилттай"
                ? "primary.main"
                : "#D6D8DB"
            }
            borderRadius={2}
            p={1}
            color={"common.white"}
            sx={{ cursor: "pointer" }}
          >
            <RamenDining />
            <Typography>Амжилттай</Typography>
          </Stack>
        </Stack>
      </Stack>

      {address &&
        address?.map((item, index) => (
          <Stack key={index} flexDirection={"column"} gap={2}>
            <Stack flexDirection={"row"} gap={2}>
              <Typography fontSize={18} fontWeight={600}>
                Delivery address:
              </Typography>
              <Typography>
                {item.district}, {item.khoroo}, {item.bair}, {item.additional}
              </Typography>
            </Stack>
            <Stack flexDirection={"row"} gap={2}>
              <Typography fontSize={18} fontWeight={600}>
                Phone:
              </Typography>
              <Typography>{item.phone}</Typography>
            </Stack>
          </Stack>
        ))}

      <Grid container spacing={2}>
        {foods &&
          foods?.map((item: any, index: number) => {
            return (
              <Grid
                item
                flexDirection={"row"}
                p={2}
                gap={2}
                borderRadius={"8px"}
                xs={12}
                md={5}
                lg={4}
              >
                <Stack
                  width="100%"
                  sx={{ aspectRatio: 3 / 2 }}
                  position={"relative"}
                  borderRadius={"8px"}
                  overflow={"hidden"}
                >
                  <Image
                    objectFit="cover"
                    src={item.foodPic}
                    fill
                    alt="food image"
                  />
                  {Boolean(item.discount) && (
                    <Typography
                      color="common.white"
                      fontSize={12}
                      fontWeight={600}
                      bgcolor="primary.main"
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        border: 1,
                        borderColor: "common.white",
                        width: "fit-content",
                        p: "4px 8px",
                        borderRadius: "16px",
                      }}
                    >
                      {item.discount}%
                    </Typography>
                  )}
                </Stack>
                <Stack width={1} height={"100%"} gap={{ md: 1, xs: 0 }}>
                  <Stack
                    flexDirection={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Typography fontSize={{ md: 22, xs: 16 }} fontWeight={600}>
                      {item.foodName}-{item.foodCount}
                    </Typography>
                  </Stack>
                  <Typography fontSize={18} fontWeight={600}>
                    {numberFormatter.format(
                      Boolean(item.discount)
                        ? item.foodPrice *
                            item.foodCount *
                            (1 - 0.01 * (item.discount || 0))
                        : item.foodPrice * item.foodCount
                    )}
                  </Typography>
                  <Typography fontSize={{ md: 16, xs: 12 }}>
                    Ingredients: {item.foodIngredients}
                  </Typography>
                  <Stack></Stack>
                </Stack>
              </Grid>
            );
          })}
      </Grid>
    </Stack>
  );
};
