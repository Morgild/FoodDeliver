import { LocationOnOutlined } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
type AddressDropDownProps = {
  text: string;
};
export const AddressDropdown = (props: AddressDropDownProps) => {
  return (
    <Stack flexDirection={"row"} padding={"8px 16px"} gap={0.5}>
      <LocationOnOutlined />
      <Typography>{props.text}</Typography>
    </Stack>
  );
};
