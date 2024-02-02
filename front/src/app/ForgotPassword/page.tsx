"use client";
import { PasswordRefreshCode } from "@/components/PasswordRefreshCode";
import { PasswordRefreshEmail } from "@/components/PasswordRefreshEmail";
import { PasswordRefreshNew } from "@/components/PasswordRefreshNew";
import { SignUp } from "@/components/SignUp";
import { Box } from "@mui/material";
import { useState } from "react";
type ForgotPasswordProps = {};
export default function ForgotPassword(props: ForgotPasswordProps) {
  const [step, setStep] = useState("email");
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
      minWidth={"448px"}
      sx={{ margin: "auto", marginTop: "111px", marginBottom: "75px" }}
    >
      {step == "email" && <PasswordRefreshEmail stepChange={stepChange} />}
      {step == "code" && <PasswordRefreshCode stepChange={stepChange} />}
      {step == "new" && <PasswordRefreshNew stepChange={stepChange} />}
    </Box>
  );
}
