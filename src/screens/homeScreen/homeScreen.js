import * as React from 'react';
import { View,
        TouchableOpacity,
        Image,
        FlatList} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {useEffect, useState} from "react";

const HomeScreen = ({ navigation }) => {
    let [images, setImage] = useState(undefined)
    useEffect( () => {[
        setImage(require('../../assets/imageMock/photo_2022-01-04_14-04-49.jpg')),
        setImage(require('../../assets/imageMock/photo_2022-02-08_21-26-28.jpg')),
        setImage(require('../../assets/imageMock/photo_2022-02-08_21-26-38.jpg')),
        setImage(require('../../assets/imageMock/photo_2022-02-13_09-18-20.jpg'))
    ]
    })
    const onPress = () => {
        navigation.navigate('Details')
    }

    return (
        <View style={{flex: 1, width: 640, height: 640}}>
            <TouchableOpacity style={{flex: 1}} onPress={() => onPress()}>
                <FlatList
                    data={images}
                    renderItem={({ item, index }) => (
                        <Image source={item}
                                key={index}/>
                    )}
                />
            </TouchableOpacity>
        </View>
    )
}


export default HomeScreen;