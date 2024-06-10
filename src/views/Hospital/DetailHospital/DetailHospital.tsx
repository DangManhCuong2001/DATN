import React, { useEffect } from "react";
import { Container } from "../../../components/container/Container";
import { Box, Button, Grid, Typography } from "@mui/material";
import { imagePath } from "../../../constants/imagePath";
import DividerCustom from "../../../components/DividerCustom/DividerCustom";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import LinkCustom from "../../../components/LinkCustom/LinkCustom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SliderImage from "../SliderImage/SliderImage";
import { useNavigate, useParams } from "react-router-dom";
import { useHospitalContext } from "../../../context/hospital-context";

export default function DetailHospital() {
  const navigate = useNavigate();
  const { idHospital } = useParams();
  console.log(idHospital);
  const { infoHospital, setDataForm } = useHospitalContext();

  useEffect(() => {
    setDataForm((prev) => {
      return {
        ...prev,
        hospitalSelected: idHospital as string,
      };
    });
  }, []);
  return (
    <Box sx={{ backgroundColor: "#e8f2f7" }}>
      <Container>
        <Box sx={{ display: "flex", placeItems: "center", mb: 4 }}>
          <LinkCustom url={"/"}>
            <Typography sx={{ cursor: "pointer", fontSize: "18px" }}>
              Trang chủ
            </Typography>
          </LinkCustom>
          <ArrowForwardIosIcon sx={{ fontSize: "14px", mx: 1 }} />
          <Typography
            sx={{ color: "#47bfff", fontSize: "18px", fontWeight: 600 }}
          >
            {infoHospital.name}
          </Typography>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={6} md={4.5}>
            <Box
              sx={{
                p: 4,
                background: "white",
                borderRadius: "12px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    backgroundImage: `url(${infoHospital.image})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "auto",
                    // backgroundPosition: "center",
                    width: "160px",
                    height: "160px",
                    borderRadius: "12px",
                  }}
                ></Box>
              </Box>
              <Typography sx={{ mt: 2, textAlign: "center" }}>
                {infoHospital.name}
              </Typography>

              <DividerCustom />

              <Box sx={{ textAlign: "center" }}>
                <Box sx={{ display: "flex", placeItems: "center", mb: 2 }}>
                  <LocationOnRoundedIcon sx={{ fontSize: "24px", mr: 0.5 }} />
                  <Typography>{infoHospital.address}</Typography>
                </Box>
                <Box sx={{ display: "flex", placeItems: "center", mb: 2 }}>
                  <AccessTimeRoundedIcon sx={{ fontSize: "24px", mr: 0.5 }} />
                  <Typography>Thứ 2 - Thứ 6</Typography>
                </Box>
                <Box sx={{ display: "flex", placeItems: "center", mb: 2 }}>
                  <LocalPhoneRoundedIcon sx={{ fontSize: "24px", mr: 0.5 }} />
                  <Typography>Hỗ trợ đặt khám: 1900 2115</Typography>
                </Box>
                <Button
                  variant="contained"
                  onClick={() => navigate(`/SelectAppointment/${idHospital}`)}
                >
                  Đặt khám ngay
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} md={7.5}>
            <SliderImage />
          </Grid>
        </Grid>
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={6} md={4.5}>
              <Box sx={{ p: 4, background: "white", borderRadius: "12px" }}>
                <Typography sx={{ fontWeight: 600, fontSize: "24px" }}>
                  Mô tả
                </Typography>
                <Typography>
                  Bệnh viện Đa khoa Singapore (Sing General Hospital - SGH) là
                  bệnh viện công lớn nhất Singapore với thiết bị y tế tân tiến
                  và đội ngũ bác sĩ có chuyên môn hàng đầu, đặc biệt là trong
                  chữa trị ung thư. Cùng tìm hiểu về Bệnh viện Đa khoa Singapore
                  và đưa ra quyết định khám chữa bệnh nước ngoài tốt nhất nhé!
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={7.5}>
              <Box sx={{ p: 4, background: "white", borderRadius: "12px" }}>
                <Typography sx={{ fontWeight: 600, fontSize: "24px" }}>
                  Bệnh viện Đa khoa Singapore - Bệnh viện tốt nhất Singapore
                </Typography>
                <Typography>
                  Bệnh viện Đa khoa Singapore (Sing General Hospital - SGH) là
                  bệnh viện công lớn nhất Singapore với thiết bị y tế tân tiến
                  và đội ngũ bác sĩ có chuyên môn hàng đầu, đặc biệt là trong
                  chữa trị ung thư. Cùng tìm hiểu về Bệnh viện Đa khoa Singapore
                  và đưa ra quyết định khám chữa bệnh nước ngoài tốt nhất nhé!
                </Typography>
                <Typography sx={{ fontWeight: 600, fontSize: "24px" }}>
                  1. Bệnh viện Đa khoa Singapore (Sing General Hospital - SGH)
                </Typography>
                <Typography>
                  Theo Hiệp hội Thương mại và Du lịch Singapore - SATA,
                  Singapore là một trong những quốc gia có lượng người Việt Nam
                  đến khám chữa bệnh nhiều nhất với hơn 30 nghìn người trong năm
                  2022 và tăng trung bình 10% mỗi năm trong giai đoạn 2017-2022.
                  Theo đó, Bệnh viện Sing General Hospital (SGH) - Cơ sở y tế
                  công lập hàng đầu tại Singapore hiện chăm sóc và điều trị cho
                  hơn 50% bệnh nhân tại Singapore với 50 chuyên khoa lâm sàng,
                  nổi bật khi sở hữu Các Trung Tâm & Dịch Vụ Lâm Sàng hàng đầu:
                  Trung tâm điều trị bỏng lớn nhất Đông Nam Á; Trung tâm áp suất
                  cao duy nhất ở Đông Nam Á có thể điều trị bệnh nhân nguy kịch;
                  Cơ sở đầu tiên và lớn nhất ở Singapore kiểm soát cơn đau mãn
                  tính, tàn tật; Cung cấp dịch vụ chăm sóc cho tất cả các loại
                  rối loạn huyết học; Sở hữu các liệu pháp tiên tiến được áp
                  dụng: hóa trị, ghép tế bào gốc, CAR-T, liệu pháp chống vi
                  khuẩn, chăm sóc hỗ trợ sau hóa trị và sau ghép tủy… Có Ngoại
                  Khoa Chỉnh Hình lâu đời nhất, lớn nhất và uy tín nhất ở
                  Singapore Các bệnh lý phổ biến nhất mà người Việt Nam chọn đến
                  khám chữa bệnh tại Bệnh viện Đa khoa Singapore là ung thư, tim
                  mạch, thần kinh… và các bệnh hiếm gặp. Với trang thiết bị hiện
                  đại hàng đầu khu vực, đội ngũ y bác sĩ chuyên môn cao và những
                  thành tựu y học của mình, SGH được xem là Bệnh viện tốt nhất
                  Singapore, là điểm khám chữa bệnh hàng đầu của người dân khu
                  vực và đón hàng triệu lượt khách quốc tế đến điều trị mỗi năm.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
