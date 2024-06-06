function sortBySimilarNumber(data) {
  // 过滤出不是 NaN 的 similarNumber 值
  const filteredData = data.filter(obj => !isNaN(parseFloat(obj.similarNumber)));

  // 按 similarNumber 从大到小进行排序
  filteredData.sort((a, b) => parseFloat(b.similarNumber) - parseFloat(a.similarNumber));

  return filteredData;
}

module.exports = sortBySimilarNumber;