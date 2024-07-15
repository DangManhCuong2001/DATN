import { Box, Grid, Skeleton, Typography } from "@mui/material";
import useDataChartAppByHospital from "./useDataChartAppByHospital";
import HighchartsReact from "highcharts-react-official";
import * as Highcharts from "highcharts";
import { useRef } from "react";

export default function StatisticsAppByHospital() {
  const { dataAllocation, chart, data, loading } = useDataChartAppByHospital();
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  console.log(chart, data);
  return (
    <Box
      sx={{
        backgroundColor: "rgb(27, 38, 38)",
        p: 3,

        height: "100%",
        borderRadius: "20px",
      }}
    >
      <Box>
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "20px",
              color: "rgb(149, 167, 172)",
            }}
          >
            Phân bổ lượt đặt khám theo bệnh viện
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {loading ? (
              <>
                <Skeleton
                  variant="rounded"
                  width={"100%"}
                  height={"23px"}
                  sx={{ mb: 1.5 }}
                />
                <Skeleton
                  variant="rounded"
                  width={"100%"}
                  height={"23px"}
                  sx={{ mb: 1.5 }}
                />
                <Skeleton
                  variant="rounded"
                  width={"100%"}
                  height={"23px"}
                  sx={{ mb: 1.5 }}
                />
                <Skeleton
                  variant="rounded"
                  width={"100%"}
                  height={"23px"}
                  sx={{ mb: 1.5 }}
                />
              </>
            ) : (
              <>
                {/* {console.log(data)} */}
                {data.map((item, index) => {
                  return (
                    <Box
                      key={item.title + item.percentage + index}
                      sx={{
                        display: "flex",
                        placeItems: "start",
                        justifyContent: "space-between",
                        mb: 1.5,
                        maxWidth: "220px",
                      }}
                    >
                      <Box sx={{ display: "flex", placeItems: "center" }}>
                        <Box
                          sx={{
                            background: item.color,
                            height: "14px",
                            width: "14px",
                            borderRadius: "3px",
                            mr: 1,
                          }}
                        ></Box>
                        <Typography variant="body2" color={"white"}>
                          {item.title}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        sx={{ color: "white" }}
                      >
                        {item.percentage}%
                      </Typography>
                    </Box>
                  );
                })}
              </>
            )}
          </Grid>
          <Grid item xs={6}>
            {loading ? (
              // <IconSpinLoading sx={{ fontSize: '120px' }} />
              <></>
            ) : (
              <Box sx={{ minWidth: "138px", mt: -4 }}>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={chart}
                  ref={chartComponentRef}
                ></HighchartsReact>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
