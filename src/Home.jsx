import { useNavigate } from "react-router-dom";
import { getChartData } from "./dataStore";
import "./App.css";

export default function Home() {
  const navigate = useNavigate();
  const items = getChartData();
  const totalSubCourses = items.reduce(
    (sum, item) => sum + (item.subItems?.length || 0),
    0
  );
  const streamCount = items.filter((item) => item.label.includes("12th")).length;

  return (
    <main className="home-container">
      <header className="home-header">
        <div>
          <span className="eyebrow">Vidyarathi Mitra Career Map</span>
          <h1>Choose your education path</h1>
          <p>
            Explore streams, degrees, entrance exams, colleges, and career options in one
            simple guide.
          </p>
        </div>
        <div className="home-stats" aria-label="Career map summary">
          <div>
            <strong>{items.length}</strong>
            <span>Main paths</span>
          </div>
          <div>
            <strong>{totalSubCourses}</strong>
            <span>Course options</span>
          </div>
          <div>
            <strong>{streamCount}</strong>
            <span>12th streams</span>
          </div>
        </div>
      </header>
      <ul className="option-list">
        {items.map((item, index) => (
          <li
            key={item.id}
            className="option-item"
            onClick={() => navigate(`/chart/${item.id}`)}
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter') navigate(`/chart/${item.id}`); }}
          >
            <div className="option-topline">
              <b>{String(index + 1).padStart(2, "0")}</b>
              {item.subItems?.length ? <em>{item.subItems.length} options</em> : null}
            </div>
            <span>{item.label}</span>
            <small>{item.description}</small>
          </li>
        ))}
      </ul>
    </main>
  );
}
