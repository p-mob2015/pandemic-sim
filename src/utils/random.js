export const pickRandomElements = (arr, count) => {
  const shuffled = arr.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export const getRandomIndex = arrLength =>
  Math.floor(Math.random() * (arrLength - 1e-5))

export const probability = n => Math.random() < n
