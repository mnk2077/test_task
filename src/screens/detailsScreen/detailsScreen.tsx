import * as React from 'react';
import {Text, View} from 'react-native';
import FastImage from "react-native-fast-image";
import {inject, observer} from "mobx-react";
import DetailsComponent from "../../components/detailsComponent";

const DetailsScreen = inject('stores')(observer(({stores, route, navigation}) => {
    const mainStore = stores.mainStore
    const {item} = route.params

    React.useEffect(() => {
        return navigation.addListener('beforeRemove', () => {
            mainStore.currentImage = null
            mainStore.currentDetail = undefined
            console.log(mainStore.currentImage, mainStore.currentDetail)
        })
    }, [navigation])


    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {!(mainStore.isDataLoaded && mainStore.currentDetail) &&
            <Text style={{color: 'black'}}>Загрузка данных</Text>}
            {(mainStore.isDataLoaded && mainStore.currentDetail) &&
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
                <DetailsComponent/>
            </>
            }
        </View>
    )
}))

export default DetailsScreen;