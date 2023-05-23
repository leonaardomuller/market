import React, { useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { deleteItem, editItem } from "../utils/async-storage";

export default function ProductListCart({
  id,
  nome,
  quantidade,
  preco,
  onDeselectItem,
}) {
  const [isSelected, setIsSelected] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [inputNome, setInputNome] = useState(nome);
  const [inputQuantidade, setInputQuantidade] = useState(quantidade);
  const [inputPreco, setInputPreco] = useState(preco);

  const handleEditItem = () => {
    const obj = {
      id,
      nome: inputNome,
      quantidade: inputQuantidade,
      preco: inputPreco,
    };

    editItem(obj);
    closeModal();
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleDeselectItem = () => {
    onDeselectItem(id);
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemText}>{nome}</Text>
        <Text style={styles.itemText}>R${preco}</Text>
        <Text style={styles.itemText}>{quantidade}</Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={closeModal}
            >
              <Text style={styles.buttonText}>Fechar</Text>
            </Pressable>

            <Text style={styles.labelText}>Nome:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setInputNome}
              value={inputNome}
            />

            <Text style={styles.labelText}>Quantidade:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setInputQuantidade}
              value={inputQuantidade}
              keyboardType="numeric"
            />

            <Text style={styles.labelText}>Preço:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setInputPreco}
              value={inputPreco}
              keyboardType="numeric"
            />

            <Pressable
              style={[styles.button, styles.buttonSave]}
              onPress={handleEditItem}
            >
              <Text style={styles.buttonText}>Salvar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: ''
  },
  itemInfo: {
    flex: 1,
    marginLeft: 16,
  },
  itemText: {
    fontSize: 16,
    color: "#212121",
  },
  editText: {
    fontSize: 16,
    color: "#2196F3",
    fontWeight: "bold",
    marginLeft: 8,
  },
  deleteText: {
    fontSize: 16,
    color: "#F44336",
    fontWeight: "bold",
    marginLeft: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 4,
    padding: 8,
    alignItems: "center",
    marginVertical: 8,
  },
  buttonClose: {
    backgroundColor: "#757575",
  },
  buttonSave: {
    backgroundColor: "#2196F3",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  labelText: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#F1F1F1",
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
    fontSize: 14,
    color: "#212121",
  },
});
