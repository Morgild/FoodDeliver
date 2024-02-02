"use client";
import { Button, Stack, Typography } from "@mui/material";
import { CustomInput } from "./CustomInput";
import { useState } from "react";

type PasswordRefreshPropsCode = { stepChange: () => void };

export const PasswordRefreshCode = (props: PasswordRefreshPropsCode) => {
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
        <Typography>
          Таны example@email.com хаяг руу сэргээх код илгээх болно.
        </Typography>
        <CustomInput
          label="Нууц үг сэргээх код"
          type="password"
          placeholder="********"
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
