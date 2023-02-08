import * as React from "react";
import * as RN from "react-native";
import { database } from "../../config/fb";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

export default function Product({
  id,
  emoji,
  name,
  ingredient,
  detalhes,
  isSold,
}) {
  const onDelete = () => {
    const docRef = doc(database, "products", id);
    deleteDoc(docRef);
  };

  const onEditRecomendar = () => {
    const docRef = doc(database, "products", id);
    updateDoc(docRef, {
      isSold: true,
    });
  };
  const navigation = useNavigation();
  const onEdit = () => {
    navigation.navigate('Edit')
    
  };

  return (
    <RN.View>
      <RN.View style={styles.productContainer}>
        <RN.Text style={styles.name}>{name}</RN.Text>
        <RN.View
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <RN.Text style={styles.emoji}>{emoji}</RN.Text>
          <AntDesign onPress={onEdit} name="edit" size={24} color="black" />
          <AntDesign onPress={onDelete} name="delete" size={24} color="black" />
        </RN.View>

        <RN.Text style={styles.name}>Ingredientes </RN.Text>
        <RN.Text style={styles.price}>{ingredient}</RN.Text>
        <RN.Text style={styles.name}>Detalhes da receita</RN.Text>
        <RN.Text style={styles.price}>{detalhes}</RN.Text>

        {isSold ? (
          <RN.TouchableOpacity
            style={[styles.button, { backgroundColor: "gray" }]}
          >
            <RN.Text style={styles.buttonText}>Recomendado</RN.Text>
          </RN.TouchableOpacity>
        ) : (
          <RN.TouchableOpacity onPress={onEditRecomendar} style={styles.button}>
            <RN.Text style={styles.buttonText}>Recomendar</RN.Text>
          </RN.TouchableOpacity>
        )}
      </RN.View>
    </RN.View>
  );
}

const styles = RN.StyleSheet.create({
  productContainer: {
    padding: 16,
    backgroundColor: "#38a69d",
    margin: 16,
    borderRadius: 8,
  },
  emoji: {
    fontSize: 100,
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  button: {
    backgroundColor: "#0FA5E9",
    padding: 10,
    marginVertical: 6,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  Text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});
