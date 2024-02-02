import { Container, Stack, Typography } from "@mui/material"
import Image from "next/image"

export const HomeCarousel = () => {
    return (

        <Stack sx={{
            backgroundColor: "primary.main",
            backgroundImage: "url(/footer.png)",
            backgroundSize: "contain",
        }} width={1} height={'50vh'} bgcolor={'primary.main'}>
            <Container maxWidth="lg" sx={{ height: '100%' }}>
                <Stack position={"relative"} width={"100%"} height={1} flexDirection={'row'} alignItems={"center"} justifyContent="space-between" >
                    <Stack width={'35%'} gap={"23px"} >
                        <Typography fontSize={55} fontWeight={600} color={'common.white'} sx={{ lineHeight: "49.5px" }}>Pinecone Food delivery</Typography>
                        <Stack width={1} height={"2px"} bgcolor="common.white" ></Stack>
                        <Typography fontSize={22} fontWeight={300} sx={{ lineHeight: "26.4px" }} color={'common.white'}>Horem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
                    </Stack>

                    <Stack sx={{ width: "65%" }}  >
                        <Image src="/foodBottom.png" alt="food bottom" width={300} height={300} style={{ height: "50%", position: "absolute", top: "50%", right: "20%", transform: "translateY(-50%)" }}></Image>
                        <Image src="/foodTop.png" alt="food top" width={200} height={200} style={{ height: "25%", position: "absolute", top: '50%', right: "20%", transform: "translatex(50%)" }}></Image>
                    </Stack>
                </Stack>
            </Container>
        </Stack>
    )
}