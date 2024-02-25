import { Stack, Typography } from "@mui/material";
import Image from "next/image";

type TitleGreenStarProps = {
  title: String;
};
export const TitleGreenStar = (props: TitleGreenStarProps) => {
  return (
    <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
      <Image src="/Star.png" alt="star" width={18} height={18} />
      <Typography fontSize={22} fontWeight={700} color={"#272727"}>
        {props.title}
      </Typography>
    </Stack>
  );
};
