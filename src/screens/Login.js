import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import * as Animatable from "react-native-animatable";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { collection } from 'firebase/firestore';


import {firebase} from '../../config/fb';


export default function Login({navigation}) {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errorLogin, setErrorLogin ] = useState('');

    const loginFirebase = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            navigation.navigate('Home');
            errorLogin = false;
            
        })
        .catch((error) => {
            setErrorLogin(true);
            let errorCode = error.code;
            let errorMessage = error.message;
        })
    }
	
    //Verificando se existe um usuário conectado
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if(user){
                navigation.navigate("Home", { idUser: user.uid});
            }
        })
    }, [])
    
	return (
		<View style={styles.container}>
			<Animatable.View
				animation="fadeInLeft"
				delay={500}
				style={styles.containerHeader}
			>
				<Text style={styles.message}>Seja Bem-vindo(a)</Text>
			</Animatable.View>

			<Animatable.View
				animation="fadeInUp"
				delay={500}
				style={styles.containerForm}
			>
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
                {errorLogin == true
        ?
            <View style={styles.contentAlert}> 
                <MaterialCommunityIcons
                    name='alert-circle'
                    size={24}
                    color="#fff"
                />
                
            </View>
        :
           <View/>
            
        }

        {email == "" || password == ""
        ?
            <TouchableOpacity
                disabled={true}
                style={styles.button}
            >
                
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        :
            <TouchableOpacity
                onPress={() => loginFirebase(email, password)}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        }
				<TouchableOpacity style={styles.buttonRegister}>
					<Text style={styles.registerText}
                    onPress={() => navigation.navigate("Register")}
                    >
						Não possui uma conta? Cadastre-se
					</Text>
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