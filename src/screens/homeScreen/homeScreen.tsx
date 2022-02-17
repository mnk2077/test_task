import * as React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {inject, observer} from "mobx-react";
import FastImage from "react-native-fast-image";
import {ImageType} from "../../tools/imageType";


const HomeScreen = inject('stores')(observer(({stores, navigation}) => {
    const mainStore = stores.mainStore

    const onPress = (item) => {
        mainStore.setCurrentImage(item.id)
        navigation.navigate('Details', {
            item: item
        })
    }

    const renderItem = (item: ImageType, index: number) => {
        console.log("Render", item)

        return (
            <TouchableOpacity style={{flex: 1}} onPress={() => onPress(item)}>
                <FastImage
                    style={{
                        marginTop: 10,
                        marginBottom: 10, backgroundColor: '#8e8e8e', height: 200, width: 200
                    }}
                    source={{uri: item.uri}}
                />
                <Text style={{color: 'black'}}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{flex: 1}}>
            {mainStore.isDataLoaded && <FlatList
                vertical={true}
                data={mainStore.images}
                keyExtractor={(item, index) => `${index + item}`}
                renderItem={({item, index}) => renderItem(item, index)}
            />}
            {!mainStore.isDataLoaded && <Text style={{color: 'black', flex: 1}}>Загрузка данных</Text>}
        </View>
    )
}))


export default HomeScreen;