import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getChartData } from "./dataStore";
import "./App.css";

export default function Home() {
  const navigate = useNavigate();
  const [items, setItems] = useState(() => getChartData());

  useEffect(() => {
    setItems(getChartData());
  }, []);

  return (
    <div className="home-container">
      <h1>Career/Education Paths</h1>
      <ul className="option-list">
        {items.map((item) => (
          <li
            key={item.id}
            className="option-item"
            onClick={() => navigate(`/chart/${item.id}`)}
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter') navigate(`/chart/${item.id}`); }}
          >
            {item.label}
          </li>
        ))}
      </ul>
      <p className="chart-desc">Click an option to see details</p>
    </div>
  );
}
