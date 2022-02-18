import * as React from 'react';
import {Text, View} from 'react-native';
import FastImage from "react-native-fast-image";
import {inject, observer} from "mobx-react";
import {ImageType} from "../../tools/imageType";

const DetailsScreen = inject('stores')(observer(({stores, route, navigation}) => {
    const mainStore = stores.mainStore
    const {item} = route.params

    React.useEffect(() => {
        return navigation.addListener('beforeRemove', () => {
            mainStore.currentImage = null
            console.log(mainStore.currentImage)
        })
    }, [navigation])

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {!mainStore.isDataLoaded && <Text>Загрузка данных</Text>}
            {mainStore.isDataLoaded &&
            <>
                <FastImage
                    style={{
                        marginTop: 10,
                        marginBottom: 10,
                        height: 200,
                        width: 200
                    }}
                    source={{uri: item.url_s}}
                />
                <Text style={{
                    color: 'black',
                    marginTop: 12,
                    marginBottom: 12
                }}>
                    {item.description}
                </Text>
            </>
            }
        </View>
    )
}))

export default DetailsScreen;