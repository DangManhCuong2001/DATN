import { Box, styled } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  maxWidth: "1205px",
  margin: "0 auto",
  paddingRight: theme.spacing(2),
  paddingLeft: theme.spacing(2),
})) as typeof Box;
