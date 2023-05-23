import React, { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { clearStorage, getItems, saveItem } from "./utils/async-storage";
import ProductList from "./components/ProductList";
import ProductListCart from "./components/ProductListCart";

const initialItems = [
  {
    id: 1,
    nome: "Camiseta",
    quantidade: 1,
    preco: 79.9,
  },
  {
    id: 2,
    nome: "Chuteira",
    quantidade: 1,
    preco: 129.9,
  },
  {
    id: 3,
    nome: "Meia",
    quantidade: 1,
    preco: 29.9,
  },
];

export default function App() {
  const [storedItems, setStoredItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [newProduct, setNewProduct] = useState({
    id: "",
    nome: "",
    quantidade: 1,
    preco: 0,
  });

  const handleListItems = async () => {
    const items = await getItems();
    setStoredItems(items);
  };

  useEffect(() => {
    saveItem(initialItems);
  }, []);

  useEffect(() => {
    handleListItems();
  }, [storedItems]);

  const handleAddProduct = async () => {
    if (newProduct.nome && newProduct.preco) {
      const updatedItems = [...storedItems, newProduct];
      await saveItem(updatedItems);
      setStoredItems(updatedItems);
      setNewProduct({
        id: Math.random(),
        nome: "",
        quantidade: 1,
        preco: 0,
      });
    }
  };

  const calculateTotalPrice = (items) => {
    console.log(items);
    const totalPrice = items.reduce(
      (sum, item) => sum + item.preco * item.quantidade,
      0
    );
    console.log({ totalPrice });
    setTotalPrice(totalPrice);
  };

  const handleSelectItem = (itemId) => {
    const selectedItem = storedItems.find((item) => item.id === itemId);
    if (selectedItem) {
      const updatedSelectedItems = [
        ...selectedItems,
        { ...selectedItem, isSelected: true },
      ];
      setSelectedItems(updatedSelectedItems);
      calculateTotalPrice(updatedSelectedItems);
    }
  };

  const handleDeselectItem = (itemId) => {
    const updatedSelectedItems = selectedItems.filter(
      (item) => item.id !== itemId
    );
    setSelectedItems(updatedSelectedItems);
    calculateTotalPrice(updatedSelectedItems);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Nome:</Text>
        <TextInput
          style={styles.input}
          value={newProduct.nome}
          onChangeText={(text) => setNewProduct({ ...newProduct, nome: text })}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Quantidade:</Text>
        <TextInput
          style={styles.input}
          value={newProduct.quantidade.toString()}
          onChangeText={(text) => {
            const quantity = parseInt(text);
            setNewProduct({ ...newProduct, quantidade: quantity });
          }}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Preço:</Text>
        <TextInput
          style={styles.input}
          value={newProduct.preco.toString()}
          onChangeText={(text) => {
            const price = parseFloat(text);
            setNewProduct({ ...newProduct, preco: price });
          }}
          keyboardType="numeric"
        />
      </View>
      <View styles={{ flexDirection: "row" }}>
        <Pressable style={styles.addButton} onPress={handleAddProduct}>
          <Text style={styles.addButtonLabel}>Adicionar Produto</Text>
        </Pressable>
        <Pressable style={styles.addButton} onPress={() => clearStorage()}>
          <Text style={styles.addButtonLabel}>Nova Compra</Text>
        </Pressable>
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>Product List</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {storedItems.map((item) => (
          <ProductList
            key={item.id}
            id={item.id}
            nome={item.nome}
            quantidade={item.quantidade}
            preco={item.preco}
            onSelectItem={handleSelectItem}
            onDeselectItem={handleDeselectItem}
            selected={selectedItems.some(
              (selectedItem) => selectedItem.id === item.id
            )}
          />
        ))}
      </ScrollView>
      <View style={styles.selectedItemsContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Cart</Text>
          <Text style={styles.totalPrice}>
            Total Price: $ {totalPrice.toFixed(2)}
          </Text>
        </View>
        <Text style={styles.selectedItemsTitle}>Produtos Selecionados:</Text>
        <ScrollView style={styles.selectedItemsScrollView}>
          {selectedItems.map((product) => (
            <ProductListCart
              key={product.id}
              id={product.id}
              nome={product.nome}
              quantidade={product.quantidade}
              preco={product.preco}
              onSelectItem={handleSelectItem}
              onDeselectItem={handleDeselectItem}
              selected={selectedItems.some(
                (selectedItem) => selectedItem.id === product.id
              )}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#ddf2ed",
    minWidth: 150,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#101010",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
  },
  scrollView: {
    backgroundColor: "#ddf2ed",
    maxHeight: 400,
    width: "100%",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#101010",
    borderRadius: 5,
  },
  selectedItemsContainer: {
    width: "100%",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#101010",
    borderRadius: 5,
    padding: 10,
  },
  selectedItemsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  selectedItemsScrollView: {
    maxHeight: 150,
  },
  selectedItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  selectedItemText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
  },
  inputLabel: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    width: "60%",
    borderColor: "#101010",
    borderRadius: 5,
    padding: 10,
  },
  addButton: {
    backgroundColor: "#ddf2ed",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#101010",
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonLabel: {
    fontSize: 16,
  },
});
