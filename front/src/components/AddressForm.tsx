"use client";
import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import { AddressDropdown } from "./AddressDropDown";
import { CustomInput } from "./CustomInput";
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
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
type AddressDropDownProps = {
  district: string;
  setDistrict: Dispatch<SetStateAction<string>>;
};
export const AddressForm = (props: AddressDropDownProps) => {
  const formik = useFormik({
    initialValues: {
      district: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {},
  });

  return (
    <Box>
      <Stack>
        <Typography
          onClick={() => {
            alert(formik.values.district);
          }}
        >
          Хаягаа оруулна уу
        </Typography>
        <Select
          name="district"
          value={formik.values.district}
          onChange={formik.handleChange}
        >
          {districts.map((item: any, index) => (
            <option value={item}>
              <AddressDropdown key={index} text={item} />
            </option>
          ))}
        </Select>
      </Stack>
    </Box>
  );
};
