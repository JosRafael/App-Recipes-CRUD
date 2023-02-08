import * as React from 'react';
import * as RN from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import  {database}  from '../../config/fb';
import { useNavigation } from '@react-navigation/native';
import EmojiPicker from 'rn-emoji-keyboard';

export default function Add() {
    const navigation = useNavigation();
    const [isOpen, setIsOpen] = React.useState(false);
    const [newItem, setNewItem] = React.useState({
        emoji: '🍕',
        name: '',
        ingredient: '',
        detalhes: '',
        isSold: false,
        createdAt: new Date(),
    });

    const handlePick = (emojiObject) => {
        setNewItem({
            ...newItem,
            emoji: emojiObject.emoji,
        });
      /* example emojiObject = { 
          "emoji": "❤️",
          "name": "red heart",
          "slug": "red_heart",
        }
      */
    }

    const onSend = async () => {
        const docRef = await addDoc(collection(database, 'products'), newItem);
        navigation.goBack();
      }

    return(
        <RN.View style={styles.container}>
            <RN.Text style={styles.title}>Adicione uma nova receita</RN.Text>
            <RN.Text onPress={() => setIsOpen(true)} style={styles.emoji}>{newItem.emoji}</RN.Text>
            <EmojiPicker
                onEmojiSelected={handlePick}
                open={isOpen}
                onClose={() => setIsOpen(false)} 
            />
                <RN.TextInput 
                    onChangeText={(text) => setNewItem({...newItem, name: text})}
                    style={styles.inputContainer} 
                    placeholder='Nome da receita' 
                />
                <RN.TextInput 
                    onChangeText={(text) => setNewItem({...newItem, ingredient: text})}
                    style={styles.inputContainer} 
                   placeholder='Digite os ingredientes' 
                />
                <RN.TextInput 
                    onChangeText={(text) => setNewItem({...newItem, detalhes: text})}
                    style={styles.inputContainer} 
                   placeholder='Detalhes da receita' 
                />
            <RN.Button title='Adicionar' onPress={onSend}/>
        </RN.View>
    )
}

const styles = RN.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
    },
    inputContainer: {
        width: '90%',
        padding: 13,
        marginVertical: 6,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
      },
    emoji: {
        fontSize: 100,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        padding: 10,
        marginVertical: 6,
    }

});