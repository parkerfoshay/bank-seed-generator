const axios = require("axios");

async function fetchAPI(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

function accountId() {
    let min = 100000000
    let max = 999999999
    let number = Math.floor(Math.random() * (max - min) + min);
    
    return number
  }

function rndAmount() {
    let number = Math.random() * 5000;
    return parseFloat(number.toFixed(2));
  }

  function typeOfAccount() {
      let type = ["checking", "savings"]
      let index = Math.floor(Math.random() * 2);

      return type[index]
  }

  module.exports = {
    fetchAPI,
    accountId,
    rndAmount,
    typeOfAccount,
  };