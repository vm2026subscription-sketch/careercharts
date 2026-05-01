import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChartData } from "./dataStore";
import "./App.css";

const getSubItemMeta = (subItem, parentTitle) => {
  if (typeof subItem === "string") {
    return {
      title: subItem,
      description: `${subItem} is a sub course under ${parentTitle}.`
    };
  }

  if (subItem && typeof subItem === "object") {
    return {
      title: subItem.title || subItem.label || "Sub Course",
      description:
        subItem.description ||
        `${subItem.title || subItem.label || "This"} is a sub course under ${parentTitle}.`,
      imageUrl: subItem.imageUrl || ""
    };
  }

  return {
    title: "Sub Course",
    description: `This is a sub course under ${parentTitle}.`
  };
};

export default function SubDetail() {
  const { id, subIndex } = useParams();
  const [data, setData] = useState(() => getChartData());

  useEffect(() => {
    setData(getChartData());
  }, []);

  const point = data.find((item) => item.id === id);
  const parsedIndex = Number(subIndex);
  const subItem =
    point && Number.isInteger(parsedIndex) && parsedIndex >= 0
      ? point.subItems?.[parsedIndex]
      : undefined;

  if (!point || subItem === undefined) {
    return <div className="not-found">Point Not Found</div>;
  }

  const meta = getSubItemMeta(subItem, point.title);

  return (
    <div className="detail-shell">
      <article className="detail-card">
        <header className="detail-hero">
          <span className="detail-pill">Sub Course</span>
          <h1 className="detail-title">{meta.title}</h1>
          <p className="detail-subtitle">Parent Path: {point.title}</p>
        </header>
        <section className="detail-body">
          <h2 className="detail-section-title">Overview</h2>
          <p className="detail-text">{meta.description}</p>
          {meta.imageUrl ? (
            <img className="detail-image" src={meta.imageUrl} alt={meta.title} />
          ) : null}
        </section>
      </article>
    </div>
  );
}
