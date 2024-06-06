function cosineSimilarity(vectorA, vectorB) {
  if (vectorA.length !== vectorB.length) {
    throw new Error('向量长度不一致');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vectorA.length; i++) {
    dotProduct += vectorA[i] * vectorB[i];
    normA += vectorA[i] ** 2;
    normB += vectorB[i] ** 2;
  }

  normA = Math.sqrt(normA);
  normB = Math.sqrt(normB);

  return (dotProduct / (normA * normB)).toFixed(3);
}

module.exports = cosineSimilarity