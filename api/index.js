const express = require("express");
const app = express();
let price;
app.get("/", async (req, res) => {
  const apiUrl = "https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT";
  try {
    const ressult = await fetch(apiUrl);
    if (ressult.status >= 400) {
      throw new Error("Bad response from server");
    }
    price = await ressult.json();
  } catch (err) {
    console.error("Unable to connect to Binance API", err);
  }
  res.sendStatus(parseFloat(price.price));
});

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
