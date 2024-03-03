import {} from "@mui/icons-material";
import { Box, Modal, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { FoodDetail } from "./FoodDetail";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type ItemCardProps = {
  foodName: string;
  foodPrice: number;
  discount?: number;
  foodPic: string;
  foodIngredients: string;
  foodCategory: string;
  setOpenFood?: Dispatch<SetStateAction<boolean>>;
  editFood?: boolean;
  setEditFood?: Dispatch<SetStateAction<boolean>>;
  setEditFoodName?: Dispatch<SetStateAction<string>>;
  setEditFoodCategory?: Dispatch<SetStateAction<string>>;
  setEditFoodIngredients?: Dispatch<SetStateAction<string>>;
  setEditFoodPrice?: Dispatch<SetStateAction<number>>;
  setEditFoodDiscount?: Dispatch<SetStateAction<number>>;
  setEditFoodPic?: Dispatch<SetStateAction<string>>;
};

export const ItemCard = (props: ItemCardProps) => {
  const {
    foodName,
    foodPrice,
    discount,
    foodPic,
    foodIngredients,
    foodCategory,
    setOpenFood,
    editFood,
    setEditFood,
    setEditFoodName,
    setEditFoodCategory,
    setEditFoodIngredients,
    setEditFoodPrice,
    setEditFoodDiscount,
    setEditFoodPic,
  } = props;
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [inAdminPage, setInAdminPage] = useState(false);
  const pathname = usePathname();

  //number Formatter
  const numberFormatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  useEffect(() => {
    if (pathname == "/Admin") {
      setInAdminPage(true);
    } else {
      setInAdminPage(false);
    }
  }, [inAdminPage]);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "800px",
    width: { xs: "100%", md: "50%" },
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
            minHeight: 200,
            boxShadow: 1,
            borderRadius: "16px",
            aspectRatio: 3 / 2,
          }}
          justifyContent={"center"}
          alignItems={"center"}
          overflow={"hidden"}
          onClick={() => {
            setOpen(true);
          }}
          onMouseLeave={() => {
            setHover(false);
          }}
        >
          {
            <Stack
              onMouseEnter={() => {
                setHover(true);
              }}
            >
              <Image
                style={{
                  objectFit: "cover",
                }}
                src={foodPic}
                sizes="small"
                alt="foodPicture"
                fill
              />
            </Stack>
          }

          {hover && inAdminPage && (
            <Stack
              position={"absolute"}
              width={"100%"}
              height={"100%"}
              sx={{
                bgcolor: "#00000080",
                zIndex: 4,
              }}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Stack
                px={8}
                py={1}
                bgcolor={"common.white"}
                border={1}
                borderColor={"#ECEDF0"}
                borderRadius={"100px"}
                width={"166px"}
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  if (
                    setEditFood &&
                    setEditFoodName &&
                    setEditFoodIngredients &&
                    setEditFoodCategory &&
                    setEditFoodPrice &&
                    setEditFoodDiscount &&
                    setEditFoodPic
                  ) {
                    setEditFood(true);
                    setEditFoodName(foodName);
                    setEditFoodCategory(foodCategory);
                    setEditFoodIngredients(foodIngredients);
                    setEditFoodPrice(foodPrice);
                    setEditFoodDiscount(discount || 0);
                    setEditFoodPic(foodPic);
                  }
                  setOpenFood && setOpenFood(true);
                }}
              >
                <Typography fontSize={20} fontWeight={590}>
                  Edit
                </Typography>
              </Stack>
            </Stack>
          )}
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
              {discount
                ? numberFormatter.format((1 - discount / 100) * foodPrice)
                : numberFormatter.format(foodPrice)}
              ₮
            </Typography>
            <Typography
              fontSize={18}
              sx={{ color: "#171717", textDecoration: "line-through" }}
            >
              {Boolean(discount) && numberFormatter.format(foodPrice)}
              {Boolean(discount) && "₮"}
            </Typography>
          </Stack>
        </Stack>
        {Boolean(discount) && (
          <Typography
            color="common.white"
            fontSize={18}
            fontWeight={600}
            bgcolor="primary.main"
            zIndex={3}
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
            foodCategory={foodCategory}
          />
        </Box>
      </Modal>
    </Stack>
  );
};
