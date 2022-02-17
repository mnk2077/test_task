import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from "./screens/homeScreen/homeScreen";
import DetailsScreen from "./screens/detailsScreen/detailsScreen";
import PhotoScreen from "./screens/photoScreen/photoScreen"
import MainStore from "./screens/stores/mainStore";
import {Provider} from "mobx-react";

const Stack = createNativeStackNavigator();

//https://reactnavigation.org/docs/MST-integration/
const stores = {
    mainStore: new MainStore()
}

const App = () => {
    return (
        <Provider stores={stores}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen}/>
                    <Stack.Screen name="Details" component={DetailsScreen}/>
                    <Stack.Screen name="Photo" component={PhotoScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}

export default App;