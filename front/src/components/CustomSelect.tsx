"use client";
import {
  LocationOnOutlined,
  KeyboardArrowDownOutlined,
  PlaceOutlined,
} from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { ChangeEventHandler, HTMLInputTypeAttribute, useState } from "react";

type CustomSelectProps = {
  label?: string;
  type: HTMLInputTypeAttribute;
  value?: string;
  required?: string;
  placeholder?: string;
  variant?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
};

export const CustomSelect = (props: TextFieldProps) => {
  const { label, type, ...rest } = props;

  return (
    <Stack justifyContent="center" gap={0.5}>
      <TextField
        {...rest}
        type={type}
        inputProps={{
          style: {
            padding: "8px",
          },
        }}
        InputProps={{
          style: {
            backgroundColor: "#F7F7F8",
          },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <KeyboardArrowDownOutlined />
              </IconButton>
            </InputAdornment>
          ),
          startAdornment: type === "select" && (
            <InputAdornment position="start">
              <IconButton>
                <PlaceOutlined />
              </IconButton>
            </InputAdornment>
          ),
        }}
      >
        {label}
      </TextField>
    </Stack>
  );
};
