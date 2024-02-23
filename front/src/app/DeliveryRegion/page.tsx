import { AddressForm } from "@/components/AddressForm";
import { FoodDetail } from "@/components/FoodDetail";

import { Container } from "@mui/material";

export default function DeliveryRegion() {
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
      <AddressForm></AddressForm>
    </Container>
  );
}
