import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import MainStore from "./src/screens/stores/mainStore";
import {Provider} from "mobx-react";
import App from "./src/App";

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);