"use client";
import {
  Box,
  Checkbox,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
  selectClasses,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import { CustomInput } from "./CustomInput";
import { CustomSelect } from "./CustomSelect";
const validationSchema = yup.object({
  foodCategory: yup.string().required(),
  foodName: yup.string().required(),
  foodIngredients: yup.string().required(),
  foodPrice: yup.number().required(),
  discount: yup.number(),
});
const districts = [
  "Баянзүрх дүүрэг",
  "Баянгол дүүрэг",
  "Чингэлтэй дүүрэг",
  "Сүхбаатар дүүрэг",
  "Хан-Уул дүүрэг",
  "Сонгинохайрхан дүүрэг",
];

const khoroo = [
  "1-р хороо",
  "2-р хороо",
  "3-р хороо",
  "4-р хороо",
  "5-р хороо",
  "6-р хороо",
  "7-р хороо",
];
const bair = [
  "Нархан хотхон",
  "26-р байр",
  "Хоймор хотхон",
  "45-р байр",
  "Зайсан хотхон",
];

type AddressDropDownProps = {};
export const AddressForm = () => {
  const [payment, setPayment] = useState(true);

  const formik = useFormik({
    initialValues: {
      district: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {},
  });
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <Box display={"flex"} gap={5} flexDirection={"column"}>
      <Stack gap={2}>
        <Stack width={1} gap={2}>
          <Typography>Хаягаа оруулна уу</Typography>
          <CustomSelect
            type="select"
            placeholder={"Дүүрэг сонгоно уу"}
            SelectProps={{
              native: true,
            }}
          >
            {districts.map((item: any, index) => (
              <option key={index} value={item}>
                {item}
                {/* <CustomSelect type="text" label={item} /> */}
              </option>
            ))}
          </CustomSelect>
        </Stack>
      </Stack>
      <Stack gap={4}>
        <Stack gap={0.5}>
          <Typography fontSize={14} fontWeight={400}>
            Нэмэлт мэдээлэл
          </Typography>
          <TextField placeholder="Орц, давхар, орцны код..."></TextField>
        </Stack>
        <Stack>
          <Typography fontSize={14} fontWeight={400}>
            Утасны дугаар*
          </Typography>
          <TextField placeholder="Утасны дугаараа оруулна уу" />
        </Stack>
        <Stack>
          <Typography fontSize={14} fontWeight={400}>
            Төлбөр төлөх
          </Typography>
          <Stack flexDirection={"row"} gap={"33px"}>
            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={"20px"}
              onClick={() => {
                setPayment(false);
              }}
              sx={{ cursor: "pointer" }}
            >
              <Checkbox
                {...label}
                name="payment"
                color="default"
                checked={!payment}
              />
              <Typography>Бэлнээр</Typography>
            </Stack>
            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={"20px"}
              onClick={() => {
                setPayment(true);
              }}
              sx={{ cursor: "pointer" }}
            >
              <Checkbox
                {...label}
                name="payment"
                checked={payment}
                color="default"
              />
              <Typography>Картаар</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
