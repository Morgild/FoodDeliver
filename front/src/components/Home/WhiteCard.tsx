import { BookTwoTone } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
type WhiteCardProps = {
  icon?: String;
  title: String;
  text: String;
};
export const WhiteCard = (props: WhiteCardProps) => {
  const { title, text, icon } = props;
  return (
    <Stack
      gap={"15px"}
      padding={2}
      height={"100%"}
      sx={{
        border: "1px",
        borderColor: "#D6D8DB",
        borderRadius: "16px",
        boxShadow: 2,
      }}
    >
      <Stack color={"primary.main"}>
        {" "}
        <BookTwoTone />
      </Stack>
      <Stack>
        <Typography color={"#272727"} fontSize={16} fontWeight={700}>
          {title}
        </Typography>
        <Typography color={"#272727"} fontSize={14} fontWeight={400}>
          {text}
        </Typography>
      </Stack>
    </Stack>
  );
};
