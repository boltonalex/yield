export function prepareData(filteredData, currentData) {
  const data = filteredData.map((d) => ({
    maturityDate: new Date(d.maturityDate),
    yield: d.value,
    amountIssued: d.amountIssued,
    description: d.description,
  }));

  const currentDataPoints = currentData.map((d) => ({
    maturityDate: new Date(d.maturityDate),
    yield: d.value,
    amountIssued: d.amountIssued,
    description: d.description,
  }));

  return { data, currentDataPoints };
}