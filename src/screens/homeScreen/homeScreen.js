import * as React from 'react';
import { View,
        TouchableOpacity,
        Image,
        FlatList,
        ScrollView } from 'react-native';
import {useEffect, useState} from "react";

const HomeScreen = ({ navigation }) => {
    const [images, setImage] = useState([
        require('../../assets/imageMock/photo_2022-01-04_14-04-49.jpg'),
        require('../../assets/imageMock/photo_2022-02-08_21-26-28.jpg'),
        require('../../assets/imageMock/photo_2022-02-08_21-26-38.jpg'),
        require('../../assets/imageMock/photo_2022-02-13_09-18-20.jpg')])


    const onPress = () => {
        navigation.navigate('Details')
    }

    return (
        <View style={{flex: 1, width: 640, height: 640}}>
            <ScrollView>
                <TouchableOpacity style={{flex: 1}} onPress={() => onPress()}>
                    <FlatList
                        vertical={true}
                        data={images}
                        renderItem={({ item, index }) => (
                            <Image
                                style={{marginTop: 10,
                                        marginBottom: 10}}
                                source={item}
                                key={index}/>
                        )}
                    />
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}


export default HomeScreen;