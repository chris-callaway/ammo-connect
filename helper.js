import { AsyncStorage, AppRegistry, Platform, Alert, AlertIOS } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import DeviceInfo from 'react-native-device-info';

const Helper = {
    alertHandler: function (message) {
        Alert.alert(message);
    },
    testMethod: function (event) {
        this.alertHandler('test');
    },
    saveLocalStorage: async(key, value) => {
        AsyncStorage.setItem(key, JSON.stringify(value));
    },
    isLoggedIn: async (openedApp, ref) => {
        console.log('checking if logged in');
        try {
            const item = await AsyncStorage.getItem('LoggedIn');
            const loggedIn = JSON.parse(item);
            if (openedApp) {
                if (loggedIn && loggedIn.status == 'true') {
                    Helper.goToPage('Main', ref);
                } else {
                    console.log('No need to do anything');
                }
            } else {
                if (!loggedIn || loggedIn.status == 'false') {
                    console.log('not logged in');
                    Helper.goToPage('Home', ref);
                }
            }
        } catch (e) {
            console.log('not logged in');
            Helper.goToPage('Home', ref);
        }
    },
    goToPage: function (page, target, params) {
        console.log('going to page', page, target);
        target.props.navigation.navigate(page, params);
    },
    validateEmail: function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    getUser: async () => {
        var item = await AsyncStorage.getItem('User');
        var user = JSON.parse(item);
        return user;
    },
    getdeviceId: function () {
        return DeviceInfo.getUniqueID();
    },
    apiFetch: async (obj) => {
        return await fetch('http://192.169.217.115:8096/', {
            method: 'POST',
            headers: {
                Authorization: 'Basic c2F1bUBhbHR1c2pvYnMuY29tOkJpbGxpb25zNDAh',
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }).then((response) => {
            return response.json().then((json) => {
                return json;
            }, function (err) {
                // no data returned
                return [{}];
            })
        });
    }
};

export default Helper;