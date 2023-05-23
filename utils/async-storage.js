import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveItem(listItem) {
  await AsyncStorage.setItem("items", JSON.stringify(listItem));
}

export async function editItem(item) {
  const storedItems = await getItems();
  const updatedItems = storedItems.map((storedItem) =>
    storedItem.id === item.id ? item : storedItem
  );
  await AsyncStorage.setItem("items", JSON.stringify(updatedItems));
}

export async function getItems() {
  const response = await AsyncStorage.getItem("items");
  return response ? JSON.parse(response) : [];
}

export async function getItem(id) {
  const savedItems = await getItems();
  return savedItems.find((item) => item.id === id);
}

export async function deleteItem(id) {
  const savedItems = await getItems();
  const updatedItems = savedItems.filter((item) => item.id !== id);
  await AsyncStorage.setItem("items", JSON.stringify(updatedItems));
}

export async function clearStorage() {
  await AsyncStorage.clear();
}
