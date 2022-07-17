import axios from "axios";


export const getMapDataByCountryId = (countryId) =>
  import(
    `@highcharts/map-collection/countries/${countryId}/${countryId}-all.geo.json`
  );
export const getDataTableVaccine = () =>
  `https://disease.sh/v3/covid-19/vaccine/coverage/countries`;
export const getDataAllCountry = () =>
  axios.get("https://disease.sh/v3/covid-19/all");
export const getDataCountries = () =>
  axios.get("https://disease.sh/v3/covid-19/countries");
