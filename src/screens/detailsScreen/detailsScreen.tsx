import * as React from 'react';
import {Text, View} from 'react-native';
import FastImage from "react-native-fast-image";
import {inject, observer} from "mobx-react";

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
            <FastImage
                style={{
                    marginTop: 10,
                    marginBottom: 10,
                    height: 200,
                    width: 200
                }}
                source={{uri: item.uri}}
            />
            <Text style={{
                color: 'black',
                marginTop: 12,
                marginBottom: 12
            }}>
                {item.description}
            </Text>
        </View>
    )
}))

export default DetailsScreen;