import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from "./screens/homeScreen/homeScreen";
import DetailsScreen from "./screens/detailsScreen/detailsScreen";
import PhotoScreen from "./screens/photoScreen/photoScreen";

const Stack = createNativeStackNavigator();

const App = () =>{
  return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="Details" component={DetailsScreen}/>
          <Stack.Screen name="Photo" component={PhotoScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
  )
}


export default App;