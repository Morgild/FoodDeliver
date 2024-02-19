"use client";
import { CreateNewCategory } from "@/components/CreateNewCategory";
import { CreateNewFood } from "@/components/CreateNewFood";
import { FoodCategory } from "@/components/FoodCategory";
import { ItemCard } from "@/components/ItemCard";
import { useData } from "@/components/providers/DataProvider";
import { Add } from "@mui/icons-material";
import { Box, Container, Grid, Modal, Stack, Typography } from "@mui/material";
import { useState } from "react";

export default function Admin() {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 587,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "16px",
    p: 1,
  };
  const [open, setOpen] = useState(false);
  const [openFood, setOpenFood] = useState(false);
  const { categories, refreshF } = useData();
  const [selectedMenu, setSelectedMenu] = useState("");
  const test = ["One", "Two", "Three", "Four"];
  const handleClose = () => setOpen(false);
  const handleCloseFood = () => setOpenFood(false);
  console.log("cat", categories);
  return (
    <Container sx={{ display: "flex", flexDirection: "row" }}>
      <Stack
        bgcolor={"common.white"}
        width={0.25}
        pt={"26px"}
        pr={"24px"}
        pb={"120px"}
        gap={5}
      >
        <Typography fontSize={22} fontWeight={700}>
          Food menu
        </Typography>
        {categories.map((item: any) => {
          return (
            <FoodCategory
              categories={item.foodCategory}
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
            />
          );
        })}
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
          sx={{ cursor: "pointer" }}
          gap={1}
          color={"#5E6166"}
        >
          <Add color="inherit" />
          <Typography fontSize={18} fontWeight={500} color={"inherit"}>
            Create new category
          </Typography>
        </Stack>
      </Stack>
      <Stack
        width={0.75}
        borderLeft={1}
        borderColor={"#DBDBDB"}
        pl={4}
        pt={3}
        gap={4}
      >
        <Stack py={2} flexDirection={"row"} justifyContent={"space-between"}>
          <Typography fontSize={22} fontWeight={700} color={"#272727"}>
            {selectedMenu}
          </Typography>
          <Stack
            onClick={() => {
              setOpenFood(true);
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
        <Grid container spacing={3}>
          {new Array(12).fill(0).map((_, index) => (
            <Grid item key={index} xs={12} md={5} lg={4}>
              <ItemCard foodName="Beef steak" foodPrice={3000} discount={10} />
            </Grid>
          ))}
        </Grid>
      </Stack>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <CreateNewCategory handleClose={handleClose} />
        </Box>
      </Modal>
      <Modal open={openFood} onClose={handleCloseFood}>
        <Box sx={style}>
          <CreateNewFood
            categories={categories}
            handleClose={handleCloseFood}
          />
        </Box>
      </Modal>
    </Container>
  );
}
