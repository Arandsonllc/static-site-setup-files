import { country } from "./geo-country.js";

const reDirect = async () => {
  const countryValue = await country;

  if (countryValue === "US") {
    window.location.href = "/lang/en";
  } else {
    window.location.href = "/lang/es";
  }
};

reDirect();
