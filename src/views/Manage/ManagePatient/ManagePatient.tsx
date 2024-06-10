import { Box, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import DividerCustom from "../../../components/DividerCustom/DividerCustom";

export default function ManagePatient() {
  return (
    <Box>
      <Typography
        sx={{ textAlign: "center", fontSize: "20px", fontWeight: 600, mb: 5 }}
      >
        Quản lý bệnh nhân
      </Typography>

      <Box>
        <Typography>Chọn ngày khám</Typography>
        <TextField type="date" />
      </Box>
      <Grid container sx={{ mt: 5 }}>
        <Grid item xs={1}>
          <Typography>STT</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Họ và tên</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Thời gian</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Số điện thoại</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Địa chỉ</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography>Giới tính</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Actions</Typography>
        </Grid>
      </Grid>
      <DividerCustom />
      <Grid container>
        <Grid item xs={1}>
          <Typography>1</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Họ và tên</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Thời gian</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Địa chỉ</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Địa chỉ</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography>Giới tính</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Actions</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
