function compareString(splitString, types1, types2) {
  const typesArray1 = types1.split(splitString).map(type => type.trim()); // 拆分第一个字符串并去除空格
  const typesArray2 = types2.split(splitString).map(type => type.trim()); // 拆分第二个字符串并去除空格

  let commonCount = 0;

  for (const type1 of typesArray1) {
    for (const type2 of typesArray2) {
      if (type1 === type2) {
        commonCount++;
      }
    }
  }

  return commonCount
}

module.exports = compareString