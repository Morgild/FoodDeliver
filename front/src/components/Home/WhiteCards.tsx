import { Grid, Stack } from "@mui/material";
import { WhiteCard } from "./WhiteCard";
const cardsItem = [
  { title: "Хүргэлтийн төлөв хянах", text: "Захиалга бэлтгэлийн явц хянах" },
  { title: "Шуурхай хүргэлт", text: "Хүргэлтийн явц хянах" },
  { title: "Эрүүл, баталгаат орц", text: "Бүтээгдэхүүний орц харах" },
  { title: "Хоолны өргөн сонголт", text: "Хоолны цэсээс хонголт хийх" },
];

export const WhiteCards = () => {
  return (
    <Grid container spacing={3}>
      {cardsItem.map((item: any, index: number) => (
        <Grid item key={index} xs={6} md={3}>
          <WhiteCard title={item.title} text={item.text} />
        </Grid>
      ))}
    </Grid>
  );
};
