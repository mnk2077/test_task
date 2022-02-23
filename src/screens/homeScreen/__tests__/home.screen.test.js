import * as React from 'react'
import HomeScreen from "../homeScreen";
import {fireEvent, render} from "@testing-library/react-native"
import MainStore from "../../stores/mainStore";
import TouchableOpacity from 'react-native'
import {inject, observer} from "mobx-react";
import {Provider} from "mobx-react";
import App from "../../../App";

describe('Home Screen', () => {

    it('should go to search screen', () => {
        const stores = {
            mainStore: new MainStore()
        }
        const navigation = {navigate: () => {}}
        const spy = jest.spyOn(navigation, "navigate")

        const screen = render(
            <Provider>
                <HomeScreen navigation={navigation} stores={stores}/>
            </Provider>
        )
        const searchButton = screen.getByTestId("searchButton")

        fireEvent.press(searchButton)

        expect(spy).toHaveBeenCalledWith("Search")
    });

    it('should show list image', () => {
        const stores = {
            mainStore: new MainStore()
        }
        const screen = render(<HomeScreen stores={stores}/>)

        screen.queryByTestId("listImage")

        expect(screen.queryAllByTestId("listImage").length).toEqual(0);
    })

})