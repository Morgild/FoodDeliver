"use client";
import { Button, Stack, Typography } from "@mui/material";
import { CustomInput } from "./CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth } from "./providers/AuthProvider";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

type PasswordRefreshEmailProps = {
  stepChange: () => void;
};
const validationSchema = yup.object({
  email: yup.string().email().required(),
});

export const PasswordRefreshEmail = (props: PasswordRefreshEmailProps) => {
  const { sendEmail, otp, email, setEmail } = useAuth();
  const { stepChange } = props;

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await sendEmail(values.email);
        setEmail(values.email);
        stepChange();
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message ?? error.message, {
            position: "top-center",
            hideProgressBar: true,
          });
        }
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
        Нууц үг сэргээх
      </Typography>

      <Stack width={1} gap={1}>
        <CustomInput
          label="Имэйл"
          type="text"
          placeholder="example@email.com"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </Stack>
      <Button
        onClick={() => {
          formik.handleSubmit();
        }}
        sx={{ py: "8px" }}
        variant="contained"
        disabled={!formik.values.email}
      >
        <Typography>Үргэлжлүүлэх</Typography>
      </Button>
    </Stack>
  );
};
