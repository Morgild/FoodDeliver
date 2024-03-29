"use client";
import { CreateNewCategory } from "@/components/Food/CreateNewCategory";
import { CreateNewFood } from "@/components/Food/CreateNewFood";
import { FoodCategory } from "@/components/Food/FoodCategory";
import { ItemCard } from "@/components/Food/ItemCard";
import { LoadingPage } from "@/components/LoadingPage";
import { AllOrderDetail } from "@/components/Order/AllOrderDetail";
import { OrderDetail } from "@/components/Order/OrderDetail";
import { OrderHistory } from "@/components/Order/OrderHistory";
import { useAuth } from "@/components/providers/AuthProvider";
import { useData } from "@/components/providers/DataProvider";
import { Add } from "@mui/icons-material";
import { Box, Container, Grid, Modal, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function Admin() {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "350px", md: "587px" },
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "16px",
    p: 1,
  };
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openFood, setOpenFood] = useState(false);
  const { isAdmin } = useAuth();
  const { foods, searchValue, categories, orderList, allOrders } = useData();
  const [selectedMenu, setSelectedMenu] = useState("");
  const [editFood, setEditFood] = useState(false);
  const [editFoodName, setEditFoodName] = useState("");
  const [editFoodCategory, setEditFoodCategory] = useState("");
  const [editFoodIngredients, setEditFoodIngredients] = useState("");
  const [editFoodPrice, setEditFoodPrice] = useState(0);
  const [editFoodDiscount, setEditFoodDiscount] = useState(0);
  const [editFoodPic, setEditFoodPic] = useState("");
  const [editCategory, setEditCategory] = useState(false);
  const [tab, setTab] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState("");
  const handleClose = () => {
    setOpen(false);
    setEditCategory(false);
  };
  const handleCloseFood = () => setOpenFood(false);

  useEffect(() => {
    if (!isAdmin) {
      router.push("/");
    }
  });

  if (!isAdmin) return <LoadingPage />;

  return (
    <Container
      sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
    >
      <Stack
        bgcolor={"common.white"}
        width={{ xs: "100%", md: "25%" }}
        pt={"26px"}
        pr={"24px"}
        pb={"120px"}
        gap={{ md: 5, xs: 2 }}
      >
        <Stack flexDirection={"row"} gap={2}>
          <Typography
            onClick={() => {
              setTab(true);
            }}
            fontSize={22}
            color={tab ? "primary.main" : "#D6D8DB"}
            fontWeight={tab ? 700 : 400}
            sx={{ cursor: "pointer" }}
          >
            Food menu
          </Typography>
          <Typography
            onClick={() => {
              setTab(false);
            }}
            fontSize={22}
            color={!tab ? "primary.main" : "#D6D8DB"}
            fontWeight={tab ? 400 : 700}
            sx={{ cursor: "pointer" }}
          >
            Order
          </Typography>
        </Stack>
        {tab ? (
          <Grid container spacing={2}>
            {categories.map((item: any, index: number) => {
              return (
                <Grid key={index} item width={1}>
                  <FoodCategory
                    key={index}
                    categories={item.foodCategory}
                    selectedMenu={selectedMenu}
                    setSelectedMenu={setSelectedMenu}
                    setOpen={setOpen}
                    editCategory={editCategory}
                    setEditCategory={setEditCategory}
                  />
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Grid container spacing={1}>
            {allOrders
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((item, index) => (
                <Grid key={index} item xs={6} md={12}>
                  <OrderDetail
                    key={index}
                    {...item}
                    selectedOrder={selectedOrder}
                    setSelectedOrder={setSelectedOrder}
                  />
                </Grid>
              ))}
          </Grid>
        )}
        {tab && (
          <Stack
            onClick={() => {
              setOpen(true);
            }}
            width={1}
            borderRadius={1}
            border={1}
            borderColor={"#D6D8DB"}
            padding={"8px 16px"}
            flexDirection={"row"}
            alignItems={"center"}
            sx={{ cursor: "pointer" }}
            gap={1}
            color={"#5E6166"}
          >
            <Add color="inherit" />
            <Typography fontSize={18} fontWeight={500} color={"inherit"}>
              Create new category
            </Typography>
          </Stack>
        )}
      </Stack>

      <Stack
        width={0.75}
        borderLeft={1}
        borderColor={"#DBDBDB"}
        pl={4}
        pt={3}
        pb={5}
        gap={4}
      >
        {tab && (
          <Stack py={2} flexDirection={"row"} justifyContent={"space-between"}>
            <Typography fontSize={22} fontWeight={700} color={"#272727"}>
              {selectedMenu}
            </Typography>
            <Stack
              onClick={() => {
                setOpenFood(true);
                setEditFood(false);
              }}
              bgcolor={"primary.main"}
              px={2}
              py={1}
              borderRadius={"4px"}
              sx={{ cursor: "pointer" }}
            >
              <Typography color={"common.white"} fontSize={16} fontWeight={400}>
                Add new food
              </Typography>
            </Stack>
          </Stack>
        )}
        {tab ? (
          <Grid container spacing={3}>
            {foods
              .filter((food) => {
                return food.foodCategory.includes(selectedMenu);
              })
              .filter((food) =>
                food.foodName.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((item: any, index: number) => (
                <Grid item key={index} xs={12} md={5} lg={4}>
                  <ItemCard
                    foodName={item.foodName}
                    foodPrice={item.foodPrice}
                    discount={item.discount}
                    foodPic={item.foodPic}
                    foodIngredients={item.foodIngredients}
                    foodCategory={item.foodCategory}
                    setOpenFood={setOpenFood}
                    editFood={editFood}
                    setEditFood={setEditFood}
                    setEditFoodName={setEditFoodName}
                    setEditFoodCategory={setEditFoodCategory}
                    setEditFoodIngredients={setEditFoodIngredients}
                    setEditFoodPrice={setEditFoodPrice}
                    setEditFoodDiscount={setEditFoodDiscount}
                    setEditFoodPic={setEditFoodPic}
                  />
                </Grid>
              ))}
          </Grid>
        ) : (
          <AllOrderDetail
            selectedOrder={selectedOrder}
            setSelectedOrder={setSelectedOrder}
          />
        )}
      </Stack>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <CreateNewCategory
            handleClose={handleClose}
            editCategory={editCategory}
            setEditCategory={setEditCategory}
            selectedMenu={selectedMenu}
          />
        </Box>
      </Modal>
      <Modal open={openFood} onClose={handleCloseFood}>
        <Box sx={style}>
          <CreateNewFood
            categories={categories}
            handleClose={handleCloseFood}
            editFood={editFood}
            setEditFood={setEditFood}
            editFoodName={editFoodName}
            editFoodCategory={editFoodCategory}
            editFoodIngredients={editFoodIngredients}
            editFoodPrice={editFoodPrice}
            editFoodDiscount={editFoodDiscount}
            editFoodPic={editFoodPic}
          />
        </Box>
      </Modal>
    </Container>
  );
}
