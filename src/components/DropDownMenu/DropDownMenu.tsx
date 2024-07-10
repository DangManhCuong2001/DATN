import { Box, Typography } from "@mui/material";
import { TNav } from "../../layout/header/Header";
import { ExpandMoreRounded } from "@mui/icons-material";
import LinkCustom from "../LinkCustom/LinkCustom";

export default function DropDownMenu({ nav }: { nav: TNav }) {
  return (
    <Box
      sx={{
        zIndex: 999,
        mr: 2,
        position: "relative",
        "& .dropdown-css": {
          display: "none",
          position: "absolute",
          top: "100%",
          left: "50%",
          transform: "translateX(-50%)",
        },
        "&:hover": {
          "& .dropdown-css": {
            display: "block",
          },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          color: "#003553",
          "&:hover": {
            color: "#1da1f2",
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            right: 1,
            "&:hover": {
              color: "#1da1f2",
            },
          }}
        >
          {nav.title}
        </Typography>
        <ExpandMoreRounded sx={{}} />
      </Box>
      <Box className="dropdown-css">
        <Box
          sx={{
            mt: 2,
            minWidth: "200px",
            borderRadius: "10px",
            // px: 3,
            // py: 1,
            // maxHeight: "70%",
            boxShadow: "0px 2px 8px 0px rgba(81, 133, 170, 0.29)",
            backgroundColor: "hsla(0,0%,90%,.8)",
          }}
          className="custom-scrollbar"
        >
          {nav.subPage?.map((item, index) => (
            <Box key={index} sx={{}}>
              <LinkCustom
                url={item.href ? item.href : ""}
                // target={item.isExternal ? "_blank" : "_self"}
              >
                <Typography
                  sx={{
                    "&:hover": {
                      bgcolor: "#e8f2f7",
                      color: "#1da1f2",
                      opacity: 1,
                    },
                    py: 1,
                    px: 1,
                  }}
                >
                  {item.subTitle}
                </Typography>
              </LinkCustom>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
