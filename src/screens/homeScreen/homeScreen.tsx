import * as React from 'react';
import axios from "axios";
import {FlatList, Text, TouchableOpacity, View, ActivityIndicator} from 'react-native';
import {inject, observer} from "mobx-react";
import FastImage from "react-native-fast-image";
import {ImageType} from "../../tools/imageType";
import API from '../../service/restAPI/netService'

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
            <TouchableOpacity style={{flex: 1}} onPress={() => onPress(item)}>
                <FastImage
                    style={{
                        marginTop: 10,
                        marginBottom: 10, backgroundColor: '#8e8e8e', height: 200, width: 200
                    }}
                    source={{uri: item.url_s}}
                />
                <Text style={{color: 'black'}}>{item.title}</Text>
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

        return(
            <ActivityIndicator style={{marginBottom: 20}} />
        )
    }

    return (
        <View style={{flex: 1}}>
            {mainStore.isDataLoaded && <FlatList
                vertical={true}
                data={mainStore.images}
                keyExtractor={(item, index) => `${index + item}`}
                renderItem={({item, index}) => renderItem(item, index)}
                onEndReached={() => loadMoreImages()}
                refreshing = {mainStore.isRefresh}
                ListFooterComponent={() => footerSpinner()}
            />}
            {!mainStore.isDataLoaded && <Text style={{color: 'black', flex: 1}}>Загрузка данных</Text>}
        </View>
    )
}))


export default HomeScreen;