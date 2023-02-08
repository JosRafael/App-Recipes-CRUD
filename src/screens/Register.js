import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import {firebase} from '../../config/fb';
import * as Animatable from "react-native-animatable";


export default function Register() {
    const [ nome, setNome ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ telefone, setTelefone ] = useState('');
    

    const registerFirebase = () => {
        
        firebase.auth().createUserWithEmailAndPassword(email, password, telefone, nome)
        .then(value => {
            alert('Cadastrado com Sucesso', 'Usuário cadastrado!.')
            console.log('Usuário cadastrado com sucesso.\nUID do usuário: ' + value.user.uid)
        })
        .catch(error => {
            console.log(error)
            alert('Falha', 'Preencha todos os campos corretamente.')
        })
    }
	return (
		<View style={styles.container}>
			<Animatable.View
				animation="fadeInLeft"
				delay={500}
				style={styles.containerHeader}
			>
				<Text style={styles.message}>Registrar-se</Text>
			</Animatable.View>

			<Animatable.View
				animation="fadeInUp"
				delay={500}
				style={styles.containerForm}
			>
				
                
                <Text style={styles.title}>Nome</Text>
				<TextInput placeholder="Digite um nome..." style={styles.input} 
                 value={nome}
                onChangeText={setNome}
                />
                <Text style={styles.title}>Email</Text>
				<TextInput placeholder="Digite um email..." style={styles.input} 
                 value={email}
                onChangeText={setEmail}
                />

				<Text style={styles.title}>Senha</Text>
				<TextInput placeholder="Digite uma senha..." style={styles.input}  
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                />
                <Text style={styles.title}>Telefone</Text>
				<TextInput placeholder="Digite o número do seu telefone..." style={styles.input} 
                 value={telefone}
                onChangeText={setTelefone}
                />
        
        <TouchableOpacity
            style={styles.button}
            onPress={() => registerFirebase(nome, email, password, telefone)}
        >
            <Text style={styles.buttonText}>Cadastrar</Text>
            
        </TouchableOpacity>
				
			</Animatable.View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#38a69d",
	},
	containerHeader: {
		marginTop: "14%",
		marginBottom: "8%",
		paddingStart: "5%",
	},
	message: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#fff",
	},
	containerForm: {
		flex: 1,
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		paddingStart: "5%",
		paddingEnd: "5%",
		backgroundColor: "#fff",
	},
	title: {
		fontSize: 20,
		marginTop: 28,
	},
	input: {
		borderBottomWidth: 1,
		height: 40,
		marginBottom: 12,
		fontSize: 16,
	},
	button: {
		backgroundColor: "#38a69d",
		width: "100%",
		borderRadius: 4,
		paddingVertical: 8,
		marginTop: 24,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
	buttonRegister: {
		marginTop: 14,
		alignSelf: "center",
	},
	registerText: {
		color: "#a1a1a1",
	},
    contentAlert: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    warningAlert: {
        paddingLeft: 10,
        color: "red",
        fontSize: 16
    }
});