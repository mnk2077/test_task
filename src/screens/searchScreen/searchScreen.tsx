import * as React from 'react';
import {
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Button
} from 'react-native';
import {inject, observer} from "mobx-react";
import FastImage from "react-native-fast-image";
import {ImageType} from "../../tools/ImageType";

const SearchScreen = inject('stores')(observer(({stores, route, navigation}) => {
    const mainStore = stores.mainStore

    const [text, onChangeText] = React.useState("");

    const onPress = (item: ImageType) => {
        mainStore.setCurrentImage(item.id)
        navigation.navigate('Details', {
            item: item
        })
    }

    const renderItem = (item: ImageType, index: number) => {

        return (
            <>
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
            </>
        )
    }

    const loadMoreImages = () => {
        if (mainStore.searchImages.length >= mainStore.totalSearchPhoto) {
            return
        }
        mainStore.setRefresh(true)
        mainStore.loadMoreSearchImages(text)
    }

    const footerSpinner = () => {
        if (mainStore.searchImages.length >= mainStore.totalSearchPhoto) {
            return (<Text style={{color: 'black', marginVertical: 20}}>Нет данных в поисковой строке</Text>)
        }

        if (!mainStore.isRefresh) return (<></>)

        return (
            <ActivityIndicator style={{marginBottom: 20}}/>
        )
    }

    return (
        <View style={{flex: 1}}>
            <View style={{
                flexDirection: 'row',
                border: 1,
                borderColor: 'black'
            }}>
                <TextInput
                    placeholder={'Search image'}
                    placeholderTextColor="#8e8e8e"
                    style={{
                        marginRight: 40,
                        width: '80%',
                        color: 'black',
                    }}
                    onChangeText={onChangeText}
                    value={text}
                />
                <Button
                    title="find"
                    style={{width: '30%'}}
                    onPress={() => mainStore.goSearch(text)}
                />
            </View>
            {mainStore.isDataLoaded && <FlatList
                vertical={true}
                data={mainStore.searchImages}
                keyExtractor={(item, index) => {
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
export default SearchScreen;