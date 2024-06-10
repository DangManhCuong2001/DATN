import { Container } from "../../../components/container/Container";
import { Box, Button } from "@mui/material";
import BoxPreviewHospital from "../../../components/BoxPreviewHospital/BoxPreviewHospital";
import { navHospital } from "../../../layout/header/Header";
import LinkCustom from "../../../components/LinkCustom/LinkCustom";
import { useHospitalContext } from "../../../context/hospital-context";

export default function ListHospital() {
  const { setTypeHospital } = useHospitalContext();
  return (
    <Box
      sx={{
        borderTop: "1px solid",
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
              variant="contained"
              onClick={() => setTypeHospital(item.type)}
              sx={{ borderRadius: "20px", fontWeight: 600, mr: 5 }}
            >
              {item.subTitle}
            </Button>
          </LinkCustom>
        );
      })}
    </Box>
  );
}
