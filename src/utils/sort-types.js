function sortTypes(movies) {
  const typesCount = {};

  for (const movie of movies) {
    const types = movie.types.split(',');

    for (const item of types) {
      const typeItem = item.trim();

      if (typesCount[typeItem]) {
        typesCount[typeItem]++;
      } else {
        typesCount[typeItem] = 1;
      }
    }
  }

  const sortedTypes = Object.entries(typesCount)
    .sort((a, b) => b[1] - a[1])
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

  return sortedTypes;
}

module.exports = sortTypes