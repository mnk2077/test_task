import * as React from 'react';
import FastImage from "react-native-fast-image";
import {View} from 'react-native'
import {inject, observer} from "mobx-react";

const FastImageComponent = inject('stores')(observer(({stores, imageUrls, key}) => {
    const mainStore = stores.mainStore


    return (
        <View key={key}>
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
                        uri: {imageUrls}
                    }
                }
                resizeMode={FastImage.resizeMode.contain}
            />
        </View>
    )

}))
export default FastImageComponent