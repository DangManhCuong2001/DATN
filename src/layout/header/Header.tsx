import { Box, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import { Container } from "../../components/container/Container";
import { IconLogo } from "../../assets/icon/icon";
import ButtonLogin from "../../components/ButtonLogin/ButtonLogin";
import DropDownMenu from "../../components/DropDownMenu/DropDownMenu";
import LinkCustom from "../../components/LinkCustom/LinkCustom";
import { useLoginContext } from "../../context/login-context";
import { TTypeHospital } from "../../context/constants/typeData";
import { imagePath } from "../../constants/imagePath";

export type TNav = {
  title: string;
  subPage: {
    subTitle: string;
    href: string;
  }[];
};

export type TNavHospital = {
  title: string;
  subPage: {
    type: TTypeHospital;
    subTitle: string;
    href: string;
  }[];
};
export const navHospital: TNavHospital = {
  title: "Cơ sở y tế",
  subPage: [
    {
      type: "benhVienCong",
      subTitle: "Bệnh viên công",
      href: "/benhVienCong",
    },
    {
      type: "benhVienTu",
      subTitle: "Bệnh viện tư",
      href: "/benhVienTu",
    },
    {
      type: "phongKham",
      subTitle: "Phòng khám",
      href: "/phongKham",
    },
  ],
};
const navHealthServices: TNav = {
  title: "Dịch vụ y tế",
  subPage: [
    {
      subTitle: "Đặt khám tại cơ sở",
      href: "https://www.youtube.com/watch?v=p7YGAKeDPkM&list=RDMMSeWt7IpZ0CA&index=27",
    },
    {
      subTitle: "Đặt khám theo bác sĩ",
      href: "",
    },
    {
      subTitle: "Đặt lịch xét nghiệm",
      href: "",
    },
    {
      subTitle: "Y tế tại nhà",
      href: "",
    },
  ],
};

const navSpeciality: TNav = {
  title: "Chuyên khoa",
  subPage: [
    {
      subTitle: "Cơ xương khớp",
      href: "speciality/coXuongKhop",
    },
    {
      subTitle: "Thần kinh",
      href: "speciality/thanKinh",
    },
    {
      subTitle: "Tiêu hoá",
      href: "speciality/tieuHoa",
    },
    {
      subTitle: "Tim mạch",
      href: "",
    },
    {
      subTitle: "Sản phụ khoa",
      href: "",
    },
    {
      subTitle: "Nhi khoa",
      href: "",
    },
    {
      subTitle: "Da liễu",
      href: "",
    },
  ],
};
export default function Header() {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        position: "sticky",
        zIndex: 1000,
        top: 0,
        boxShadow:
          "0 10px 20px rgba(0,0,0,.04),0 2px 6px rgba(0,0,0,.04),0 0 1px rgba(0,0,0,.04)",
      }}
    >
      <Container>
        <Box
          sx={{
            height: "100px",
            display: "flex",
            placeItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* <Typography>Logo</Typography> */}
          <LinkCustom url="/" target="_blank">
            {/* <IconLogo /> */}
            <img
              src={imagePath.logo_white}
              style={{ width: "150px", height: "65px" }}
            />
          </LinkCustom>
          <Box
            sx={{
              display: "flex",
              placeItems: "center",
              ml: 10,
            }}
          >
            <Typography sx={{ mr: 3, color: "#003553", fontWeight: 600 }}>
              Giới thiệu
            </Typography>
            <DropDownMenu nav={navHospital} />
            {/* <DropDownMenu nav={navHealthServices} /> */}
            {/* <DropDownMenu nav={navSpeciality} /> */}
            <Typography sx={{ mr: 3, color: "#003553", fontWeight: 600 }}>
              Tin tức
            </Typography>
            <Typography sx={{ mr: 3, color: "#003553", fontWeight: 600 }}>
              Hướng dẫn
            </Typography>
            <Typography sx={{ mr: 3, color: "#003553", fontWeight: 600 }}>
              Liên hệ hợp tác
            </Typography>
          </Box>
          <ButtonLogin />
        </Box>
      </Container>
    </Box>
  );
}
