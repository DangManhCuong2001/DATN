import React from "react";
import SideBar from "../../layout/SideBar/SideBar";
import { Box, Typography } from "@mui/material";
import ContentManage from "./ContentManage/ContentManage";
import Providers from "../../context/Providers";
import { useLoginContext } from "../../context/login-context";
import Login from "../Login/Login";
import HeaderManage from "./HeaderManage/HeaderManage";

function ManageContent() {
  const { isLogin } = useLoginContext();
  console.log(isLogin);
  const sidebarWidth = "230px";
  const headerHeight = "66px";
  return (
    <>
      {isLogin ? (
        <Box
          sx={{
            position: "relative",
            backgroundColor: "#0e1713",
          }}
        >
          <SideBar sidebarWidth={sidebarWidth} headerHeight={headerHeight} />
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              ml: { xs: 0, lg: sidebarWidth },
            }}
          >
            <HeaderManage headerHeight={headerHeight}></HeaderManage>
            <ContentManage headerHeight={headerHeight}></ContentManage>
          </Box>
          {/* <ContentManage /> */}
        </Box>
      ) : (
        <Login urlAfterLogin={"/manage/manageSchedule"} />
      )}
    </>
  );
}

export default function Manage() {
  return (
    <Providers>
      <ManageContent />
    </Providers>
  );
}
