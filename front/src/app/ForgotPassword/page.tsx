"use client";
import { PasswordRefreshCode } from "@/components/ResetPassword/PasswordRefreshCode";
import { PasswordRefreshEmail } from "@/components/ResetPassword/PasswordRefreshEmail";
import { PasswordRefreshNew } from "@/components/ResetPassword/PasswordRefreshNew";
import { SignUp } from "@/components/Authorization/SignUp";
import { Box } from "@mui/material";
import { useState } from "react";
type ForgotPasswordProps = {};
export default function ForgotPassword(props: ForgotPasswordProps) {
  const [step, setStep] = useState("email");
  const [newPassword, setNewPassword] = useState("");
  const stepChange = () => {
    if (step == "email") {
      setStep("code");
    }
    if (step == "code") {
      setStep("new");
    }
    if (step == "new") {
      setStep("email");
    }
  };
  return (
    <Box
      sx={{
        width: { xs: "350px", md: "450px" },
        margin: "auto",
        marginTop: "111px",
        marginBottom: "75px",
      }}
    >
      {step == "email" && <PasswordRefreshEmail stepChange={stepChange} />}
      {step == "code" && <PasswordRefreshCode stepChange={stepChange} />}
      {step == "new" && <PasswordRefreshNew stepChange={stepChange} />}
    </Box>
  );
}
