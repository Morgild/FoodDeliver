"use client";
import { FacebookSharp, Instagram, Twitter } from "@mui/icons-material";
import { Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
const footerItems = [
  "Нүүр",
  "Холбоо барих",
  "Хоолны цэс",
  "Үйлчилгээний нөхцөл",
  "Хүргэлт",
  "Нууцлалын бодлого",
];
export const Footer = () => {
  const router = useRouter();
  const routerPath = (item: string) => {
    if (item == "Холбоо барих") {
      return "/Contacts";
    }
    if (item == "Хоолны цэс") {
      return "/Menu";
    }
    if (item == "Үйлчилгээний нөхцөл") {
      return "/TermsService";
    }
    if (item == "Хүргэлт") {
      return "/DeliveryRegion";
    }
    if (item == "Нууцлалын бодлого") {
      return "/Privacy";
    } else return "/";
  };
  return (
    <Stack
      sx={{
        pt: "114px",
        pb: "109px",
        backgroundColor: "primary.main",
        backgroundImage: "url(/footer.png)",
        backgroundSize: "contain",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          alignItems: "center",
        }}
        maxWidth="lg"
      >
        <Stack gap={2} sx={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            src={"/Logo_white.png"}
            alt="logo white"
            width={41}
            height={41}
          />
          <Typography fontSize={20} fontWeight={700} color={"common.white"}>
            Food Delivery
          </Typography>
        </Stack>
        <Stack
          width={1}
          sx={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          {footerItems.map((item) => (
            <Stack
              onClick={() => {
                router.push(routerPath(item));
              }}
              key={item}
              sx={{ cursor: "pointer" }}
            >
              <Stack sx={{ textAlign: "center" }}>
                <Typography
                  fontSize="16px"
                  fontWeight={590}
                  color="common.white"
                >
                  {item}
                </Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
        <Stack sx={{ flexDirection: "row", p: "5px" }} gap={"18px"}>
          <FacebookSharp fontSize="large" sx={{ color: "common.white" }} />
          <Instagram fontSize="large" sx={{ color: "common.white" }} />
          <Twitter fontSize="large" sx={{ color: "common.white" }} />
        </Stack>
        <Stack width={1} height="1px" bgcolor="common.white"></Stack>
        <Stack textAlign={"center"} gap={2}>
          <Typography fontSize={16} fontWeight={400} color={"common.white"}>
            © 2024 Pinecone Foods LLC
          </Typography>
          <Typography fontSize={16} fontWeight={400} color={"common.white"}>
            Зохиогчийн эрх хуулиар хамгаалагдсан.
          </Typography>
        </Stack>
      </Container>
    </Stack>
  );
};
