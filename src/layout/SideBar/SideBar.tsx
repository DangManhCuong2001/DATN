import { Box, Typography } from "@mui/material";
// import { menu } from '../menu';
import { useLocation } from "react-router-dom";
import { ExpandMoreRounded } from "@mui/icons-material";
import { imagePath } from "../../constants/imagePath";
import LinkCustom from "../../components/LinkCustom/LinkCustom";
import { menu, menuOfManageDoctor } from "../menu";
import { useLoginContext } from "../../context/login-context";

export default function SideBar({
  sidebarWidth,
  headerHeight,
}: {
  sidebarWidth: string;
  headerHeight: string;
}) {
  const { pathname } = useLocation();
  const { dataLogin } = useLoginContext();
  const menuManage = dataLogin.roleId == "doctor" ? menuOfManageDoctor : menu;
  // useEffect(() => {
  //     console.log(Env.VITE_APP_ENV);
  // }, []);
  return (
    <Box
      sx={(theme) => ({
        [theme.breakpoints.down("lg")]: {
          "#sidebar": {
            transform: "translateX(-100%)",
            "& > #bgsidebar": {
              opacity: 0,
              transition: "opacity 0.3s",
            },
            "& > #mainsidebar": {
              transform: "translateX(-100%)",
              transition: "transform 0.3s",
            },
          },
          "#control-sidebar": {
            "&:checked": {
              "& + #sidebar": {
                transform: "translateX(0)",
                "& > #bgsidebar": {
                  opacity: 0.8,
                },
                "& > #mainsidebar": {
                  transform: "translateX(0)",
                },
              },
            },
          },
        },
      })}
    >
      <input id="control-sidebar" type="checkbox" style={{ display: "none" }} />
      <Box
        id="sidebar"
        sx={{
          position: "fixed",
          height: "100svh",
          width: "100%",
          top: 0,
          left: 0,
          maxWidth: { xs: "100%", lg: sidebarWidth },
          zIndex: 1000,
        }}
      >
        <Box
          id="bgsidebar"
          component={"label"}
          htmlFor="control-sidebar"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgb(17, 28, 24)",
            opacity: 0.8,
            zIndex: 0,
          }}
        ></Box>
        <Box
          id="mainsidebar"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "calc(100% - 50px)",
            bgcolor: "rgb(17, 28, 24)",
            maxWidth: sidebarWidth,
            zIndex: 1,
            overflowY: "auto",
            "&::-webkit-scrollbar-track": {
              background: "transparent!important",
            },
          }}
        >
          <Box
            sx={{
              height: headerHeight,
              display: "flex",
              pl: 2.5,
              alignItems: "center",
            }}
          >
            <img
              src={imagePath.LOGO_BVDHYDTPHCM}
              alt="logo orchai"
              width={"117px"}
              height={"auto"}
            />
          </Box>
          <Box sx={{ pt: 3 }}>
            {menuManage.map((item, index) => {
              return (
                <MainMenuItem
                  index={index}
                  pathname={pathname}
                  key={"menu" + index}
                />
              );
            })}
          </Box>
        </Box>
        {/* <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50px', bgcolor: 'background.primary', maxWidth: sidebarWidth, zIndex: 1 }}>
                    <Box sx={{ bgcolor: '#182520' }}>
                        <MenuItemToggleTheme />
                    </Box>
                </Box> */}
      </Box>
    </Box>
  );
}

function MainMenuItem({
  pathname,
  index,
}: {
  pathname: string;
  index: number;
}) {
  const { dataLogin } = useLoginContext();
  const menuManage = dataLogin.roleId == "doctor" ? menuOfManageDoctor : menu;
  console.log(menuManage);
  const item = menuManage[index];
  console.log(index, item);
  //   const TheIcon = item.icon;
  const isMainMenuSelect = pathname.indexOf(item.url) == 0;
  if (item.children.length == 0) {
    return (
      <LinkCustom url={item.url} target={item.target}>
        <Box
          sx={{
            cursor: "pointer",
            height: "50px",
            display: "flex",
            pl: 2.5,
            placeItems: "center",
            bgcolor: isMainMenuSelect ? "#508BA2" : "",
            borderRight: isMainMenuSelect ? "4px solid #4CADD3" : "",
            transition: "background 0.3s",
            mb: 0.2,
            opacity: isMainMenuSelect ? 1 : 0.8,
            "&:hover": {
              bgcolor: "#508BA2",
              opacity: 1,
            },
          }}
        >
          {/* <TheIcon sx={{ fontSize: "24px", color: "#fffffd", mr: 1.5 }} /> */}
          <Typography variant="body2" fontWeight={500} sx={{ color: "white" }}>
            {item.title}
          </Typography>
        </Box>
      </LinkCustom>
    );
  }
  return (
    <>
      <Box
        component={"label"}
        htmlFor={`toggle-submenu-${index}`}
        sx={{
          cursor: "pointer",
          height: "50px",
          display: "flex",
          pl: 2.5,
          placeItems: "center",
          bgcolor: isMainMenuSelect ? "#508BA2" : "",
          borderRight: isMainMenuSelect ? "4px solid #4CADD3" : "",
          transition: "background 0.3s",
          mb: 0.2,
          opacity: isMainMenuSelect ? 1 : 0.8,
          position: "relative",
          "&:hover": {
            opacity: 1,
            bgcolor: "#508BA2",
          },
          [`& + input#toggle-submenu-${index}`]: {
            display: "none",
            "&:checked": {
              "& + div": {
                gridTemplateRows: "1fr",
              },
            },
          },
        }}
      >
        {/* <TheIcon sx={{ fontSize: "24px", color: "#fffffd", mr: 1.5 }} /> */}
        <Typography variant="body2" fontWeight={500} sx={{ color: "white" }}>
          {item.title}
        </Typography>
        <ExpandMoreRounded
          sx={{ position: "absolute", right: "5px", color: "white" }}
        />
      </Box>
      <input
        type="checkbox"
        id={`toggle-submenu-${index}`}
        defaultChecked={isMainMenuSelect || false}
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: "0fr",
          transition: "grid-template-rows 0.3s",
        }}
      >
        <Box sx={{ overflow: "hidden" }}>
          {item.children.map((subItem, j) => {
            const isSubmenuSelect = pathname.indexOf(subItem.url) == 0;
            return (
              <LinkCustom
                url={subItem.url}
                key={`submenu-${j}-${index}-${subItem.title}`}
                target={subItem.target}
              >
                <Box
                  sx={{
                    cursor: "pointer",
                    height: "50px",
                    display: "flex",
                    pl: 2.5,
                    placeItems: "center",
                    mb: 0.2,
                    "& .submenu-title": {
                      color: isSubmenuSelect ? "#4CADD3" : "",
                      opacity: isSubmenuSelect ? "1" : "0.8",
                      fontWeight: isSubmenuSelect ? "600" : "400",
                    },
                    "&:hover": {
                      "& .submenu-title": {
                        opacity: 1,
                        color: isSubmenuSelect ? "" : "#508BA2!important",
                      },
                    },
                  }}
                >
                  {/* <TheIcon
                    sx={{ fontSize: "24px", visibility: "hidden", mr: 1.5 }}
                  /> */}
                  <Typography
                    className="submenu-title"
                    sx={{
                      color: "white",
                      transition: "color 0.3s, opacity 0.3s",
                    }}
                    variant="body2"
                  >
                    {subItem.title}
                  </Typography>
                </Box>
              </LinkCustom>
            );
          })}
        </Box>
      </Box>
    </>
  );
}
