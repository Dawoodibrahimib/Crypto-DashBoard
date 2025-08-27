import { useState, useEffect } from 'react'
import CoinCard from './components/CoinCard'
import './App.css'
import LimitSelector from './components/LimitSelector'
import FilterInput from './components/FilterInput'
import SortSelector from './components/SortSelector'
import { Route, Routes } from 'react-router'
import HomePage from './pages/Home'
import Header from './components/Header';
import AboutPage from './pages/AboutPage'
import NotFound from './pages/NotFound'
import CoinDetailPage from './pages/CoinDetailPage'

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");

  const API_URL = import.meta.env.VITE_COINS_API_URL;

  const filteredCoins = coins
    .filter(
      (coin) =>
        coin.name.toLowerCase().includes(filter.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLowerCase())
    )
    .slice() // 🔥 Important: make a shallow copy before sorting!
    .sort((a, b) => {
      switch (sortBy) {
        case 'market_cap_desc':
          return b.market_cap - a.market_cap;
        case 'price_desc':
          return b.current_price - a.current_price;
        case 'price_asc':
          return a.current_price - b.current_price;
        case 'change_desc':
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case 'change_asc':
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
        default:
          return 0;
      }
    });

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(`${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`);

        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        setCoins(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [limit]); // refetch if limit changes

  return (
    <>
      <Header />
      <Routes>

        <Route
          path='/'
          element={
            <HomePage
              coins={coins}
              filter={filter}
              setfilter={setFilter}
              limit={limit}
              setLimit={setLimit}
              sortBy={sortBy}
              setSortBy={setSortBy}
              loading={loading}
              error={error} />
          }
        ></Route>

        <Route path='/about' element={<AboutPage />}></Route>

        <Route path='*' element={<NotFound></NotFound>}></Route>
        <Route path='/coin/:id' element={<CoinDetailPage></CoinDetailPage>}></Route>
      </Routes>
    </>


  );
}

export default App;
