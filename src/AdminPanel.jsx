import React, { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { getChartData, resetChartData, saveChartData } from "./dataStore";
import "./App.css";

const emptyForm = {
  id: "",
  label: "",
  title: "",
  description: "",
  imageUrl: "",
  subItems: ""
};

export default function AdminPanel() {
  const [items, setItems] = useState(() => getChartData());
  const [form, setForm] = useState(emptyForm);
  const [isEditing, setIsEditing] = useState(false);

  const chartSummary = useMemo(
    () =>
      items.map((item) => ({
        label: item.label,
        length: item.description ? item.description.length : 0
      })),
    [items]
  );

  const updateItems = (next) => {
    setItems(next);
    saveChartData(next);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setForm({
      id: item.id,
      label: item.label,
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl || "",
      subItems: item.subItems ? item.subItems.join(", ") : ""
    });
  };

  const handleDelete = (id) => {
    updateItems(items.filter((item) => item.id !== id));
    if (form.id === id) {
      setForm(emptyForm);
      setIsEditing(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.label.trim() || !form.title.trim() || !form.description.trim()) {
      return;
    }

    if (isEditing) {
      const next = items.map((item) =>
        item.id === form.id
          ? {
              ...item,
              label: form.label.trim(),
              title: form.title.trim(),
              description: form.description.trim(),
              imageUrl: form.imageUrl.trim(),
              subItems: form.subItems
                ? form.subItems
                    .split(",")
                    .map((entry) => entry.trim())
                    .filter(Boolean)
                : []
            }
          : item
      );
      updateItems(next);
    } else {
      const next = [
        ...items,
        {
          id: Date.now().toString(),
          label: form.label.trim(),
          title: form.title.trim(),
          description: form.description.trim(),
          imageUrl: form.imageUrl.trim(),
          subItems: form.subItems
            ? form.subItems
                .split(",")
                .map((entry) => entry.trim())
                .filter(Boolean)
            : []
        }
      ];
      updateItems(next);
    }

    setForm(emptyForm);
    setIsEditing(false);
  };

  const handleReset = () => {
    updateItems(resetChartData());
    setForm(emptyForm);
    setIsEditing(false);
  };

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div>
          <h1>Admin Panel</h1>
          <p>Manage career/education paths, images, and descriptions.</p>
        </div>
        <button className="admin-btn admin-btn--ghost" onClick={handleReset}>
          Reset to defaults
        </button>
      </header>

      <section className="admin-grid">
        <div className="admin-card">
          <h2>Overview</h2>
          <div className="admin-metrics">
            <div className="admin-metric">
              <span>Total Items</span>
              <strong>{items.length}</strong>
            </div>
            <div className="admin-metric">
              <span>Avg. Description Length</span>
              <strong>
                {items.length
                  ? Math.round(
                      items.reduce(
                        (sum, item) => sum + (item.description || "").length,
                        0
                      ) / items.length
                    )
                  : 0}
              </strong>
            </div>
          </div>
          <div className="admin-chart">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartSummary} margin={{ top: 10, right: 12, left: 0, bottom: 10 }}>
                <XAxis dataKey="label" tick={{ fontSize: 10 }} interval={0} angle={-35} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="length" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="admin-card">
          <h2>{isEditing ? "Edit Entry" : "Add New Entry"}</h2>
          <form className="admin-form" onSubmit={handleSubmit}>
            <label>
              Label
              <input name="label" value={form.label} onChange={handleChange} />
            </label>
            <label>
              Title
              <input name="title" value={form.title} onChange={handleChange} />
            </label>
            <label>
              Description
              <textarea
                name="description"
                rows={4}
                value={form.description}
                onChange={handleChange}
              />
            </label>
            <label>
              Image URL (optional)
              <input
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="https://"
              />
            </label>
            <label>
              Sub courses (comma separated)
              <input
                name="subItems"
                value={form.subItems}
                onChange={handleChange}
                placeholder="CA, CS, CMA"
              />
            </label>
            <div className="admin-actions">
              <button className="admin-btn admin-btn--primary" type="submit">
                {isEditing ? "Save Changes" : "Add Entry"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  className="admin-btn admin-btn--ghost"
                  onClick={() => {
                    setForm(emptyForm);
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

      <section className="admin-list">
        <h2>Entries</h2>
        <div className="admin-list-grid">
          {items.map((item) => (
            <article key={item.id} className="admin-item">
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                {item.subItems && item.subItems.length > 0 ? (
                  <ul className="admin-subitems">
                    {item.subItems.map((sub, index) => (
                      <li key={`${sub}-${index}`}>{sub}</li>
                    ))}
                  </ul>
                ) : null}
                {item.imageUrl && (
                  <img className="admin-image" src={item.imageUrl} alt={item.title} />
                )}
              </div>
              <div className="admin-item-actions">
                <button className="admin-btn admin-btn--primary" onClick={() => handleEdit(item)}>
                  Edit
                </button>
                <button className="admin-btn admin-btn--danger" onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
