import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import ImageViewer from "react-native-image-zoom-viewer";
import {inject, observer} from "mobx-react";

const PhotoScreen = inject('stores')(observer(({stores, route, navigation}) => {
    const mainStore = stores.mainStore
    const {item} = route.params


    return(
        <ImageViewer
            imageUrls={[{url: item.url_s,}]}
            enableImageZoom={true}
            enableSwipeDown={true}
            onSwipeDown={() => navigation.goBack()}
        />
    )

}))

export default PhotoScreen;