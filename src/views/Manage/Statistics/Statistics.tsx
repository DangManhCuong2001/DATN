import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StatisticsAppByHospital from "./StatisticsAppByHospital/StatisticsAppByHospital";
import StatisticsAppByStatus from "./StatisticsAppByStatus/StatisticsAppByStatus";
import CollumeChart from "./CollumeChart/CollumeChart";
import { TDataStatistical } from "../../HomePage/Statistical/Statistical";
import { getStatistical } from "../../../services/PatientService/PatientService";

export default function Statistics() {
  const [data, setData] = useState<TDataStatistical>({
    totalAppointment: 0,
    totalDoctor: 0,
    totalHospital: 0,
    totalSpecialty: 0,
  });

  async function getData() {
    try {
      const response = await getStatistical();
      console.log(response);
      setData((prev) => {
        return {
          ...prev,
          totalAppointment: response.data.data.totalAppointment,
          totalDoctor: response.data.data.totalDoctor,
          totalHospital: response.data.data.totalHospital,
          totalSpecialty: response.data.data.totalSpecialty,
        };
      });
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getData();
  }, []);

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
                {data.totalAppointment}
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
                {data.totalHospital}
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
                {data.totalSpecialty}
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
                {data.totalDoctor}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={2} sx={{ mt: 3 }}>
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
