export const livestockBatches = [
  { id: "B-1042", species: "Ocellaris Clownfish", scientific: "Amphiprion ocellaris", supplier: "Quality Marine", tank: "SW-Q2", received: 24, available: 21, doa: 1, mortality: 2, landedCost: 18.42, retail: 39.99, status: "Available" },
  { id: "B-1041", species: "Blue Green Chromis", scientific: "Chromis viridis", supplier: "Sea Dwelling Creatures", tank: "SW-12", received: 36, available: 28, doa: 3, mortality: 5, landedCost: 9.17, retail: 21.99, status: "Available" },
  { id: "B-1039", species: "Yellow Tang", scientific: "Zebrasoma flavescens", supplier: "Biota", tank: "SW-Q1", received: 8, available: 8, doa: 0, mortality: 0, landedCost: 89.5, retail: 179.99, status: "Quarantine" },
  { id: "B-1037", species: "Red Cherry Shrimp", scientific: "Neocaridina davidi", supplier: "Aquatic Arts", tank: "FW-18", received: 100, available: 82, doa: 8, mortality: 10, landedCost: 1.61, retail: 4.99, status: "Available" },
];

export const storeTanks = [
  { name: "SW-Q1", type: "Saltwater quarantine", volume: 120, livestock: 8, status: "Copper treatment", alert: true },
  { name: "SW-Q2", type: "Saltwater quarantine", volume: 120, livestock: 21, status: "Observation", alert: false },
  { name: "SW-12", type: "Saltwater sales", volume: 80, livestock: 28, status: "Normal", alert: false },
  { name: "FW-18", type: "Freshwater invert", volume: 40, livestock: 82, status: "Normal", alert: false },
];

export const dashboardMetrics = [
  ["Monthly revenue", "$84,260", "+11.4% vs last month"],
  ["Gross profit", "$35,840", "42.5% estimated margin"],
  ["Inventory value", "$96,410", "$31,280 livestock"],
  ["Average ticket", "$86.20", "+$7.40 month over month"],
  ["Low-stock items", "17", "6 require immediate order"],
  ["Services overdue", "21", "Based on customer cadence"],
];
