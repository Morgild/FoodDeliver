"use client";
import { Button, Stack, TextFieldProps, Typography } from "@mui/material";
import { CustomInput } from "./CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth } from "../providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
type SignInProps = { handleClose?: () => void };

export const SignIn = (props: TextFieldProps & SignInProps) => {
  const { handleClose } = props;
  const router = useRouter();
  const { signIn, isLogged } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      signIn(values.email, values.password);
      if (handleClose) {
        handleClose();
      }
    },
  });
  return (
    <Stack
      gap={6}
      padding={4}
      sx={{ alignItems: "center", borderRadius: "16px" }}
    >
      <Typography fontSize={28} fontWeight={700} color={"#0D1118"}>
        Нэвтрэх
      </Typography>
      <Stack width={1} gap={1}>
        <Stack gap={2}>
          <CustomInput
            label="Имэйл"
            type="text"
            placeholder="Имэйл хайгаа оруулна уу"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <CustomInput
            label="Нууц үг"
            type="password"
            placeholder="Нууц үг"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Stack>
        <Typography
          onClick={() => {
            if (handleClose) handleClose();
            router.push("/ForgotPassword");
          }}
          fontSize={14}
          fontWeight={400}
          color={"#3F4145"}
          textAlign={"end"}
          sx={{ cursor: "pointer" }}
        >
          Нууц үг сэргээх
        </Typography>
      </Stack>
      <Stack width={1} gap={4}>
        <Button
          sx={{ py: "8px" }}
          variant="contained"
          onClick={() => {
            formik.handleSubmit();
            router.push("/");
          }}
          disabled={!formik.values.email || !formik.values.password}
        >
          <Typography>Нэвтрэх</Typography>
        </Button>
        <Typography
          fontSize={14}
          fontWeight={400}
          color={"#3F4145"}
          textAlign={"center"}
        >
          Эсвэл
        </Typography>
        <Button
          onClick={() => {
            router.push("/Signup");
            if (handleClose) handleClose();
          }}
          sx={{ py: "8px" }}
          variant="outlined"
        >
          <Typography color={"#272727"}>Бүртгүүлэх</Typography>
        </Button>
      </Stack>
    </Stack>
  );
};
