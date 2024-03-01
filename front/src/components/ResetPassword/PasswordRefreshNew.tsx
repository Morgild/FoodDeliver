"use client";
import { Button, Stack, Typography } from "@mui/material";
import { CustomInput } from "../CustomInput";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth } from "../providers/AuthProvider";

type PasswordRefreshNewProps = { stepChange: () => void };
const validationSchema = yup.object({
  newPass: yup.string().required(),
  reNewPass: yup
    .string()
    .oneOf([yup.ref("newPass"), ""], "Нууц үг адил биш байна!")
    .required(),
});

export const PasswordRefreshNew = (props: PasswordRefreshNewProps) => {
  const { otp, email, setEmail, resetPassword } = useAuth();
  const { stepChange } = props;
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      newPass: "",
      reNewPass: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      resetPassword(email, values.newPass, otp);
      router.push("/Signin");
    },
  });
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
          name="newPass"
          value={formik.values.newPass}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.newPass && Boolean(formik.errors.newPass)}
          helperText={formik.touched.newPass && formik.errors.newPass}
        />
        <CustomInput
          label="Нууц үг давтах"
          type="password"
          placeholder="Нууц үгээ оруулна уу"
          name="reNewPass"
          value={formik.values.reNewPass}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.reNewPass && Boolean(formik.errors.reNewPass)}
          helperText={formik.touched.reNewPass && formik.errors.reNewPass}
        />
      </Stack>
      <Button
        onClick={() => {
          formik.handleSubmit();
        }}
        sx={{ py: "8px" }}
        variant="contained"
        disabled={!formik.values.newPass || Boolean(formik.errors.reNewPass)}
      >
        <Typography>Үргэлжлүүлэх</Typography>
      </Button>
    </Stack>
  );
};
