import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function ContentManage({
  headerHeight,
}: {
  headerHeight: string;
}) {
  return (
    <Box
      sx={{
        minHeight: `calc(100svh - ${headerHeight})`,
        p: "0 !important",
        mx: 20,
      }}
    >
      <Outlet />
    </Box>
  );
}
