// chart.ts
import * as d3 from 'd3';
import { prepareData } from './prepareData';
import { createSvgContainers } from './createSvgContainers';
import { createScales } from './createScales';
import { createAxesAndGrid } from './createAxesAndGrid';
import { createBrushAndZoom } from './createBrushAndZoom';
import { drawCirclesAndDeltaLines } from './drawCirclesAndDeltaLines';
import { setupTooltip } from './setupTooltip';
import { createLegend } from './createLegend';

export interface BondData {
  maturityDate: Date;
  yield: number;
  amountIssued: number;
  description: string;
}

/**
 * Draws a D3 chart given historical and current data arrays.
 * @param filteredData - Array of historical data points.
 * @param currentData - Array of current data points.
 * @param selectedRange - Label for the second dataset (e.g., a date range).
 */
export function drawChart(
  filteredData: BondData[],
  currentData: BondData[],
  selectedRange: string
): void {
  if (!filteredData || filteredData.length === 0) return;

  const { data, currentDataPoints } = prepareData(filteredData, currentData);

  const margin = { top: 30, right: 50, bottom: 50, left: 50 };
  const width = 800 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const zoombarHeight = 50;
  const zoombarMargin = { top: 10, right: 50, bottom: 45, left: 50 };

  const {
    svg,
    plotArea,
    zoombarSvg,
    tooltipContainer,
    legendContainer,
  } = createSvgContainers(width, height, margin, zoombarHeight, zoombarMargin);

  const { xScale, yScale, rScale, xZoomScale } = createScales(
    data,
    currentDataPoints,
    width,
    height
  );

  createAxesAndGrid({
    svg,
    xScale,
    yScale,
    width,
    height,
    margin,
  });

  createBrushAndZoom({
    svg,
    zoombarSvg,
    xScale,
    xZoomScale,
    yScale,
    rScale,
    data,
    currentDataPoints,
    width,
    height,
  });

  drawCirclesAndDeltaLines({
    plotArea,
    xScale,
    yScale,
    rScale,
    data,
    currentDataPoints,
  });

  setupTooltip({
    plotArea,
    tooltipContainer,
    xScale,
    yScale,
    rScale,
    data,
    currentDataPoints,
  });

  createLegend({
    legendContainer,
    selectedRange,
  });
}