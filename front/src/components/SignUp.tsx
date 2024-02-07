"use client";
import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { CustomInput } from "./CustomInput";
import { CloudQueue } from "@mui/icons-material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth } from "./providers/AuthProvider";
import { useRouter } from "next/navigation";
const validationSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  address: yup.string().required(),
  password: yup.string().required(),
  repassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Нууц үг адил биш байна!")
    .required(),
});
type SignUpProps = {};

export const SignUp = (props: SignUpProps & SignUpProps) => {
  const router = useRouter();
  const { signUp } = useAuth();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      address: "",
      password: "",
      repassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      signUp(values.name, values.email, values.address, values.password);
    },
  });

  return (
    <Stack
      gap={6}
      padding={4}
      sx={{ alignItems: "center", borderRadius: "16px" }}
    >
      <Typography fontSize={28} fontWeight={700} color={"#0D1118"}>
        Бүртгүүлэх
      </Typography>
      <Stack width={1} gap={1}>
        <Stack gap={2}>
          <CustomInput
            label="Нэр"
            type="text"
            placeholder="Нэрээ оруулна уу"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <CustomInput
            label="И-мэйл"
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
            label="Хаяг"
            type="text"
            placeholder="Та хаягаа оруулна уу"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
          <CustomInput
            label="Нууц үг"
            type="password"
            placeholder="Нууц үгээ оруулна уу"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <CustomInput
            label="Нууц үг давтах"
            type="password"
            placeholder="Нууц үгээ оруулна уу"
            name="repassword"
            value={formik.values.repassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.repassword && Boolean(formik.errors.repassword)
            }
            helperText={formik.touched.repassword && formik.errors.repassword}
          />
        </Stack>
        <Typography
          onClick={() => {
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
        <Stack
          gap={2}
          padding={"8px 16px 8px 0px"}
          flexDirection={"row"}
          sx={{ cursor: "pointer" }}
        >
          <CloudQueue />
          <Typography
            fontSize={14}
            fontWeight={400}
            color={"#3F4145"}
            textAlign={"center"}
          >
            Үйлчилгээний нөхцөл зөвшөөрөх
          </Typography>
        </Stack>

        <Button
          sx={{ py: "8px" }}
          variant="contained"
          onClick={() => {
            formik.handleSubmit();
          }}
          disabled={
            !formik.values.name ||
            !formik.values.email ||
            !formik.values.address ||
            !formik.values.password ||
            Boolean(formik.errors.repassword)
          }
        >
          <Typography>Бүртгүүлэх</Typography>
        </Button>
      </Stack>
    </Stack>
  );
};
