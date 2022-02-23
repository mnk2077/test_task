import * as React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from "react-native-fast-image";
import {inject, observer} from "mobx-react";
import DetailsComponent from "../../components/detailsComponent";
import AuthorComponent from "../../components/authorComponent";
import TagComponent from "../../components/tagComponent";
import {ImageType} from "../../tools/ImageType";

const DetailsScreen = inject('stores')(observer(({stores, route, navigation}) => {
    const mainStore = stores.mainStore
    const {item} = route.params

    React.useEffect(() => {
        return navigation.addListener('beforeRemove', () => {
            mainStore.currentImage = null
            mainStore.currentDetail = undefined
        })
    }, [navigation])

    const listTags = () => mainStore.currentDetail.photo.tags.tag.map((tag) => {
        return (<TagComponent key={tag.id} tagTitle={tag._content}/>)
    })

    const onPress = (item: ImageType) => {
        navigation.navigate('Photo', {
            item: item
        })
    }

    return (
        <ScrollView style={{flex: 1}}>
            {!(mainStore.isDataLoaded && mainStore.currentDetail) &&
            <Text style={{color: 'black', flex: 1, justifyContent: 'center'}}>Загрузка данных</Text>}
            {(mainStore.isDataLoaded && mainStore.currentDetail) &&
            <>
                <TouchableOpacity key={item.id}
                                  style={{
                                      flex: 1,
                                      minHeight: 250,
                                      maxHeight: 260,
                                      width: '100%'
                                  }}
                                  onPress={() => onPress(item)}>
                    <FastImage
                        style={{
                            marginBottom: 50,
                            height: 250,
                            maxHeight: 300,
                            width: '100%',
                            backgroundColor: '#555555'
                        }}
                        source={{uri: item.url_s}}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </TouchableOpacity>
                <AuthorComponent/>
                <DetailsComponent/>
                {mainStore.currentDetail.photo.tags.tag.length > 0 &&
                <Text style={{
                    color: 'black',
                    marginTop: 20,
                    marginBottom: 10,
                    fontSize: 20,
                    marginHorizontal: 20
                }}>Tags</Text>
                }
                <View style={styles.tagContainer}>
                    {listTags()}
                </View>
            </>
            }
        </ScrollView>
    )
}))
export default DetailsScreen;

const styles = StyleSheet.create({
    tagContainer: {
        display: 'flex',
        flexDirection: "row",
        flexWrap: "wrap",
        marginHorizontal: 20,
        justifyContent: 'flex-start'
    }
})