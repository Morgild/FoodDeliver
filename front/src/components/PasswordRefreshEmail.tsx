"use client";
import { Button, Stack, Typography } from "@mui/material";
import { CustomInput } from "./CustomInput";
import { useState } from "react";

type PasswordRefreshEmailProps = { stepChange: () => void };

export const PasswordRefreshEmail = (props: PasswordRefreshEmailProps) => {
  const { stepChange } = props;
  return (
    <Stack
      gap={6}
      padding={4}
      sx={{ alignItems: "center", borderRadius: "16px" }}
    >
      <Typography fontSize={28} fontWeight={700} color={"#0D1118"}>
        Нууц үг сэргээх
      </Typography>

      <Stack width={1} gap={1}>
        <CustomInput
          label="Имэйл"
          type="text"
          placeholder="example@email.com"
        />
      </Stack>
      <Button
        onClick={() => {
          stepChange();
        }}
        sx={{ py: "8px" }}
        variant="contained"
      >
        <Typography>Үргэлжлүүлэх</Typography>
      </Button>
    </Stack>
  );
};
