import { Grid, Stack } from "@mui/material";
import { MenuSingle } from "./MenuSingle";
const menuText = ["Main course", "Appetizers", "Beverage", "On sale"];
export const MenuGroup = () => {
  return (
    <Grid container spacing={3}>
      {menuText.map((item, index) => (
        <Grid item key={index} xs={3}>
          <MenuSingle menuText={item} />
        </Grid>
      ))}
    </Grid>
  );
};
