import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Coin from "./Coin";
import searchimg from "./searchimg.png";
import FadeIn from "react-fade-in";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const current = new Date();
  const date = `${
    current.getMonth() + 1
  }/${current.getDate()}/${current.getFullYear()}`;

  return (
    <FadeIn transitionDuration="1500">
      <div className="coin-app">
        <div className="coin-search">
          <img className="glass" src={searchimg} alt="" />
          <h1 className="coin-text">Search a Crypto Currency</h1>
          <h1>{date}</h1>
          <form>
            <input
              type="text"
              placeholder="search"
              className="coin-input"
              onChange={handleChange}
            />
          </form>
        </div>
        <div className="cube">
          {filteredCoins.map((coin) => {
            return (
              <Coin
                key={coin}
                name={coin.name}
                image={coin.image}
                symbol={coin.symbol}
                marketcap={coin.market_cap}
                price={coin.current_price}
                priceChange={coin.price_change_percentage_24h}
                volume={coin.total_volume}
              />
            );
          })}
        </div>
      </div>
    </FadeIn>
  );
}

export default App;
