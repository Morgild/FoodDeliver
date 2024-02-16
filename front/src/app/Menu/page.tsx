"use client";
import { MenuGroup } from "@/components/MenuGroup";
import { Container, Stack, Typography } from "@mui/material";
import { useState } from "react";

export default function Menu() {
  const [selectedMenu, setSelectedMenu] = useState("");
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack>
        <MenuGroup
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        ></MenuGroup>
      </Stack>
    </Container>
  );
}
