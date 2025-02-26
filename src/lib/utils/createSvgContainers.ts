import * as d3 from 'd3';

export function createSvgContainers(
  width,
  height,
  margin,
  zoombarHeight,
  zoombarMargin
) {
  d3.select('#chart').selectAll('*').remove();
  d3.select('#zoombar').selectAll('*').remove();

  const mainSvg = d3
    .select('#chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

  const svg = mainSvg
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const defs = svg.append('defs');
  defs
    .append('clipPath')
    .attr('id', 'chart-clip')
    .append('rect')
    .attr('width', width)
    .attr('height', height);

  const plotArea = svg
    .append('g')
    .attr('class', 'plot-area')
    .attr('clip-path', 'url(#chart-clip)');

  const zoombarSvg = d3
    .select('#zoombar')
    .append('svg')
    .style('stroke', '#ddd')
    .style('stroke-width', 2)
    .attr('width', width + margin.left + margin.right)
    .attr('height', zoombarHeight + zoombarMargin.top + zoombarMargin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${zoombarMargin.top})`);

  let tooltipContainer = d3.select('#chart-tooltip');
  if (tooltipContainer.empty()) {
    tooltipContainer = d3
      .select('body')
      .append('div')
      .attr('id', 'chart-tooltip')
      .style('position', 'absolute')
      .style('background', '#fff')
      .style('border', '1px solid #E5E7EB')
      .style('border-radius', '8px')
      .style('box-shadow', '0px 4px 10px rgba(0, 0, 0, 0.1)')
      .style('padding', '10px')
      .style('font-size', '14px')
      .style('color', '#333')
      .style('display', 'none')
      .style('pointer-events', 'none')
      .style('max-width', '240px');
  }

  let legendContainer = d3.select('#chart-legend');
  if (legendContainer.empty()) {
    legendContainer = d3
      .select('#chart-container')
      .append('div')
      .attr('id', 'chart-legend')
      .style('display', 'flex')
      .style('gap', '12px')
      .style('align-items', 'center')
      .style('margin-top', '10px');
  } else {
    legendContainer.selectAll('*').remove();
  }

  return {
    svg,
    plotArea,
    zoombarSvg,
    tooltipContainer,
    legendContainer,
  };
}