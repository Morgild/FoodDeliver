import { Stack, Typography } from "@mui/material";
import Image from "next/image";

export const Empty = () => {
  return (
    <Stack alignItems={"center"} justifyContent={"center"} flex={1}>
      <Stack
        position={"relative"}
        width={208}
        height={400}
        gap={4}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Image alt="box" src="/box.png" width={133} height={133} />
        <Typography
          fontSize={14}
          fontWeight={400}
          color={"#8B8E95"}
          textAlign={"center"}
        >
          Уучлаарай илэрц олдсонгүй
        </Typography>
      </Stack>
    </Stack>
  );
};
