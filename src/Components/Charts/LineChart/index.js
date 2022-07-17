/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import { Button, ButtonGroup } from "@material-ui/core";
import SearchSelected from "../../SearchSelected";
import { Grid } from "@material-ui/core";
import { Doughnut } from "react-chartjs-2";

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
export default function LineChart({
  casesType,
  country,
  countryInfo,
  countries,
  value,
  onCountryChange,
}) {
  const [data, setData] = useState({});
  const [color, setColor] = useState("cases");
  const [reportType, setReportType] = useState("all");
  const [DataDoughnut, setDataDoughnut] = useState({});
  const buildChartData = (data, casesType) => {
    let chartData = [];
    let lastDataPoint;
    if (data.cases) {
      for (let date in data.cases) {
        if (lastDataPoint) {
          let newDataPoint = {
            x: date,
            y: data[casesType][date] - lastDataPoint,
          };
          chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
      }
      return chartData;
    }
  };
  const buildchartDoughnut = (data) => {
    let chartData = [];
    const rateDeaths = parseFloat((data.deaths * 100) / data.cases).toFixed(2);
    const rateRecovery = parseFloat(
      (data.recovered * 100) / data.cases
    ).toFixed(2);
    const rateCases = parseFloat((data.cases * 100) / data.population).toFixed(
      2
    );
    chartData.push(rateCases, rateDeaths, rateRecovery);
    delete chartData.lenght;
    return chartData;
  };
  useEffect(() => {
    const fetchData = async () => {
      country === "Worldwide"
        ? await fetch("https://disease.sh/v3/covid-19/all")
            .then((reponse) => reponse.json())
            .then((data) => {
              let chartData = buildchartDoughnut(data);
              setDataDoughnut(chartData);
            })
        : await fetch(`https://disease.sh/v3/covid-19/countries/${country}`)
            .then((response) => response.json())
            .then((data) => {
              let chartData = buildchartDoughnut(data);
              setDataDoughnut(chartData);
            });
    };
    fetchData();
  }, [country]);
  useEffect(() => {
    const fetchData = async () => {
      country === "Worldwide"
        ? await fetch(
            "https://disease.sh/v3/covid-19/historical/all?lastdays=120"
          )
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              let chartData = buildChartData(data || {}, casesType);
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
            `https://disease.sh/v3/covid-19/historical/${country}?lastdays=120`
          )
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              // if(data.time === false) {
              //   setFetch("fetch")
              // }
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
  }, [casesType, country, reportType]);
  useEffect(() => {
    if (casesType === "cases") {
      setColor("#DF0029");
    } else if (casesType === "recovered") {
      setColor("#33CCFF");
    } else {
      setColor("#000000");
    }
  }, [casesType]);

  return (
    <div className="background App">
      <Grid container spacing={1} style={{ marginTop: 20 }}>
        <Grid
          item
          sm={12}
          xs={12}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <SearchSelected
            countries={countries}
            onCountryChange={onCountryChange}
            value={value}
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
      </Grid>
      <Grid container spacing={1}>
        <Grid item sm={8} xs={12}>
        
          {country === "Worldwide" ? (
            <h2
              style={{ marginBottom: 20, textAlign: "center", marginTop: 20 }}
            >
              Worldwide New {casesType}
            </h2>
          ) : (
            <h2
              style={{ marginBottom: 20, textAlign: "center", marginTop: 20 }}
            >
              {countryInfo.country} New {casesType}
            </h2>
          )}
          {/* <div className="background App"> */}
          {data?.length > 0 && (
            <Line
              data={{
                datasets: [
                  {
                    backgroundColor: color,
                    borderColor: color,
                    borderWidth: 1,
                    data: data,
                  },
                ],
              }}
              options={options}
            />
          )}
            {/* </div> */}
        </Grid>
        
        <Grid item sm={4} xs={12} style={{ marginTop: 30 }}>
          {country === "Worldwide" ? (
            <h2 style={{ marginBottom: 20, textAlign: "center" }}>
              Worldwide Percentage
            </h2>
          ) : (
            <h2 style={{ marginBottom: 20, textAlign: "center" }}>
              {countryInfo.country} Percentage
            </h2>
          )}

          <div className=" background App ">
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize:12,
              }}
            >
              Cases: {DataDoughnut[0]}% - Deaths: {DataDoughnut[1]}% - Recovered: {DataDoughnut[2]}%
            </p>
            <Doughnut
              data={{
                labels: ["Cases", "Deaths", "Recovered"],
                datasets: [
                  {
                    lable: "#asdas",
                    data: DataDoughnut,
                    backgroundColor: ["#df1f1f", "#000000", "#33CCFF"],
                  },
                ],
              }}
              options={{
                maintainAspectRatiof: false,
              }}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
