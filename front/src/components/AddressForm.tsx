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
import { CustomInput } from "./CustomInput";
import { CustomSelect } from "./CustomSelect";
import {
  LocationCity,
  LocationCityOutlined,
  PlaceOutlined,
} from "@mui/icons-material";

const districts = [
  "Баянзүрх дүүрэг",
  "Баянгол дүүрэг",
  "Чингэлтэй дүүрэг",
  "Сүхбаатар дүүрэг",
  "Хан-Уул дүүрэг",
  "Сонгинохайрхан дүүрэг",
];

const khoroos = [
  "1-р хороо",
  "2-р хороо",
  "3-р хороо",
  "4-р хороо",
  "5-р хороо",
  "6-р хороо",
  "7-р хороо",
];
const bairs = [
  "Нархан хотхон",
  "26-р байр",
  "Хоймор хотхон",
  "45-р байр",
  "Зайсан хотхон",
];

type AddressFormProps = {
  setDistrict: Dispatch<SetStateAction<string>>;
  setKhoroo: Dispatch<SetStateAction<string>>;
  setBair: Dispatch<SetStateAction<string>>;
  setAdditional: Dispatch<SetStateAction<string>>;
  setPhone: Dispatch<SetStateAction<string>>;
  setPaymentMethod: Dispatch<SetStateAction<boolean>>;
  district: string;
  khoroo: string;
  bair: string;
  additional: string;
  phone: string;
  paymentMethod: boolean;
};
export const AddressForm = (props: AddressFormProps) => {
  const {
    setDistrict,
    setKhoroo,
    setBair,
    setAdditional,
    setPhone,
    setPaymentMethod,
    district,
    khoroo,
    bair,
    additional,
    phone,
    paymentMethod,
  } = props;

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <Box display={"flex"} gap={5} flexDirection={"column"}>
      <Stack gap={2}>
        <Stack width={1} gap={2}>
          <Typography>Хаягаа оруулна уу</Typography>
          <CustomSelect
            placeholder={"Дүүрэг сонгоно уу"}
            name="district"
            value={district}
            onChange={(event) => {
              setDistrict(event.target.value);
            }}
          >
            {districts.map((item: any, index) => (
              <MenuItem key={index} value={item}>
                <Stack direction="row" gap={0.5}>
                  <PlaceOutlined />
                  {item}
                </Stack>
              </MenuItem>
            ))}
          </CustomSelect>
          <CustomSelect
            placeholder={"Хороо сонгоно уу"}
            name="khoroo"
            value={khoroo}
            onChange={(event) => {
              setKhoroo(event.target.value);
            }}
          >
            {khoroos.map((item: any, index) => (
              <MenuItem key={index} value={item}>
                <Stack direction="row" gap={0.5}>
                  <PlaceOutlined />
                  {item}
                </Stack>
              </MenuItem>
            ))}
          </CustomSelect>
          <CustomSelect
            placeholder={"Байр сонгоно уу"}
            name="bair"
            value={bair}
            onChange={(event) => {
              setBair(event.target.value);
            }}
          >
            {bairs.map((item: any, index) => (
              <MenuItem key={index} value={item}>
                <Stack direction="row" gap={0.5}>
                  <PlaceOutlined />
                  {item}
                </Stack>
              </MenuItem>
            ))}
          </CustomSelect>
        </Stack>
      </Stack>
      <Stack gap={4}>
        <Stack gap={0.5}>
          <Typography fontSize={14} fontWeight={400}>
            Нэмэлт мэдээлэл
          </Typography>
          <TextField
            placeholder="Орц, давхар, орцны код..."
            onChange={(event) => {
              setAdditional(event.target.value);
            }}
          ></TextField>
        </Stack>
        <Stack>
          <Typography fontSize={14} fontWeight={400}>
            Утасны дугаар*
          </Typography>
          <TextField
            placeholder="Утасны дугаараа оруулна уу"
            onChange={(event) => {
              setPhone(event?.target.value);
            }}
          />
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
                setPaymentMethod(false);
              }}
              sx={{ cursor: "pointer" }}
            >
              <Checkbox {...label} color="default" checked={!paymentMethod} />
              <Typography>Бэлнээр</Typography>
            </Stack>
            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={"20px"}
              onClick={() => {
                setPaymentMethod(true);
              }}
              sx={{ cursor: "pointer" }}
            >
              <Checkbox {...label} checked={paymentMethod} color="default" />
              <Typography>Картаар</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
