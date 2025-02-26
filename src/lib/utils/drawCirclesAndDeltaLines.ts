import * as d3 from 'd3';

export function drawCirclesAndDeltaLines({
  plotArea,
  xScale,
  yScale,
  rScale,
  data,
  currentDataPoints,
}) {
  plotArea
    .selectAll('.dot-historical')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'dot-historical')
    .attr('cx', (d) => xScale(d.maturityDate))
    .attr('cy', (d) => yScale(d.yield))
    .attr('r', (d) => rScale(d.amountIssued))
    .style('fill', 'rgba(93, 67, 177, 0.3)')
    .style('stroke', 'rgba(93, 67, 177, 0.3)');

  plotArea
    .selectAll('.dot-current')
    .data(currentDataPoints)
    .enter()
    .append('circle')
    .attr('class', 'dot-current')
    .attr('cx', (d) => xScale(d.maturityDate))
    .attr('cy', (d) => yScale(d.yield))
    .attr('r', (d) => rScale(d.amountIssued))
    .style('fill', 'rgba(93, 67, 209, 0.5)')
    .style('stroke', 'rgb(93, 67, 209)');

  plotArea
    .selectAll('.delta-line')
    .data(data)
    .enter()
    .append('line')
    .attr('class', 'delta-line')
    .each(function (d) {
      const match = currentDataPoints.find(
        (c) => c.maturityDate.getTime() === d.maturityDate.getTime()
      );
      if (!match) return;

      const x1 = xScale(d.maturityDate);
      const y1 = yScale(d.yield);
      const r1 = rScale(d.amountIssued);

      const x2 = xScale(match.maturityDate);
      const y2 = yScale(match.yield);
      const r2 = rScale(match.amountIssued);

      const dx = x2 - x1;
      const dy = y2 - y1;
      const dist = Math.hypot(dx, dy);

      if (dist > r1 + r2) {
        const ux = dx / dist;
        const uy = dy / dist;
        const x1Edge = x1 + ux * r1;
        const y1Edge = y1 + uy * r1;
        const x2Edge = x2 - ux * r2;
        const y2Edge = y2 - uy * r2;

        d3.select(this)
          .attr('x1', x1Edge)
          .attr('y1', y1Edge)
          .attr('x2', x2Edge)
          .attr('y2', y2Edge)
          .attr('stroke', 'rgba(209, 213, 219, 0.45)')
          .attr('stroke-width', 2);
      }
    });
}