import { Box, MenuItem, Select, Stack, Typography } from "@mui/material";
import { AddressDropdown } from "./AddressDropDown";

const districts = [
  "Баянзүрх дүүрэг",
  "Баянгол дүүрэг",
  "Чингэлтэй дүүрэг",
  "Сүхбаатар дүүрэг",
  "Хан-Уул дүүрэг",
  "Сонгинохайрхан дүүрэг",
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const AddressForm = () => {
  return (
    <Box bgcolor={"aqua"}>
      <Stack>
        <Typography>Хаягаа оруулна уу</Typography>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          MenuProps={MenuProps}
          value={districts}
          SelectProps={{
            native: true,
          }}
        >
          {districts.map((district) => (
            <MenuItem key={district} value={district}>
              <AddressDropdown text={district} />
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </Box>
  );
};
