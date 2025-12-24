import AsyncStorage from "@react-native-async-storage/async-storage";

export const eggs = [
  {
    id: 1,
    color: 'Red',
    imgUri: require('@/assets/images/eggs/red.png'),
  },
    {
    id: 2,
    color: 'Blue',
    imgUri: require('@/assets/images/eggs/blue.png'),
  },
    {
    id: 3,
    color: 'Golden',
    imgUri: require('@/assets/images/eggs/golden.png'),
  },
    {
    id: 4,
    color: 'Green',
    imgUri: require('@/assets/images/eggs/green.png'),
  },
    {
    id: 5,
    color: 'Orange',
    imgUri: require('@/assets/images/eggs/orange.png'),
  },
    {
    id: 6,
    color: 'Pink',
    imgUri: require('@/assets/images/eggs/pink.png'),
  },
    {
    id: 7,
    color: 'Purple',
    imgUri: require('@/assets/images/eggs/purple.png'),
  },
    {
    id: 8,
    color: 'Yellow',
    imgUri: require('@/assets/images/eggs/yellow.png'),
  },
];

export const getRandomColor = () => {
  const index = Math.floor(Math.random() * 8);
  const eggColor = eggs[index].color;
  const colorArray = eggColor.split('');

  colorArray[0] = colorArray[0].toLowerCase();

  return colorArray.join('') === 'golden' ? 'yellow' : colorArray.join('')
};

export const saveDashboardItems = async (key, itemsForSave) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(itemsForSave));
  } catch (error) {
    console.error(error);
  }
};