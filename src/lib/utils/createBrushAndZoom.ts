import * as d3 from 'd3';

export function createBrushAndZoom({
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
}) {
  zoombarSvg
    .selectAll('.zoom-dot')
    .data([...data, ...currentDataPoints])
    .enter()
    .append('circle')
    .attr('cx', (d) => xZoomScale(d.maturityDate))
    .attr('cy', height / 8)
    .attr('r', 3)
    .style('fill', 'rgba(93, 67, 209, 0.5)');

  const brush = d3
    .brushX()
    .handleSize(20)
    .extent([
      [0, 0],
      [width, height / 4],
    ])
    .on('brush end', ({ selection }) => {
      if (!selection) return;
      const oldXScale = xScale.copy();

      const [x0, x1] = selection.map(xZoomScale.invert);
      xScale.domain([x0, x1]);

      const t = svg.transition().duration(500);

      svg
        .selectAll('.dot-historical, .dot-current')
        .transition(t)
        .attr('cx', (d) => xScale(d.maturityDate));

      svg.selectAll('.delta-line').remove();

      const plotArea = svg.select('.plot-area');
      const deltaLines = plotArea
        .selectAll('.delta-line')
        .data(data)
        .enter()
        .append('line')
        .attr('class', 'delta-line')
        .attr('stroke', 'rgba(209, 213, 219, 0.45)')
        .attr('stroke-width', 2);

      function getEdgeCoords(dPoint, matchPoint, domainScale) {
        const x1 = domainScale(dPoint.maturityDate);
        const y1 = yScale(dPoint.yield);
        const r1 = rScale(dPoint.amountIssued);

        const x2 = domainScale(matchPoint.maturityDate);
        const y2 = yScale(matchPoint.yield);
        const r2 = rScale(matchPoint.amountIssued);

        const dx = x2 - x1;
        const dy = y2 - y1;
        const dist = Math.hypot(dx, dy);
        if (dist <= r1 + r2) return null;

        const ux = dx / dist;
        const uy = dy / dist;
        return {
          x1: x1 + ux * r1,
          y1: y1 + uy * r1,
          x2: x2 - ux * r2,
          y2: y2 - uy * r2,
        };
      }

      deltaLines.each(function (d) {
        const match = currentDataPoints.find(
          (c) => c.maturityDate.getTime() === d.maturityDate.getTime()
        );
        if (!match) return;

        const oldCoords = getEdgeCoords(d, match, oldXScale);
        if (!oldCoords) {
          d3.select(this).style('opacity', 0);
        } else {
          d3.select(this)
            .attr('x1', oldCoords.x1)
            .attr('y1', oldCoords.y1)
            .attr('x2', oldCoords.x2)
            .attr('y2', oldCoords.y2)
            .style('opacity', 1);
        }
      });

      deltaLines
        .transition(t)
        .attrTween('x1', function (d) {
          const match = currentDataPoints.find(
            (c) => c.maturityDate.getTime() === d.maturityDate.getTime()
          );
          if (!match) return () => d3.select(this).attr('x1');

          const newCoords = getEdgeCoords(d, match, xScale);
          if (!newCoords) {
            d3.select(this).style('opacity', 0);
            return () => d3.select(this).attr('x1');
          }
          const oldX1 = +d3.select(this).attr('x1');
          const i = d3.interpolateNumber(oldX1, newCoords.x1);
          return (t) => i(t);
        })
        .attrTween('y1', function (d) {
          const match = currentDataPoints.find(
            (c) => c.maturityDate.getTime() === d.maturityDate.getTime()
          );
          if (!match) return () => d3.select(this).attr('y1');

          const newCoords = getEdgeCoords(d, match, xScale);
          if (!newCoords) return () => d3.select(this).attr('y1');

          const oldY1 = +d3.select(this).attr('y1');
          const i = d3.interpolateNumber(oldY1, newCoords.y1);
          return (t) => i(t);
        })
        .attrTween('x2', function (d) {
          const match = currentDataPoints.find(
            (c) => c.maturityDate.getTime() === d.maturityDate.getTime()
          );
          if (!match) return () => d3.select(this).attr('x2');

          const newCoords = getEdgeCoords(d, match, xScale);
          if (!newCoords) return () => d3.select(this).attr('x2');

          const oldX2 = +d3.select(this).attr('x2');
          const i = d3.interpolateNumber(oldX2, newCoords.x2);
          return (t) => i(t);
        })
        .attrTween('y2', function (d) {
          const match = currentDataPoints.find(
            (c) => c.maturityDate.getTime() === d.maturityDate.getTime()
          );
          if (!match) return () => d3.select(this).attr('y2');

          const newCoords = getEdgeCoords(d, match, xScale);
          if (!newCoords) return () => d3.select(this).attr('y2');

          const oldY2 = +d3.select(this).attr('y2');
          const i = d3.interpolateNumber(oldY2, newCoords.y2);
          return (t) => i(t);
        });

      svg.select('.x-axis').transition(t).call(d3.axisBottom(xScale));
    });

  const brushGroup = zoombarSvg.append('g').attr('class', 'brush').call(brush);

  brushGroup
    .selectAll('.handle')
    .style('fill', 'rgba(219, 219, 219, 0.5')
    .style('rx', '10')
    .style('ry', '10');

  brushGroup
    .selectAll('.selection')
    .style('stroke', '#ddd')
    .style('stroke-width', 2)
    .style('fill', '#ccc');

  brushGroup.call(brush.move, [width * 0.2, width * 0.8]);
}