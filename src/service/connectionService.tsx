import NetInfo from '@react-native-community/netinfo'

const netConnect = () => {
    return NetInfo.fetch().then(state => {
        return state.isConnected
    });
}
export default netConnect