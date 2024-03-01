"use client";
import { Button, Stack, Typography } from "@mui/material";
import { CustomInput } from "../CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth } from "../providers/AuthProvider";
import { toast } from "react-toastify";

type PasswordRefreshPropsCode = { stepChange: () => void };
const validationSchema = yup.object({
  code: yup.string().required(),
});

export const PasswordRefreshCode = (props: PasswordRefreshPropsCode) => {
  const { setOtp } = useAuth();
  const { stepChange } = props;
  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setOtp(values.code);
      stepChange();
    },
  });

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
          name="code"
          value={formik.values.code}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.code && Boolean(formik.errors.code)}
          helperText={formik.touched.code && formik.errors.code}
        />
      </Stack>
      <Button
        onClick={() => {
          formik.handleSubmit();
        }}
        sx={{ py: "8px" }}
        variant="contained"
      >
        <Typography>Үргэлжлүүлэх</Typography>
      </Button>
    </Stack>
  );
};
