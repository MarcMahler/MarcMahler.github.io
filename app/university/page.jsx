"use client";
import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import annotationPlugin from "chartjs-plugin-annotation";
import Nav from "../Components/Nav/nav";
import "./university.css";
import { useState } from "react";
import SelectionBar from "../Components/SelectionBar/selectionBar";

// Plugin registrieren
Chart.register(annotationPlugin);

export default function GradeDistributionLine() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [selectedSemester, setSelectedSemester] = useState("FS25");

  const studentGrades = {
    FS25: [5.25, 5.25, 5.75, 4.75, 5.5],
    HS24: [5.25, 4.25, 6, 5.75, 5.5],
  };

  const generateDistribution = (grades, step = 0.25) => {
    const labels = [];
    for (let g = 1; g <= 6; g += step) {
      labels.push(parseFloat(g.toFixed(2)));
    }
    const counts = labels.map(
      (l) => grades.filter((x) => x === l).length
    );
    return { labels, counts };
  };

  const grades = studentGrades[selectedSemester];
  const average = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const { labels, counts } = generateDistribution(grades);

    // Datenpunkte für X-Achse numerisch
    const dataPoints = labels.map((label, index) => ({
      x: label,
      y: counts[index],
    }));

    // Alte Chart zerstören
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Anzahl Schüler",
            data: dataPoints,
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            fill: true,
            tension: 0.1,
            pointRadius: 3,
          },
          {
            label: `Durchschnitt Ø ${average.toFixed(2)}`, // erscheint in Legende
            data: [{ x: average, y: 0 }, { x: average, y: Math.max(...counts) + 1 }],
            borderColor: "red",
            borderWidth: 2,
            borderDash: [5, 5],
            fill: false,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Notenverteilung (Viertelnoten) mit Durchschnitt",
            font: { size: 20 },
          },
          legend: {
            display: true,
            position: "top",
          },
        },
        scales: {
          x: {
            type: "linear",
            title: { display: true, text: "Note" },
            min: 3,
            max: 6,
            ticks: { stepSize: 0.25 },
          },
          y: {
            title: { display: true, text: "Anzahl" },
            beginAtZero: true,
          },
        },
      },
    });
  }, [selectedSemester]);

  return (
    <div>
      <Nav />
      <div className="university-page">
        <SelectionBar
          options={["FS25", "HS24"]}
          selected={selectedSemester}
          setSelected={setSelectedSemester}
        />
        <div className="chart">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
}
