import {
  EditOutlined,
  EmailOutlined,
  LocalPhoneOutlined,
  PersonOutline,
} from "@mui/icons-material";
import { Input, Stack, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

type UserCardProps = {
  title: string;
  text: string;
  setUpdate: Dispatch<SetStateAction<string>>;
};
export const UserCard = (props: UserCardProps) => {
  const { title, text, setUpdate } = props;
  const [editText, setEditText] = useState(text);
  const [edit, setEdit] = useState(false);

  return (
    <Stack
      width={1}
      bgcolor={"#F6F6F6"}
      flexDirection={"row"}
      borderRadius={"4px"}
      padding={"8px 20px"}
      gap={1}
      justifyContent={"space-between"}
    >
      <Stack
        padding={1}
        alignItems={"center"}
        justifyContent={"center"}
        borderRadius={"50%"}
        bgcolor={"common.white"}
        fontSize={"24px"}
        alignSelf={"center"}
      >
        {title == "Таны нэр" && <PersonOutline fontSize="inherit" />}
        {title == "Утасны дугаар" && <LocalPhoneOutlined fontSize="inherit" />}
        {title == "И-мэйл" && <EmailOutlined fontSize="inherit" />}
      </Stack>
      <Stack gap={0.5} width={1}>
        <Typography fontSize={12} fontWeight={400} color={"#888A99"}>
          {title}
        </Typography>
        {edit ? (
          <Input
            onChange={(event) => {
              setUpdate(event.target.value);
            }}
            defaultValue={text}
          ></Input>
        ) : (
          <Typography fontSize={16} fontWeight={400} color={"#0D1118"}>
            {text}
          </Typography>
        )}
      </Stack>
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        color={"primary.main"}
        sx={{ cursor: "pointer" }}
        onClick={() => {
          setEdit(true);
        }}
      >
        <EditOutlined />
      </Stack>
    </Stack>
  );
};
