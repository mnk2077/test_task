import * as React from 'react';
import RenderHtml from 'react-native-render-html';
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
        <>
            <RenderHtml
                contentWidth={200}
                source={{html: mainStore.currentDetail.photo.description._content ? mainStore.currentDetail.photo.description._content : "Нету описания"}}
                tagsStyles={style}
            />
        </>
    )

}))
export default DetailsComponent