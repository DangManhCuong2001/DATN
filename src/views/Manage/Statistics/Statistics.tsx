import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import StatisticsAppByHospital from "./StatisticsAppByHospital/StatisticsAppByHospital";
import StatisticsAppByStatus from "./StatisticsAppByStatus/StatisticsAppByStatus";
import CollumeChart from "./CollumeChart/CollumeChart";

export default function Statistics() {
  return (
    <Box sx={{ mt: 3 }}>
      <Box
        sx={{
          backgroundColor: "rgb(27, 38, 38)",
          p: 3,
          borderRadius: "20px",
        }}
      >
        <Grid container>
          <Grid item xs={3}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                sx={{ color: "rgb(149, 167, 172)", fontWeight: 600, mb: 1 }}
              >
                Tổng lượt đặt khám
              </Typography>
              <Typography sx={{ color: "rgb(149, 167, 172)", fontWeight: 600 }}>
                10
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={3}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                sx={{ color: "rgb(149, 167, 172)", fontWeight: 600, mb: 1 }}
              >
                Số cơ sở y tế
              </Typography>
              <Typography sx={{ color: "rgb(149, 167, 172)", fontWeight: 600 }}>
                5
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                sx={{ color: "rgb(149, 167, 172)", fontWeight: 600, mb: 1 }}
              >
                Số chuyên khoa
              </Typography>
              <Typography sx={{ color: "rgb(149, 167, 172)", fontWeight: 600 }}>
                20
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                sx={{ color: "rgb(149, 167, 172)", fontWeight: 600, mb: 1 }}
              >
                Số bác sĩ
              </Typography>
              <Typography sx={{ color: "rgb(149, 167, 172)", fontWeight: 600 }}>
                265
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <StatisticsAppByHospital />
        </Grid>
        <Grid item xs={6}>
          <StatisticsAppByStatus />
        </Grid>
      </Grid>

      <CollumeChart />
    </Box>
  );
}
