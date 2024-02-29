import { TitleGreenStar } from "@/components/Home/TitleGreenStar";

import { Container, Stack, Typography } from "@mui/material";
import Image from "next/image";

const address = [
  "Нархан хотхон",
  "26-р байр",
  "28-р байр",
  "45-р байр",
  "3-р байр",
  "Хоймор хотхон",
  "Хоймор хотхон",
];

export default function DeliveryRegion() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        p: "42px",
        display: "flex",
        flexDirection: "column",
        gap: "22px",
      }}
    >
      <Stack
        width={0.5}
        position={"relative"}
        sx={{ aspectRatio: 3 / 2 }}
        boxShadow={1}
      >
        <Image src={"/map.png"} alt="map" fill sizes="small" />
      </Stack>
      <TitleGreenStar title="Хүргэлтийн бүс дэх хаягууд" />
      <Stack flexDirection={"row"} gap={3}>
        <Stack width={1} p={3} borderRadius={2} boxShadow={1}>
          <Stack gap={2}>
            <Typography
              py={2}
              borderBottom={1}
              fontSize={20}
              fontWeight={590}
              borderColor={"primary.main"}
            >
              А бүс
            </Typography>
            <Stack flexDirection={"row"} gap={2}>
              <Stack width={1} gap={2}>
                {address.map((item, index) => (
                  <Typography fontSize={16} fontWeight={400} key={index}>
                    {item}
                  </Typography>
                ))}
              </Stack>
              <Stack width={1} gap={2}>
                {address.map((item, index) => (
                  <Typography fontSize={16} fontWeight={400} key={index}>
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack width={1} p={3} borderRadius={2} boxShadow={2}>
          <Stack gap={2}>
            <Typography
              py={2}
              borderBottom={1}
              fontSize={20}
              fontWeight={590}
              borderColor={"primary.main"}
            >
              Б бүс
            </Typography>
            <Stack flexDirection={"row"} gap={2}>
              <Stack width={1} gap={2}>
                {address.map((item, index) => (
                  <Typography fontSize={16} fontWeight={400} key={index}>
                    {item}
                  </Typography>
                ))}
              </Stack>
              <Stack width={1} gap={2}>
                {address.map((item, index) => (
                  <Typography fontSize={16} fontWeight={400} key={index}>
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
