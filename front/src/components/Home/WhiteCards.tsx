import { Grid, Stack } from "@mui/material";
import { WhiteCard } from "./WhiteCard";
import { useRouter } from "next/navigation";
const cardsItem = [
  {
    title: "Хүргэлтийн төлөв хянах",
    text: "Захиалга бэлтгэлийн явц хянах",
    link: "/OrderList",
  },
  {
    title: "Шуурхай хүргэлт",
    text: "Хүргэлтийн явц хянах",
    link: "/OrderList",
  },
  {
    title: "Эрүүл, баталгаат орц",
    text: "Бүтээгдэхүүний орц харах",
    link: "/Menu",
  },
  {
    title: "Хоолны өргөн сонголт",
    text: "Хоолны цэсээс хонголт хийх",
    link: "/Menu",
  },
];

export const WhiteCards = () => {
  const router = useRouter();
  return (
    <Grid container spacing={3}>
      {cardsItem.map((item: any, index: number) => (
        <Grid
          item
          key={index}
          xs={6}
          md={3}
          sx={{ cursor: "pointer" }}
          onClick={() => {
            router.push(item.link);
          }}
        >
          <WhiteCard title={item.title} text={item.text} />
        </Grid>
      ))}
    </Grid>
  );
};
