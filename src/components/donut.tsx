'use client';

import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface DonutChartProps {
  data: { category: string; value: number }[]; // Data structure
  width?: number;
  height?: number;
  innerRadius?: number; // Inner radius of the donut
  outerRadius?: number; // Outer radius of the donut
}

export const DonutChart = ({
  data,
  width = 400,
  height = 400,
  innerRadius = 75,
  outerRadius = 100,
}: DonutChartProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous content

    const colorScale = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.category))
      .range(["#69b3a2", "#404080", "#e41a1c", "#ffa07a"]); // Define custom colors

    const total = d3.sum(data, (d) => d.value);

    const pie = d3.pie<{ category: string; value: number }>().value((d) => d.value);

    const arc = d3
      .arc<d3.PieArcDatum<{ category: string; value: number }>>()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const arcs = pie(data);

    // Draw donut chart
    const chartGroup = svg
      .attr("width", width)
      .attr("height", height + 100) // Extra space for the legend
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    chartGroup
      .selectAll("path")
      .data(arcs)
      .join("path")
      .attr("d", arc)
      .attr("fill", (d) => colorScale(d.data.category) as string)
      .attr("stroke", "#fff")
      .attr("stroke-width", 2);

    // Add text to the center of the donut
    chartGroup
      .append("text")
      .attr("text-anchor", "middle")
      .attr("font-size", 24)
      .attr("dy", "-0.5em")
      .text(total);

    chartGroup
      .append("text")
      .attr("text-anchor", "middle")
      .attr("font-size", 12)
      .attr("dy", "1em")
      .text("Publications");

    // Add legend
    const legendGroup = svg
      .append("g")
      .attr("transform", `translate(0, ${height})`);

    const legendPerRow = Math.floor(width / 120); // Number of legend items per row
    const legendSpacingX = 120; // Horizontal spacing between legend items
    const legendSpacingY = 20; // Vertical spacing between rows

    const legend = legendGroup
      .selectAll(".legend")
      .data(data)
      .join("g")
      .attr("class", "legend")
      .attr(
        "transform",
        (d, i) =>
          `translate(${(i % legendPerRow) * legendSpacingX}, ${
            Math.floor(i / legendPerRow) * legendSpacingY
          })`
      );

    legend
      .append("rect")
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", (d) => colorScale(d.category) as string);

    legend
      .append("text")
      .attr("x", 20)
      .attr("y", 12)
      .text((d) => `${d.category}: ${d.value}`)
      .attr("font-size", 12)
      .attr("text-anchor", "start");
  }, [data, width, height, innerRadius, outerRadius]);

  return <svg ref={svgRef}></svg>;
};
