import * as d3 from 'd3';

export function setupTooltip({
  plotArea,
  tooltipContainer,
  rScale,
}) {
  plotArea
    .selectAll('.dot-historical')
    .on('mouseover', function (event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr('r', rScale(d.amountIssued) * 1.2)
        .style('fill', 'rgba(93, 67, 177, 0.5)')
        .style('stroke', 'rgba(93, 67, 177, 0.8)');

      const linkedPoint = plotArea
        .selectAll('.dot-current')
        .filter((c) => c.maturityDate.getTime() === d.maturityDate.getTime());

      linkedPoint
        .transition()
        .duration(200)
        .attr('r', (c) => rScale(c.amountIssued) * 1.2)
        .style('fill', 'rgba(93, 67, 209, 0.8)')
        .style('stroke', '#44386c');

      tooltipContainer
        .style('display', 'block')
        .html(`
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 12px; height: 12px; background-color: rgb(93, 67, 209); border-radius: 2px;"></div>
            <strong>${d.description}</strong>
          </div>
          <hr style="border: 0.5px solid #E5E7EB; margin: 6px 0;">
          <div><strong>Yield to Convention (%)</strong>: ${d.yield.toFixed(2)}%</div>
          <div><strong>Maturity date</strong>: ${d.maturityDate.toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        })}</div>
          <div><strong>Amount issued (mn)</strong>: ${d.amountIssued / 1000000} USD</div>
          <div><strong>Maturity type</strong>: Bullet</div>
        `);

      const offsetX = 10;
      const offsetY = 10;
      tooltipContainer
        .style('left', `${event.pageX + offsetX}px`)
        .style('top', `${event.pageY + offsetY}px`);
    })
    .on('mouseout', function (event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr('r', rScale(d.amountIssued))
        .style('fill', 'rgba(93, 67, 177, 0.3)')
        .style('stroke', 'rgba(93, 67, 177, 0.3)');

      const linkedPoint = plotArea
        .selectAll('.dot-current')
        .filter((c) => c.maturityDate.getTime() === d.maturityDate.getTime());

      linkedPoint
        .transition()
        .duration(200)
        .attr('r', (c) => rScale(c.amountIssued))
        .style('fill', 'rgba(93, 67, 209, 0.5)')
        .style('stroke', 'rgb(93, 67, 209)');

      tooltipContainer.style('display', 'none');
    });

  plotArea
    .selectAll('.dot-current')
    .on('mouseover', function (event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr('r', rScale(d.amountIssued) * 1.2)
        .style('fill', 'rgb(93, 67, 209)')
        .style('stroke', '#44386c');

      const linkedPoint = plotArea
        .selectAll('.dot-historical')
        .filter((c) => c.maturityDate.getTime() === d.maturityDate.getTime());

      linkedPoint
        .transition()
        .duration(200)
        .attr('r', (c) => rScale(c.amountIssued) * 1.2)
        .style('fill', 'rgba(93, 67, 177, 0.5)')
        .style('stroke', 'rgba(93, 67, 177, 0.8)');

      tooltipContainer
        .style('display', 'block')
        .html(`
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 12px; height: 12px; background-color: rgb(93, 67, 209); border-radius: 2px;"></div>
            <strong>${d.description}</strong>
          </div>
          <hr style="border: 0.5px solid #E5E7EB; margin: 6px 0;">
          <div><strong>Yield to Convention (%)</strong>: ${d.yield.toFixed(2)}%</div>
          <div><strong>Maturity date</strong>: ${d.maturityDate.toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        })}</div>
          <div><strong>Amount issued (mn)</strong>: ${d.amountIssued / 1000000} USD</div>
          <div><strong>Maturity type</strong>: Bullet</div>
        `);

      const offsetX = 10;
      const offsetY = 10;
      tooltipContainer
        .style('left', `${event.pageX + offsetX}px`)
        .style('top', `${event.pageY + offsetY}px`);
    })
    .on('mouseout', function (event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr('r', rScale(d.amountIssued))
        .style('fill', 'rgba(93, 67, 209, 0.5)')
        .style('stroke', 'rgb(93, 67, 209)');

      const linkedPoint = plotArea
        .selectAll('.dot-historical')
        .filter((c) => c.maturityDate.getTime() === d.maturityDate.getTime());

      linkedPoint
        .transition()
        .duration(200)
        .attr('r', (c) => rScale(c.amountIssued))
        .style('fill', 'rgba(93, 67, 177, 0.3)')
        .style('stroke', 'rgba(93, 67, 177, 0.3)');

      tooltipContainer.style('display', 'none');
    });
}