// createLegend.js

export function createLegend({ legendContainer, selectedRange }) {
  const legendItems = [
    { label: 'Last', color: 'rgb(93, 67, 209)' },
    { label: selectedRange, color: 'rgba(93, 67, 209, 0.3)' },
    { label: 'Amount issued', customIcon: true },
  ];

  legendItems.forEach((item) => {
    const legendItem = legendContainer
      .append('div')
      .style('display', 'flex')
      .style('align-items', 'center')
      .style('gap', '5px');

    if (item.color) {
      legendItem
        .append('div')
        .style('width', '12px')
        .style('height', '12px')
        .style('background-color', item.color)
        .style('border-radius', '2px');
    } else if (item.customIcon) {
      const svgIcon = legendItem
        .append('svg')
        .attr('width', 14)
        .attr('height', 20)
        .attr('viewBox', '0 0 14 20')
        .attr('fill', 'none')
        .style('display', 'block');

      svgIcon
        .append('circle')
        .attr('cx', 7)
        .attr('cy', 6)
        .attr('r', 5)
        .attr('fill', 'rgba(102, 102, 102, 0.5)');

      svgIcon
        .append('circle')
        .attr('cx', 7)
        .attr('cy', 14)
        .attr('r', 5)
        .attr('fill', 'rgba(102, 102, 102, 0.8)');
    }

    legendItem
      .append('span')
      .style('color', '#666')
      .style('font-size', '14px')
      .text(item.label);
  });
}