"use client";
import {
  Visibility,
  VisibilityOff,
  Search,
} from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import exp from "constants";
import { ChangeEventHandler, HTMLInputTypeAttribute, useState } from "react";

type CustomInputProps = {
  label?: string;
  type: HTMLInputTypeAttribute;
  value?: string;
  required?: string;
  placeholder?: string;
  variant?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
};

export const CustomInput = (props: TextFieldProps) => {
  const { label, type="text", ...rest } = props;
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Stack justifyContent="center" gap={0.5}>
      {label&&<Typography fontSize={14}>{label}</Typography>}
      <TextField {...rest}
        type={type === "password" && showPassword ? "text" : type}
  
        inputProps={{
          style: {
            padding: "8px",
          },
        }}
        InputProps={{
          style:{
            backgroundColor:`${type!=="search"?"#F7F7F8":"#FFF"}`
          },
          endAdornment: type === "password" && (
            <InputAdornment position="end">
              <IconButton onClick={handleShowPassword}>
                {showPassword ? (
                  <VisibilityOff sx={{ color: "black" }} />
                ) : (
                  <Visibility sx={{ color: "black" }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
          startAdornment: type === "search" && (
            <InputAdornment position="start">
              <IconButton onClick={handleShowPassword}>
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      ></TextField>
    </Stack>
  );
};
