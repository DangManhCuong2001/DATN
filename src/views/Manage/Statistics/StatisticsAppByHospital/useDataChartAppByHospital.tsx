import React, { useEffect, useMemo, useState } from "react";
import { getStatisticalAppByHospitalChart } from "../../../../services/PatientService/PatientService";
import * as Highcharts from "highcharts";
import { BN } from "../../../../utils/CommonUtils";

export const color1 = "#4CADD3";
export const color2 = "#00739F";
export const color3 = "#6CB774";
export const color4 = "#2D5656";
export const color5 = "#B8E7F9";
export const color6 = "#A5A5A5";

export const COLOR_ARRAY = [color1, color2, color3, color4, color5, color6];

type TDataAllocation = {
  total: string;
  detail: {
    hospitalId: string;
    hospitalName: string;
    percentage: number;
    amount: string;
  }[];
};

export default function useDataChartAppByHospital() {
  const [dataAllocation, setDataAllocation] = useState<TDataAllocation>({
    total: "",
    detail: [],
  });
  const [loading, setLoading] = useState<boolean>(true);

  async function getDataChart() {
    setLoading(true);
    try {
      const response = await getStatisticalAppByHospitalChart();

      console.log("dfds", response);
      const totalApp = BN(response.data.data.totalAppointment);
      setDataAllocation((prev) => {
        return {
          ...prev,
          total: response.data.data.totalAppointment,
          detail: response.data.data.totalAppByHospital.map((item: any) => {
            const amount = BN(item.appointmentCount);
            return {
              amount: amount,
              hospitalName: item.Hospital.name,
              percentage: totalApp.isEqualTo(0)
                ? 0
                : Number(BN(amount).div(totalApp).times(100).toFixed(2)),
            };
          }),
        };
      });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  const { data, chart } = useMemo(() => {
    if (BN(dataAllocation.total).isEqualTo(0)) return { data: [], chart: null };
    const arr = [];
    const sortedTokensArr = dataAllocation.detail.sort(
      (a, b) => b.percentage - a.percentage
    );

    const length = sortedTokensArr.length;

    let currentPercentage = BN(0);
    for (let i = 0; i < length; i++) {
      const token = sortedTokensArr[i];
      console.log(token);
      if (i < 4) {
        arr.push({
          color: COLOR_ARRAY[i],
          percentage: token.percentage,
          title: token.hospitalName,
          data: [{ tokenName: token.hospitalName, blance: token.amount }],
        });
        currentPercentage = currentPercentage.plus(token.percentage);
      } else {
        const dataShow = [];

        for (let j = 4; j < length; j++) {
          const _token = sortedTokensArr[j];
          dataShow.push({
            tokenName: _token.hospitalName,
            blance: _token.amount,
          });
        }
        arr.push({
          color: COLOR_ARRAY[4],
          percentage: BN(100).minus(currentPercentage).toNumber(),
          title: "Other",
          data: dataShow,
        });
        break;
      }
    }

    // console.log(sortedTokensArr, arr);

    const chart: Highcharts.Options = {
      chart: {
        height: 200,
        marginLeft: 0,
        backgroundColor: "transparent",
      },
      legend: {
        enabled: false,
      },
      title: {
        text: "",
        style: {
          color: "red",
          fontSize: "16px",
        },
      },

      tooltip: {
        formatter() {
          let result = `<div style="min-width:150px; padding:8px 8px 1px 8px; ">
                                <div style="display:flex; place-items: center; margin-bottom:8px">
                                    <div style="width:14px; height:14px; background:${this.color}; border-radius:3px; margin-right:4px"></div>
                                    <div style="font-weight:700; font-size:14px; font-family:'Open Sans', sans-serif;">
                                        ${this.point.name}
                                    </div>
                                </div>`;

          result += `<div style="margin-bottom:7px;">
                                    <span style="color: ${this.color};font-weight:600; font-family:'Open Sans', sans-serif;">${this.y}%</span>
                                </div>`;

          result += "</div>";
          return result;
        },
        borderRadius: 20,
        borderWidth: 0,
        shared: true,
        useHTML: true,
        crosshairs: true,
      } as Highcharts.TooltipOptions,
      plotOptions: {
        pie: {
          states: { hover: { halo: null } },
        },
      },
      series: [
        {
          borderWidth: 0,
          type: "pie",
          size: "100%",
          innerSize: "80%",
          cursor: "pointer",
          gapSize: 0,
          borderRadius: 0,
          dataLabels: {
            enabled: false,
            crop: false,
            connectorWidth: 0,
          },

          data: arr.map((item) => {
            return [item.title, item.percentage];
          }),
        } as Highcharts.SeriesPieOptions,
      ],
    };

    return { data: arr, chart };
  }, [dataAllocation.total]);

  useEffect(() => {
    getDataChart();
  }, []);

  return { dataAllocation, data, chart, loading };
}
