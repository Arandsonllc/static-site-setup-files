"use strict";

const url = "https://ipinfo.io?token=ffa4c28442d873";

const whereAmI = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.country;
  } catch (error) {
    console.error(error);
  }
};

const country = whereAmI();

export { country };
