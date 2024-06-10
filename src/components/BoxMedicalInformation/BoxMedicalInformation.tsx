import { Box, Typography } from "@mui/material";
import React from "react";

export default function BoxMedicalInformation() {
  return (
    <Box
      sx={{
        borderLeft: "1px solid",
        borderColor: "rgba(238, 238, 238, 1.00)",
        p: 2,
      }}
    >
      <Box
        sx={{
          borderTop: "1px solid",
          borderColor: "rgba(238, 238, 238, 1.00)",

          mt: 1,
          py: 1,
        }}
      >
        <Typography sx={{ fontWeight: 600, color: "rgb(102 102 102/ 1)" }}>
          ĐỊA CHỈ KHÁM
        </Typography>
        <Typography>Phòng khám Đa khoa Quốc tế Nhân Hậu</Typography>
        <Typography>
          522-524 Nguyễn Chí Thanh, Phường 7, Quận 10, Thành phố Hồ Chí Minh
        </Typography>
      </Box>
      <Typography
        sx={{
          borderTop: "1px solid",
          borderColor: "rgba(238, 238, 238, 1.00)",
          mt: 1,
          py: 1,
        }}
      >
        GIÁ KHÁM: 120.000đ
      </Typography>
      <Typography
        sx={{
          borderTop: "1px solid",
          borderColor: "rgba(238, 238, 238, 1.00)",
          mt: 1,
          py: 1,
        }}
      >
        LOẠI BẢO HIỂM ÁP DỤNG
      </Typography>
    </Box>
  );
}
