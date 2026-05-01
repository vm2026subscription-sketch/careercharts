
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ChartDetail from "./ChartDetail";
import SubDetail from "./SubDetail";
import AdminPanel from "./AdminPanel";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chart/:id" element={<ChartDetail />} />
        <Route path="/chart/:id/sub/:subIndex" element={<SubDetail />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<div style={{padding:'2rem',textAlign:'center'}}>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
