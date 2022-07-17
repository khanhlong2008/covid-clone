/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import { Button, ButtonGroup } from "@material-ui/core";
import SearchVaccine from "../../SearchSelected/SearchVaccine";
import { Grid } from "@material-ui/core";

const options = {
  plugins: {
    legend: {
      display: false,
    },

    elements: {
      point: {
        radius: 0,
      },
    },

    maintainAspectRatio: true,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
  },
  animations: {
    tension: {
      duration: 1000,
      easing: "linear",
      from: 1,
      to: 0,
      loop: true,
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "LL",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};
export default function LineChartVaccine({
  casesType,
  vaccineCountry,
  countries,
  onVaccineChange,
}) {
  const [data, setData] = useState({});
  const [reportType, setReportType] = useState("all");
  const buildChartData = (data) => {
    let chartData = [];
    let lastDataPoint;
    if (data) {
      for (let date in data) {
        if (lastDataPoint) {
          let newDataPoint = {
            x: date,
            y: data[date],
          };
          chartData.push(newDataPoint);
        }
        lastDataPoint = data[date];
      }
      return chartData;
    }
  };
 
  useEffect(() => {
    const fetchData = async () => {
      vaccineCountry === "Worldwide"
        ? await fetch(
            "https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=45"
          )
            .then((response) => response.json())
            .then((data) => {
              let chartData = buildChartData(data || {});
              let customData = [];
              switch (reportType) {
                case "all":
                  customData = chartData;
                  break;
                case "Yesterday":
                  customData = chartData.slice(
                    Math.max(chartData.length - 2, 1)
                  );

                  break;
                case "30":
                  customData = chartData.slice(
                    Math.max(chartData.length - 30, 1)
                  );
                  break;
                case "7":
                  customData = chartData.slice(
                    Math.max(chartData.length - 7, 1)
                  );
                  break;

                default:
                  customData = chartData;
                  break;
              }
              setData(customData);
            })
        : await fetch(
            `https://disease.sh/v3/covid-19/vaccine/coverage/countries/${vaccineCountry}?lastdays=45`
          )
            .then((response) => response.json())
            .then((data) => {
              let chartData = buildChartData(data.timeline || {}, casesType);
              let customData = [];
              switch (reportType) {
                case "all":
                  customData = chartData;
                  break;
                case "Yesterday":
                  customData = chartData.slice(
                    Math.max(chartData.length - 2, 1)
                  );

                  break;
                case "30":
                  customData = chartData.slice(
                    Math.max(chartData.length - 30, 1)
                  );
                  break;
                case "7":
                  customData = chartData.slice(
                    Math.max(chartData.length - 7, 1)
                  );
                  break;

                default:
                  customData = chartData;
                  break;
              }
              setData(customData);
            });
    };

    fetchData();
  }, [reportType, vaccineCountry]);
  return (
    <>
      <Grid container spacing={1}>
        <Grid
          item
          sm={12}
          xs={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SearchVaccine
            value={vaccineCountry}
            onVaccineChange={onVaccineChange}
            countries={countries}
          />
        </Grid>
        <Grid
          item
          sm={12}
          xs={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ButtonGroup
            variant="contained"
            aria-label=" large outlined button group"
            style={{}}
          >
            <Button
              color={reportType === "all" ? "primary" : ""}
              onClick={() => setReportType("all")}
            >
              <h5>All</h5>
            </Button>
            <Button
              color={reportType === "Yesterday" ? "primary" : ""}
              onClick={() => setReportType("Yesterday")}
            >
              <h5>Yesterday</h5>
            </Button>
            <Button
              color={reportType === "7" ? "primary" : ""}
              onClick={() => setReportType("7")}
            >
              <h5>7days</h5>
            </Button>
            <Button
              color={reportType === "30" ? "primary" : ""}
              onClick={() => setReportType("30")}
            >
              <h5>30days</h5>
            </Button>
          </ButtonGroup>
        </Grid>
          {data?.length > 0 && (
            <Line
              data={{
                datasets: [
                  {
                    backgroundColor: "#33CCFF",
                    borderColor: "#33CCFF",
                    borderWidth: 1,
                    data: data,
                  },
                ],
              }}
              options={options}
            />
          )}
      </Grid>
    </>
  );
}
