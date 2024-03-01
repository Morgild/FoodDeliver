import { PrivacyPolicy } from "@/components/PrivacyPolicy";
import { Container } from "@mui/material";

export default function Privacy() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        p: "42px",
        display: "flex",
        flexDirection: "column",
        gap: "122px",
      }}
    >
      <PrivacyPolicy />
    </Container>
  );
}
