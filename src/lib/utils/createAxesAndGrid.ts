import * as d3 from 'd3';

export function createAxesAndGrid({ svg, xScale, yScale, width, height, margin }) {
  const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat('%Y'));
  svg
    .append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis);

  const yAxis = d3.axisLeft(yScale).ticks(5);
  svg.append('g').call(yAxis);

  const gridGroup = svg
    .select('.plot-area')
    .append('g')
    .attr('class', 'grid-group');

  gridGroup
    .selectAll('.grid-line')
    .data(yScale.ticks(5))
    .enter()
    .append('line')
    .attr('class', 'grid-line')
    .attr('x1', 0)
    .attr('x2', width)
    .attr('y1', (d) => yScale(d))
    .attr('y2', (d) => yScale(d))
    .attr('stroke', 'rgb(237, 237, 237)')
    .attr('stroke-width', 1);

  svg
    .append('text')
    .attr('class', 'x-axis-label')
    .attr('x', width / 2)
    .attr('y', height + margin.bottom - 10)
    .attr('text-anchor', 'middle')
    .attr('fill', 'black')
    .attr('font-size', '14px')
    .text('Maturity Date');

  svg
    .append('text')
    .attr('class', 'y-axis-label')
    .attr('transform', 'rotate(-90)')
    .attr('x', -height / 2)
    .attr('y', -margin.left + 15)
    .attr('text-anchor', 'middle')
    .attr('fill', 'black')
    .attr('font-size', '14px')
    .text('Yield to Convention (%)');
}