import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Initial from './screens/Inital'
import Login from './screens/Login'
import Register from './screens/Register'
import Home from './screens/Home'
import Add from './screens/Add';
import Edit from './screens/Edit';

const Stack = createNativeStackNavigator();

function MyStack() {
    return(
        <Stack.Navigator initialRouteName="Initial">
            <Stack.Screen name="Initial" component={Initial} options={{headerShown: false}} color/>
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}} color/>
            <Stack.Screen name="Register" component={Register} options={{headerShown: false}} color/>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Add" component={Add} options={{presentation: 'modal'}}/>
            <Stack.Screen name="Edit" component={Edit} options={{presentation: 'modal'}}/>
        </Stack.Navigator>
    )
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}