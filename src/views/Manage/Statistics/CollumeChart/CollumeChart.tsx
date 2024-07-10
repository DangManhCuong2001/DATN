import { Box } from "@mui/material";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts/highstock";
import { getAppIn7Day } from "../../../../services/PatientService/PatientService";

export default function CollumeChart() {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [optionChart, setOptionChart] = useState<Highcharts.Options>(
    {} as Highcharts.Options
  );

  async function Chart() {
    const response = await getAppIn7Day();
    console.log(response);
    const listDay = response.data.data.map((item: any) => {
      return item.date;
    });
    console.log(listDay);
    const listData = response.data.data.map((item: any) => {
      return item.count;
    });
    const Option: Highcharts.Options = {
      chart: {
        type: "column",
        backgroundColor: "transparent",
      },
      title: {
        text: "Số đơn đặt khám trong 7 ngày gần nhất",
        align: "center",
        style: {
          color: "rgb(149, 167, 172)",
        },
      },

      xAxis: {
        // categories: ["6/7", "7/7", "8/7", "9/7", "10/7", "11/7"],
        categories: listDay,
        crosshair: true,
        accessibility: {
          description: "Countries",
        },
      },
      yAxis: {
        min: 0,
        // title: {
        //   text: "Số lu",
        //   style: {
        //     color: "red",
        //   },
        // },
      },
      //   tooltip: {
      //     valueSuffix: " (1000 MT)",
      //     style: {
      //       color: "red",
      //     },
      //   },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: [
        {
          type: "column",
          name: "Số đơn đặt khám",
          //   data: [5, 20, 18, 4, 6, 7, 5],
          data: listData,
        },
      ],
    };
    setOptionChart(Option);
  }

  useEffect(() => {
    Chart();
  }, []);
  return (
    <Box
      sx={{
        backgroundColor: "rgb(27, 38, 38)",
        p: 3,
        borderRadius: "20px",
        mt: 3,
      }}
    >
      <HighchartsReact
        highcharts={Highcharts}
        options={optionChart}
        ref={chartComponentRef}
        // constructorType={"stockChart"}
      ></HighchartsReact>
    </Box>
  );
}
