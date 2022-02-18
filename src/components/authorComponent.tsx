import * as React from 'react';
import { Text, View } from 'react-native'
import {inject, observer} from "mobx-react";

const AuthorComponent = inject('stores')(observer(({stores}) => {
    const mainStore = stores.mainStore

    return(
        <View style={{marginHorizontal: 20}}>
            <Text style = {{color: 'black'}}>
                {mainStore.currentDetail.photo.owner.username ? mainStore.currentDetail.photo.owner.username : 'Никнейм не указан'}
            </Text>
             <View style = {{flexDirection: 'row'}}>
                <Text style = {{color: 'black'}}>
                    {mainStore.currentDetail.photo.owner.realname ? mainStore.currentDetail.photo.owner.realname : 'Имя не указано'}
                </Text>
                <Text style = {{color: 'black', marginHorizontal: 5}}>
                    {mainStore.currentDetail.photo.owner.location ? mainStore.currentDetail.photo.owner.location : 'Местоположение не указана'}
                </Text>
             </View>
        </View>
    )
}))
export default AuthorComponent