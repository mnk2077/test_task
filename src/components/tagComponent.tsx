import * as React from 'react';
import {Text, View} from 'react-native'
import {inject, observer} from "mobx-react";

const TagComponent = inject('stores')(observer(({stores, tagTitle, key}) => {
    const mainStore = stores.mainStore

    return (
        <View style={
            {
                borderRadius: 20,
                backgroundColor: 'black',
                marginHorizontal: 5,
                marginVertical: 5,
                paddingTop: 5,
                paddingBottom: 5,
                paddingLeft: 20,
                paddingRight: 20,
            }
        } key={key}>
            <Text style={{color: 'white'}}>
                {tagTitle}
            </Text>
        </View>
    )
}))
export default TagComponent
