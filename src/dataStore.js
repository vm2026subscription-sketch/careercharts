import chartData from "./chartData.json";

const STORAGE_KEY = "chartData";

export const getChartData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return chartData;
    }
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : chartData;
  } catch {
    return chartData;
  }
};

export const saveChartData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getDefaultChartData = () => chartData;

export const resetChartData = () => {
  localStorage.removeItem(STORAGE_KEY);
  return chartData;
};
