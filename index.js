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
  res.sendStatus(parseFloat(price.price))
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
