import { Stack, Typography } from "@mui/material"
type menuSingleProps = {
    menuText: String,

}
export const MenuSingle = (props: menuSingleProps) => {
    const { menuText } = props
    return (
        <Stack bgcolor={'common.white'} width={1} sx={{py:'8px', px:"16px", border:1, borderColor:"#D6D8DB", borderRadius:"16px"}}>
            <Typography fontSize={18} fontWeight={600} textAlign={'center'} color={'common.black'}>{menuText}</Typography>
        </Stack>
    )
}