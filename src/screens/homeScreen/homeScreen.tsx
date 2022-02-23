import * as React from 'react';
import {ActivityIndicator, Button, FlatList, Text, TouchableOpacity, View, AsyncStorage} from 'react-native';
import {inject, observer} from "mobx-react";
import FastImage from "react-native-fast-image";
import {ImageType} from "../../tools/ImageType";
import FastImageComponent from "../../components/FastImageComponent";

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
            <TouchableOpacity key={item.id + index} style={{flex: 1}} onPress={() => onPress(item)} >
                {console.log(mainStore.connection)}
                <FastImage
                    style={{
                        marginTop: 10,
                        marginBottom: 3,
                        backgroundColor: '#555555',
                        minHeight: 250,
                        maxHeight: 300,
                        width: '100%'
                    }}
                    source={
                        {
                            uri: mainStore.connection ? item.url_s : mainStore.cacheImage,
                        }
                    }
                    reloadImage = {true}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <Text style={{color: 'black', marginLeft: 15, fontSize: 15,}}>{item.title}</Text>

            </TouchableOpacity>
        )
    }

    const loadMoreImages = () => {
        if (mainStore.connection){
            if (mainStore.images.length >= mainStore.totalPhoto) {
                return
            }
            mainStore.setRefresh(true)
            mainStore.loadMoreImages()
        } else {
            mainStore.setRefresh(false)
        }
    }


    const footerSpinner = () => {
         if (mainStore.connection){
            if (mainStore.images.length >= mainStore.totalPhoto) {
                return (<Text style={{color: 'black', marginVertical: 20}}>Фото закончились</Text>)
            }

            if (!mainStore.isRefresh) return (<></>)

            return (
                <ActivityIndicator style={{marginBottom: 20}}/>
            )
         } else{
             return (<Text style={{color: 'black', marginVertical: 20}}>Нет подключения к интернету</Text>)
         }
    }

    return (
        <View style={{flex: 1}} >
            <Button
                title="Go to search"
                onPress={() => {
                    navigation.navigate('Search')
                }}
                testID="searchButton"
            />
            {mainStore.isDataLoaded && <FlatList
                vertical={true}
                data={mainStore.connection ? mainStore.images : mainStore.cacheImage}
                keyExtractor={(item, index) => {
                    console.log(item)
                    return `${index + item.id}`
                }}
                renderItem={({item, index}) => renderItem(item, index)}
                onEndReached={() => loadMoreImages()}
                refreshing={mainStore.isRefresh}
                ListFooterComponent={() => footerSpinner()}
                testID="listImage"
            />}
            {!mainStore.isDataLoaded && <Text style={{
                color: 'black',
                flex: 1
            }}>Загрузка данных</Text>}
        </View>
    )
}))


export default HomeScreen;