import React, { Component } from 'react';
import { AsyncStorage, ActivityIndicator, ImageBackground, Platform, Alert, AlertIOS, Image, Button, StyleSheet, View, ScrollView, TouchableHighlight, TextInput, ListView } from 'react-native';
import { Container, Content, Text, StyleProvider } from 'native-base';
import { createStackNavigator } from 'react-navigation';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component';
import Helper from '../helper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
var PushNotification = require("react-native-push-notification");

class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        loading: false,
        deviceId: ''
    };

    componentWillMount() {
      }

      componentWillUnmount() {

      }

    componentDidMount() {
        var self = this;
        var deviceId = Helper.getdeviceId();
        this.checkNotifications();
        this.props.navigation.addListener(
            'willFocus',
            () => {
                this.setState({deviceId: Helper.getdeviceId()}, () => {
                    
                });
            }
        );
    }

    getNotificationSettings = async (deviceId) => {
        console.log('getting settings', deviceId);
        return new Promise(async (resolve, reject) => {
            var obj = {
                Method: 'query',
                Module: 'Database',
                params: {
                    query: 'SELECT * FROM tokens WHERE uuid = "' + deviceId + '"'
                }
            };
    
            return await Helper.apiFetch(obj).then(async function (json) {
                if (json.length > 0){
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
        
    };

    setNotifications = async () => {
        var self = this;
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: async function(token) {

                console.log("TOKEN:", token);
                var deviceId = Helper.getdeviceId();
                var notificationsEnabled = await this.getNotificationSettings(deviceId);

                if (!notificationsEnabled){
                    var obj = {
                        Method: 'insert',
                        Module: 'Database',
                        params: {
                            table: 'tokens', obj: { token: token.token, uuid: deviceId}
                        }
                    };
            
                    return await Helper.apiFetch(obj).then(function (json) {
                        self.goToPage('Search');
                    });
                } else {
                    self.goToPage('Search');
                }
                
           
            }.bind(this),
           
            // (required) Called when a remote or local notification is opened or received
            onNotification: function(notification) {
              console.log("NOTIFICATION:", notification);
           
              // process the notification
           
              // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
              notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
           
            // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
            senderID: "YOUR GCM (OR FCM) SENDER ID",
           
            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
              alert: true,
              badge: true,
              sound: true
            },
           
            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,
           
            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             */
            requestPermissions: true
          });
    }

    checkNotifications = async() => {
        var deviceId = Helper.getdeviceId();
        console.log('deviceId is', deviceId);
        var notificationsEnabled = await this.getNotificationSettings(deviceId);
        console.log('notificationsEnabled', notificationsEnabled);
        if (!notificationsEnabled){
            this.setNotifications();
        }
    }

    goToPage = (page, params) => {
        console.log('going to page', page);
        this.props.navigation.navigate(page, params);
    };

    render() {
        const animating = this.state.animating;
        return (

            <ImageBackground source={require('./../img/splash_bg.jpg')}  style={{ textAlign: 'center', alignItems: 'center', justifyContent:'center', width:'100%', height:'100%'}}>

            <KeyboardAwareScrollView >

                <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{ textAlign: 'center', justifyContent:'center', width:'80%', height:'80%', alignItems: 'center'}}>
                    <View style={{ textAlign: 'center', flexDirection:'row', alignItems: 'center'}}>
                        {
                            <Image source={require('./../img/logo.png')}
                                  style={{resizeMode: 'contain', width: 367, height: 128, flex: 1.0, marginBottom: 80, marginTop: 50, }}/>
                        }
                       
                    </View>

                    <View style={{ alignItems: 'center'}}>

                        <View style={{flexDirection:'row', alignSelf: 'flex-start', marginTop: 40}}>
                            <ButtonComponent
                                text="Search"
                                type="primary"
                                shape="rectangle"
                                backgroundColors={['#cc0607', '#cc0607']}
                                gradientStart={{ x: 10, y: 10 }}
                                gradientEnd={{ x: 10, y: 10 }}
                                height={50}
                                width={250}
                                flex={1.0}
                                color="#2658db"
                                onPress={ () =>  this.goToPage('Search') }
                                //onPress={ () => this._registerAlert()}
                                //textStyle={{color: '#2658db'}}
                                >
                            </ButtonComponent>
                        </View>

                        <View style={{flexDirection:'row', marginTop: 40}}>
                            <ButtonComponent
                                text="Get Price Updates"
                                type="primary"
                                shape="rectangle"
                                backgroundColors={['#e72122', '#e72122']}
                                gradientStart={{ x: 10, y: 10 }}
                                gradientEnd={{ x: 10, y: 10 }}
                                height={50}
                                width={250}
                                flex={1.0}
                                color="#2658db"
                                onPress={ () => this.goToPage('PriceUpdates') }
                                //textStyle={{color: '#2658db'}}
                                >
                            </ButtonComponent>
                        </View>

                    </View>
                    </View>
                   

                   
                </ScrollView>

            </KeyboardAwareScrollView>
            </ImageBackground>

        );
    }
}

export default HomeScreen;



const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    formInputs: {
        width: 250
    },
    buttons: {
        flexDirection: 'row',
        backgroundColor: '#2658db',
        marginTop: 20
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


