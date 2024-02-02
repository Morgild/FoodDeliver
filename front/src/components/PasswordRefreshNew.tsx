"use client";
import { Button, Stack, Typography } from "@mui/material";
import { CustomInput } from "./CustomInput";
import { useRouter } from "next/navigation";
import { useState } from "react";

type PasswordRefreshNewProps = { stepChange: () => void };

export const PasswordRefreshNew = (props: PasswordRefreshNewProps) => {
  const { stepChange } = props;
  const router = useRouter();
  return (
    <Stack
      gap={6}
      padding={4}
      sx={{ alignItems: "center", borderRadius: "16px" }}
    >
      <Typography fontSize={28} fontWeight={700} color={"#0D1118"}>
        Шинэ нууц үг зохиох
      </Typography>

      <Stack width={1} gap={1}>
        <CustomInput
          label="Нууц үг"
          type="password"
          placeholder="Нууц үгээ оруулна уу"
        />
        <CustomInput
          label="Нууц үг давтах"
          type="password"
          placeholder="Нууц үгээ оруулна уу"
        />
      </Stack>
      <Button
        onClick={() => {
          stepChange();
          router.push("/Signin");
        }}
        sx={{ py: "8px" }}
        variant="contained"
      >
        <Typography>Үргэлжлүүлэх</Typography>
      </Button>
    </Stack>
  );
};
