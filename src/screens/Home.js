import * as React from 'react';
import * as RN from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { database } from '../../config/fb';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Product from '../components/Product';
import { View } from 'react-native-animatable';
import {firebase} from '../../config/fb';
import {TouchableOpacity, Text} from 'react-native'

export default function Home() {

    const [products, setProducts] = React.useState([]);
    const navigation = useNavigation();
    function logout(){
        firebase.auth().signOut()
        .then(() => {
            navigation.navigate("Initial")
        }).catch((error) => {
        })
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <RN.Button title='Logout' onPress={(logout)} />
        })
    },[navigation])

    React.useEffect(() => {
        const collectionRef = collection(database, 'products');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
        console.log('querySnapshot unsusbscribe');
          setProducts(
            querySnapshot.docs.map(doc => ({
                id: doc.id,
                emoji: doc.data().emoji,
                name: doc.data().name,
                ingredient: doc.data().ingredient,
                detalhes: doc.data().detalhes,
                isSold: doc.data().isSold,
                createdAt: doc.data().createdAt,
            }))
          );
        });
    return unsubscribe;
    },[])

    return(  
        <RN.View style={styles.container}>
            <RN.ScrollView contentContainerStyle={{paddingBottom: 100}}>
            <RN.Text style={styles.title}>Receitas </RN.Text>
                {products.map(product => <Product key={product.id} {...product} />)}
            </RN.ScrollView>
            <TouchableOpacity
            style={styles.buttonNewRecipe}
            onPress={() => navigation.navigate('Add')}
        >
            <Text style={styles.iconButton}>+</Text>
            </TouchableOpacity>
        </RN.View>
        
        
    )
}

const styles = RN.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        margin: 16,
    },
    iconButtonLogout: {
        color: "#fffff",
        fontSize: 25,
        fontWeight:"bold"
    },
    buttonNewRecipe:{
        width:60,
        height:60,
        position:"absolute",
        bottom: 30,
        right: 20,
        backgroundColor:"#38a69d",
        borderRadius:50,
        justifyContent:"center",
        alignItems: "center"
    },
    iconButton:{
        color:"#fff",
        fontSize:23
    },
});