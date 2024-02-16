import { MenuGroup } from "@/components/MenuGroup";
import { TermsOfService } from "@/components/TermsOfService";
import { Container, Typography } from "@mui/material";

export default function TermsService() {
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
      <TermsOfService></TermsOfService>
    </Container>
  );
}
