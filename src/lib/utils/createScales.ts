import * as d3 from 'd3';

export function createScales(data, currentDataPoints, width, height) {
  const xScale = d3
    .scaleTime()
    .domain(d3.extent([...data, ...currentDataPoints], (d) => d.maturityDate))
    .range([0, width]);

  const yScale = d3
    .scaleLinear()
    .domain([
      d3.min([...data, ...currentDataPoints], (d) => d.yield) - 0.5,
      d3.max([...data, ...currentDataPoints], (d) => d.yield) + 0.5,
    ])
    .range([height, 0]);

  const rScale = d3
    .scaleSqrt()
    .domain([
      d3.min([...data, ...currentDataPoints], (d) => d.amountIssued),
      d3.max([...data, ...currentDataPoints], (d) => d.amountIssued),
    ])
    .range([5, 15]);

  const xZoomScale = d3
    .scaleTime()
    .domain(xScale.domain())
    .range([0, width]);

  return { xScale, yScale, rScale, xZoomScale };
}