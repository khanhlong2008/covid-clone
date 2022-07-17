
import React from "react";

import LineChart from "../Charts/LineChart";
import "../../App.css";
// import Loading from "../Loading";


export default function Summary({ 
  casesType, 
  country, 
  countryInfo, 

  countries,
  onCountryChange,
  value,
}) {

  return (
    <>
        <LineChart
          casesType={casesType}
          country={country}
          countryInfo={countryInfo}

          countries={countries}
          onCountryChange={onCountryChange}
          value={value}
        />
    </>
  );
}
