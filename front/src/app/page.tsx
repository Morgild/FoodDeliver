'use client'
import { Container, Modal} from "@mui/material";
import { WhiteCards } from "@/components/WhiteCards";
import { HomeFoods } from "@/components/HomeFoods";
import { MenuGroup } from "@/components/MenuGroup";
import { HomeCarousel } from "@/components/HomeCarousel";
import { useAuth } from "@/components/providers/AuthProvider";
import { SignIn } from "@/components/SignIn";
import { SignUp } from "@/components/SignUp";

export default function Home() {
  const {isLogged}=useAuth();

  return (
    <>
      <HomeCarousel />
      <Container maxWidth="lg" sx={{ pt: '122px', pb: "82px", display: "flex", flexDirection: "column", gap: "122px" }}>
        <WhiteCards />
        <HomeFoods categoryTitle="Хямдралтай" />
        <MenuGroup></MenuGroup>
        {/* <Stack maxWidth={"448px"} sx={{ margin: 'auto', marginTop: "111px", marginBottom: "75px" }}> */}
        {/* <SingIn />  */}
        {/* <SignUp /> */}
        {/* <PasswordRefreshEmail />
          <PasswordRefreshCode />
          <PasswordRefreshNew />
        </Stack> */}
        {/* <CustomInput label="Label" type="password" placeholder="Placeholder" variant="filled"/>
  <ItemCard mealName="Breakfast" price={300} discountPrice={400} discount={20}/>
 <MyAlert alertText="Амжилттай бүртгэгдлээ."/> */}
      </Container>
    </>
  );
}
