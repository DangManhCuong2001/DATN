import { Box, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Container } from "../../components/container/Container";
import { IconSearch, IconSpinLoading } from "../../assets/icon/icon";
import ListHospital from "./ListHospital/ListHospital";
import { useParams } from "react-router-dom";
import LinkCustom from "../../components/LinkCustom/LinkCustom";
import { useHospitalContext } from "../../context/hospital-context";
import { TTypeHospital } from "../../context/constants/typeData";
import BoxPreviewHospital from "../../components/BoxPreviewHospital/BoxPreviewHospital";
import BoxSearchHospital from "./BoxSearchHospital/BoxSearchHospital";
import { getDataSearchHospital } from "../../services/PatientService/PatientService";
import { useEffect, useState } from "react";
import { TAllDataHospital } from "../../services/HospitalService/HospitalService";

export default function Hospital() {
  const { idTypeHospital } = useParams();
  const { dataHospital, hospitalsWithType, typeHospital } =
    useHospitalContext();
  const dataLocalHospital = dataHospital[idTypeHospital as TTypeHospital];
  console.log(dataLocalHospital);
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [hospitalsSearch, setHospitalsSearch] = useState<TAllDataHospital[]>(
    []
  );

  async function getData() {
    setLoading(true);
    try {
      const response = await getDataSearchHospital(value, typeHospital);

      console.log(response);

      setHospitalsSearch(response);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    const timeOut = setTimeout(() => {
      getData();
    }, 2000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [value, typeHospital]);

  return (
    <Box sx={{ mt: 3 }}>
      <Container sx={{ display: "flex", placeItems: "center" }}>
        <LinkCustom url={"/"}>
          <Typography
            sx={{ cursor: "pointer", color: "#003553", fontWeight: 600 }}
          >
            Trang chủ
          </Typography>
        </LinkCustom>
        <ArrowForwardIosIcon sx={{ fontSize: "16px", mx: 1 }} />
        <Typography sx={{ color: "#00b5f1", fontWeight: 600 }}>
          {dataLocalHospital.title}
        </Typography>
      </Container>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "30px",
          color: "#00b5f1",
          textAlign: "center",
          mt: 3,
          mb: 1,
        }}
      >
        {dataLocalHospital.title}
      </Typography>
      <Typography
        sx={{ textAlign: "center", mb: 3, color: "#003553", fontWeight: 400 }}
      >
        Đặt khám dễ dàng, không lo chờ đợi tại các bệnh viện công hàng đầu Việt
        Nam
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            width: "500px",
            height: "40px",
            display: "flex",
            alignItems: "center",

            boxShadow: " 0px 3px 6px 0px rgba(0, 0, 0, 0.08);",
            // border: "1px solid",
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
          <IconSearch sx={{ color: "#bcbcbc" }} />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="inputStyle"
            style={{
              border: "none",
              background: "none",
              outline: "none",
              width: "calc(100% - 25px)",
              fontSize: "14px",
            }}
            placeholder="Tìm kiếm bệnh viện"
          ></input>
        </Box>
      </Box>
      <ListHospital />
      <Box sx={{ background: "#e8f2f7", display: "flex" }}>
        <Container sx={{ py: 3 }}>
          {value == "" ? (
            <>
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
            </>
          ) : (
            <>
              {hospitalsSearch.map((item, index) => {
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
            </>
          )}
        </Container>
      </Box>
    </Box>
  );
}
