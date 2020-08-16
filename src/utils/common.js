export const getRandomBool = (chance = 0.5) => Math.random() < chance;

export const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

export const getRandomNumber = (min = 0, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomSorting = () => Math.random() - 0.5;

export const getRandomSet = (items, num = 3) =>
  [...new Set(items.sort(getRandomSorting).slice(0, num))];
