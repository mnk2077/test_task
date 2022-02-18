import * as React from 'react';
import {ActivityIndicator, FlatList, Text, TouchableOpacity, View, Button} from 'react-native';
import {inject, observer} from "mobx-react";
import FastImage from "react-native-fast-image";
import {ImageType} from "../../tools/ImageType";

const HomeScreen = inject('stores')(observer(({stores, navigation}) => {
    const mainStore = stores.mainStore

    const onPress = (item: ImageType) => {
        mainStore.setCurrentImage(item.id)
        navigation.navigate('Details', {
            item: item
        })
    }

    const renderItem = (item: ImageType, index: number) => {
        console.log("Render", item)

        return (
            <TouchableOpacity key={item.id + index} style={{flex: 1}} onPress={() => onPress(item)}>
                <FastImage
                    style={{
                        marginTop: 10,
                        marginBottom: 3,
                        backgroundColor: '#555555',
                        minHeight: 250,
                        maxHeight: 300,
                        width: '100%'
                    }}
                    source={{uri: item.url_s}}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <Text style={{color: 'black', marginLeft: 15, fontSize: 15, }}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    const loadMoreImages = () => {
        if (mainStore.images.length >= mainStore.totalPhoto) {
            return
        }
        mainStore.setRefresh(true)
        mainStore.loadMoreImages()
    }

    const footerSpinner = () => {
        if (mainStore.images.length >= mainStore.totalPhoto) {
            return (<Text style={{color: 'black', marginVertical: 20}}>Фото закончились</Text>)
        }

        if (!mainStore.isRefresh) return (<></>)

        return (
            <ActivityIndicator style={{marginBottom: 20}}/>
        )
    }

    return (
        <View style={{flex: 1}}>
            <Button
                title="Go to search"
                onPress={() => {
                    navigation.navigate('Search')
                }}
            />
            {mainStore.isDataLoaded && <FlatList
                vertical={true}
                data={mainStore.images}
                keyExtractor={(item, index) => {
                    console.log(item)
                    return `${index + item.id}`
                }}
                renderItem={({item, index}) => renderItem(item, index)}
                onEndReached={() => loadMoreImages()}
                refreshing={mainStore.isRefresh}
                ListFooterComponent={() => footerSpinner()}
            />}
            {!mainStore.isDataLoaded && <Text style={{color: 'black',
                                                    flex: 1,
                                                    justifyContent: 'center',
                                                    alignItems: 'center'}}>Загрузка данных</Text>}
        </View>
    )
}))


export default HomeScreen;