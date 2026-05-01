
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ChartDetail from "./ChartDetail";
import SubDetail from "./SubDetail";
import AdminPanel from "./AdminPanel";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-frame">
        <header className="topbar">
          <Link className="brand-lockup" to="/">
            <span className="brand-mark">VM</span>
            <span>
              <strong>Vidyarthi Mitra</strong>
              <small>Career Guidance Map</small>
            </span>
          </Link>
          <nav className="topnav" aria-label="Main navigation">
            <Link to="/">Paths</Link>
            <Link to="/admin">Admin</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chart/:id" element={<ChartDetail />} />
          <Route path="/chart/:id/sub/:subIndex" element={<SubDetail />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<div style={{padding:'2rem',textAlign:'center'}}>Page Not Found</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
