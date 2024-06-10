import { Box, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Container } from "../../components/container/Container";
import { IconSearch } from "../../assets/icon/icon";
import ListHospital from "./ListHospital/ListHospital";
import { useParams } from "react-router-dom";
import LinkCustom from "../../components/LinkCustom/LinkCustom";
import { useHospitalContext } from "../../context/hospital-context";
import { TTypeHospital } from "../../context/constants/typeData";
import BoxPreviewHospital from "../../components/BoxPreviewHospital/BoxPreviewHospital";

export default function Hospital() {
  const { idTypeHospital } = useParams();
  const { dataHospital, hospitalsWithType } = useHospitalContext();
  const dataLocalHospital = dataHospital[idTypeHospital as TTypeHospital];
  console.log(dataLocalHospital);

  return (
    <Box sx={{ mt: 3 }}>
      <Container sx={{ display: "flex" }}>
        <LinkCustom url={"/"}>
          <Typography sx={{ cursor: "pointer" }}>Trang chủ</Typography>
        </LinkCustom>
        <ArrowForwardIosIcon />
        <Typography>{dataLocalHospital.title}</Typography>
      </Container>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "30px",
          color: "#00b5f1",
          textAlign: "center",
          mt: 3,
        }}
      >
        {dataLocalHospital.title}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            width: "500px",
            height: "40px",
            display: "flex",
            alignItems: "center",

            boxShadow: " 0px 3px 6px 0px rgba(0, 0, 0, 0.08);",
            borderRadius: "25px",
            px: 2,
            py: 1,
            columnGap: 1,
            "& .inputStyle": {
              color: "text.primary",
              fontFamily: "'Open Sans',sans-serif",
            },
          }}
        >
          <IconSearch sx={{ color: "red" }} />
          <input
            className="inputStyle"
            style={{
              border: "none",
              background: "none",
              outline: "none",
              width: "calc(100% - 25px)",
              fontSize: "14px",
            }}
            placeholder="Search...."
          ></input>
        </Box>
      </Box>
      <ListHospital />
      <Box sx={{ background: "#e8f2f7" }}>
        <Container sx={{ py: 3 }}>
          {hospitalsWithType.map((item, index) => {
            return (
              <BoxPreviewHospital
                key={"hospitalsWithType" + index}
                name={item.name}
                address={item.address}
                image={item.image}
                idHospital={item.id}
                idTypeHospital={idTypeHospital}
              />
            );
          })}
        </Container>
      </Box>
    </Box>
  );
}
