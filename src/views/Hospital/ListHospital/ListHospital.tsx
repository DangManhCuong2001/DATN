import { Container } from "../../../components/container/Container";
import { Box, Button } from "@mui/material";
import BoxPreviewHospital from "../../../components/BoxPreviewHospital/BoxPreviewHospital";
import { navHospital } from "../../../layout/header/Header";
import LinkCustom from "../../../components/LinkCustom/LinkCustom";
import { useHospitalContext } from "../../../context/hospital-context";

export default function ListHospital() {
  const { setTypeHospital, typeHospital } = useHospitalContext();
  return (
    <Box
      sx={{
        borderTop: "1px solid #e3e3e3",
        mt: 5,
        py: 3,
        display: "flex",
        justifyContent: "center",
      }}
    >
      {navHospital.subPage.map((item, index) => {
        return (
          <LinkCustom url={item.href}>
            <Button
              variant={typeHospital == item.type ? "contained" : "outlined"}
              onClick={() => setTypeHospital(item.type)}
              sx={{
                borderRadius: "20px",
                border: "none",
                fontWeight: 600,
                mr: 5,
                background:
                  typeHospital == item.type
                    ? "linear-gradient(83.63deg,#00b5f1 33.34%,#00e0ff 113.91%)"
                    : "#ebf9fd",
                width: "200px",
              }}
            >
              {item.subTitle}
            </Button>
          </LinkCustom>
        );
      })}
    </Box>
  );
}
