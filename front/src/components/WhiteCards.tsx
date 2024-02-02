import { Stack } from "@mui/material"
import { WhiteCard } from "./WhiteCard";
const cardsItem = [
    { title: "Хүргэлтийн төлөв хянах", text: "Захиалга бэлтгэлийн явц хянах" },
    { title: "Шуурхай хүргэлт", text: "Хүргэлтийн явц хянах" },
    { title: "Эрүүл, баталгаат орц", text: "Бүтээгдэхүүний орц харах" },
    { title: "Хоолны өргөн сонголт", text: "Хоолны цэсээс хонголт хийх" }]

export const WhiteCards = () => {
    return (
        <Stack width={1} gap={"47px"} flexDirection={'row'} justifyContent={"space-between"}>
            {cardsItem.map((item, index) => (
                <Stack width={1} key={index}>
                <WhiteCard title={item.title} text={item.text} />
                </Stack>
            ))}
        </Stack>
    )
}