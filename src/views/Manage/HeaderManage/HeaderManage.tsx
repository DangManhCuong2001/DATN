import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { menu } from "../../../layout/menu";
import { useLocation } from "react-router-dom";
import { useLoginContext } from "../../../context/login-context";
import ButtonLogin from "../../../components/ButtonLogin/ButtonLogin";

export default function HeaderManage({
  headerHeight,
}: {
  headerHeight: string;
}) {
  const { dataLogin } = useLoginContext();
  const { pathname } = useLocation();
  const findMainMenuIndex = menu.findIndex((item) =>
    pathname.includes(item.url)
  );

  const title = findMainMenuIndex == -1 ? null : menu[findMainMenuIndex].title;
  return (
    <Box
      sx={{
        height: headerHeight,
        backgroundColor: "#1b2626",
        position: "sticky",
        top: "0",
        left: 0,
        width: "100%",
        zIndex: "900",
      }}
    >
      <Box
        sx={{
          height: headerHeight,
          display: "flex",
          placeItems: "center",
          px: 20,
        }}
      >
        <Typography variant="h4" sx={{ color: "white" }}>
          {title}
        </Typography>

        <Box sx={{ ml: "auto", mr: 1 }}>
          <ButtonLogin />
        </Box>
      </Box>
    </Box>
  );
}
