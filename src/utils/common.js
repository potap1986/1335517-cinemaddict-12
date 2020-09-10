export const getRandomBool = (chance = 0.5) => Math.random() < chance;

export const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

export const getRandomNumber = (min = 0, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomSorting = () => Math.random() - 0.5;

export const getRandomSet = (items, num = 3) =>
  [...new Set(items.sort(getRandomSorting).slice(0, num))];

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);
