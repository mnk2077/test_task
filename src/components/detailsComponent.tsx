import * as React from 'react';
import RenderHtml from 'react-native-render-html';
import {View} from 'react-native'
import {inject, observer} from "mobx-react";

const DetailsComponent = inject('stores')(observer(({stores}) => {
    const mainStore = stores.mainStore
    const style = {
        body: {
            whiteSpace: 'normal',
            color: 'gray'
        },
        a: {
            color: 'green'
        }
    }

    return (
        <View style={{marginHorizontal: 20}}>
            <RenderHtml
                contentWidth={200}
                source={{html: mainStore.currentDetail.photo.description._content ? mainStore.currentDetail.photo.description._content : "Нету описания"}}
                tagsStyles={style}
            />
        </View>
    )

}))
export default DetailsComponent