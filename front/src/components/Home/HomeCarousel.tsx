import { Container, Stack, Typography } from "@mui/material";
import Image from "next/image";

export const HomeCarousel = () => {
  return (
    <Stack
      sx={{
        backgroundColor: "primary.main",
        backgroundImage: "url(/footer.png)",
        backgroundSize: "contain",
      }}
      width={1}
      height={{ md: "50vh", xs: "30vh" }}
      bgcolor={"primary.main"}
    >
      <Container maxWidth="lg" sx={{ height: "100%" }}>
        <Stack
          position={"relative"}
          width={"100%"}
          height={1}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent="space-between"
        >
          <Stack width={{ md: "35%", xs: "100%" }} gap={"23px"}>
            <Typography
              fontWeight={600}
              color={"common.white"}
              sx={{
                fontSize: { xs: "36px", md: "55px" },
                lineHeight: "49.5px",
              }}
            >
              Pinecone Food delivery
            </Typography>
            <Stack width={1} height={"2px"} bgcolor="common.white"></Stack>
            <Typography
              fontWeight={300}
              sx={{
                fontSize: { xs: "16px", md: "22px" },
                lineHeight: "26.4px",
              }}
              color={"common.white"}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
          </Stack>

          <Stack sx={{ width: "65vw", display: { xs: "none", md: "flex" } }}>
            <Image
              src="/foodBottom.png"
              alt="food bottom"
              width={300}
              height={300}
              style={{
                position: "absolute",
                top: "50%",
                right: "20%",
                transform: "translateY(-50%)",
              }}
            ></Image>
            <Image
              src="/foodTop.png"
              alt="food top"
              width={150}
              height={150}
              style={{
                position: "absolute",
                top: "50%",
                right: "20%",
                transform: "translatex(50%)",
              }}
            ></Image>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};
