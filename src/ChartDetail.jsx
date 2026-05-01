import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getChartData } from "./dataStore";
import "./App.css";

export default function ChartDetail() {
  const { id } = useParams();
  const data = getChartData();

  const point = data.find((item) => item.id === id);

  return (
    <div className="detail-shell">
      {point ? (
        <article className="detail-card">
          <header className="detail-hero">
            <span className="detail-pill">Career Path</span>
            <h1 className="detail-title">{point.title}</h1>
            {point.subtitle ? (
              <p className="detail-subtitle">{point.subtitle}</p>
            ) : (
              <p className="detail-subtitle">Focused guidance for your next step</p>
            )}
            <div className="detail-metrics">
              <div>
                <strong>{point.subItems?.length || 0}</strong>
                <span>Options</span>
              </div>
              <div>
                <strong>{point.sections?.entranceExams?.length || 0}</strong>
                <span>Exams</span>
              </div>
              <div>
                <strong>{point.sections?.topColleges?.length || 0}</strong>
                <span>Institutes</span>
              </div>
            </div>
          </header>
          <section className="detail-body">
            {point.sections ? (
              // Rich sections format (like 10th SSC)
              <div className="detail-sections">
                {/* About This Career */}
                <div className="detail-section-box">
                  <h2 className="detail-section-heading">About This Career</h2>
                  <p className="detail-section-text">{point.sections.about}</p>
                </div>

                {/* Eligibility & Salary Row */}
                <div className="detail-section-row">
                  <div className="detail-section-box">
                    <h3 className="detail-section-label">Eligibility</h3>
                    <p className="detail-section-value">{point.sections.eligibility}</p>
                  </div>
                  <div className="detail-section-box">
                    <h3 className="detail-section-label">Avg Salary</h3>
                    <p className="detail-section-value">{point.sections.avgSalary}</p>
                  </div>
                </div>

                {/* Entrance Exams */}
                {point.sections.entranceExams && (
                  <div className="detail-section-box">
                    <h2 className="detail-section-heading">Entrance Exams</h2>
                    <ul className="detail-section-list">
                      {point.sections.entranceExams.map((exam, idx) => (
                        <li key={idx}>{exam}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Top Colleges */}
                {point.sections.topColleges && (
                  <div className="detail-section-box">
                    <h2 className="detail-section-heading">Top Colleges / Institutions</h2>
                    <ul className="detail-section-list">
                      {point.sections.topColleges.map((college, idx) => (
                        <li key={idx}>{college}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Career Scope */}
                {point.sections.careerScope && (
                  <div className="detail-section-box">
                    <h2 className="detail-section-heading">Career Scope & Opportunities</h2>
                    <p className="detail-section-text">{point.sections.careerScope}</p>
                  </div>
                )}

                {/* Key Skills */}
                {point.sections.keySkills && (
                  <div className="detail-section-box">
                    <h2 className="detail-section-heading">Key Skills Required</h2>
                    <p className="detail-section-text">{point.sections.keySkills}</p>
                  </div>
                )}
              </div>
            ) : (
              // Simple format (fallback for other entries)
              <>
                <h2 className="detail-section-title">Overview</h2>
                <p className="detail-text">{point.description}</p>
              </>
            )}

            {point.subItems && point.subItems.length > 0 ? (
              <div className="detail-subitems">
                <h3 className="detail-section-title">Sub Courses</h3>
                <ul className="detail-list">
                  {point.subItems.map((item, index) => {
                    const subTitle =
                      typeof item === "string"
                        ? item
                        : item.title || item.label || `Sub Course ${index + 1}`;

                    return (
                    <li key={`${subTitle}-${index}`}>
                      <Link className="detail-sub-link" to={`/chart/${point.id}/sub/${index}`}>
                        <b>{String(index + 1).padStart(2, "0")}</b>
                        <span>{subTitle}</span>
                        <small>View course overview</small>
                      </Link>
                    </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
            {point.imageUrl ? (
              <img className="detail-image" src={point.imageUrl} alt={point.title} />
            ) : null}
          </section>
        </article>
      ) : (
        <div className="not-found">Point Not Found</div>
      )}
    </div>
  );
}
