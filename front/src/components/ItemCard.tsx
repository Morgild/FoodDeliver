import {} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { FoodDetail } from "./FoodDetail";
import { useEffect, useState } from "react";
import { useAuth } from "./providers/AuthProvider";
import { usePathname } from "next/navigation";

type ItemCardProps = {
  foodName: string;
  foodPrice: number;
  discount?: number;
  foodPic: string;
  foodIngredients: string;
};

export const ItemCard = (props: ItemCardProps) => {
  const { foodName, foodPrice, discount, foodPic, foodIngredients } = props;
  const [open, setOpen] = useState(false);
  const [inAdminPage, setInAdminPage] = useState(false);
  const pathname = usePathname();

  const isUserAdmin = () => {
    if (pathname == "/Admin") {
      setInAdminPage(true);
    } else {
      setInAdminPage(false);
    }
  };
  useEffect(() => {
    isUserAdmin();
  }, [inAdminPage]);
  console.log(inAdminPage);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "981px",
    width: "80%",

    bgcolor: "background.paper",
    border: "1px solid #DADCE0",
    boxShadow: 24,
    p: 2,
    borderRadius: "16px",
  };
  return (
    <Stack sx={{ width: 1, pb: 0 }}>
      <Stack
        sx={{ width: 1, boxShadow: 0, mx: "auto", pb: 0, position: "relative" }}
      >
        <Stack
          position={"relative"}
          sx={{
            // minHeight: 200,
            // boxShadow: 1,

            borderRadius: "16px",
            aspectRatio: 3 / 2,
          }}
          justifyContent={"center"}
          alignItems={"center"}
          // overflow={"hidden"}
          onClick={() => {
            setOpen(true);
          }}
        >
          <Image objectFit="fill" src={foodPic} alt="foodPicture" fill />
        </Stack>
        <Stack
          sx={{
            flexDirection: "column",
            justifyContent: "flex-start",
            mt: "14px",
            p: 0,
            width: 1,
            "&:last-child": {
              pb: 0,
            },
          }}
        >
          <Typography color="common.black" fontSize={20} fontWeight={590}>
            {foodName}
          </Typography>
          <Stack gap={2} alignItems="center" sx={{ flexDirection: "row" }}>
            <Typography
              fontSize={20}
              fontWeight={590}
              sx={{ color: "primary.main" }}
            >
              {discount ? (1 - discount / 100) * foodPrice : foodPrice}₮
            </Typography>
            <Typography
              fontSize={18}
              sx={{ color: "#171717", textDecoration: "line-through" }}
            >
              {Boolean(discount) && foodPrice}
            </Typography>
          </Stack>
        </Stack>
        {Boolean(discount) && (
          <Typography
            color="common.white"
            fontSize={18}
            fontWeight={600}
            bgcolor="primary.main"
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              border: 1,
              borderColor: "common.white",
              width: "fit-content",
              p: "4px 16px",
              borderRadius: "16px",
            }}
          >
            {discount}%
          </Typography>
        )}
      </Stack>
      <Modal
        open={!inAdminPage && open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FoodDetail
            setOpen={setOpen}
            foodName={foodName}
            foodPrice={foodPrice}
            discount={discount}
            foodPic={foodPic}
            foodIngredients={foodIngredients}
          />
        </Box>
      </Modal>
    </Stack>
  );
};
