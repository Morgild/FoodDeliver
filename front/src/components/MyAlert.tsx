import { Check } from "@mui/icons-material";
import { Alert, Typography } from "@mui/material";


type MyAlertProps = {
  alertType?: string;
  alertText: string;
};
export const MyAlert = (props: MyAlertProps) => {
  const { alertType, alertText } = props;
  return (
    <Alert
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        px: "24px",
        backgroundColor: "common.white",
        borderRadius: "16px",
        width: "fit-content",
      }}
      icon={<Check />}
      severity="success"
    >
      <Typography fontSize={16} fontWeight={400} textAlign='center'>{alertText}</Typography>
    </Alert>
  );
};
