export const getRandomNumber = (max = 999999, min = 100000) => {
  return Math.floor(Math.random() * (max - min) + min)
}
