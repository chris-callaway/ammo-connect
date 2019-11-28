import React, { Component } from 'react';
import { AsyncStorage, ActivityIndicator, ImageBackground, Platform, Alert, AlertIOS, Image, Button, StyleSheet, View, ScrollView, TouchableHighlight, TextInput, ListView } from 'react-native';
import { Container, Content, Text, StyleProvider } from 'native-base';
import { createStackNavigator } from 'react-navigation';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component';
import Helper from '../helper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PushNotificationIOS from "@react-native-community/push-notification-ios";


class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        PushNotificationIOS.addEventListener('register', this._onPushNotificationRegistration);
    }

    state = {
        loading: false,
        deviceId: ''
    };

    // componentWillMount() {
    //     // NOTE: You absolutely need this for requestPermissions() promise to resolve.   
    //     PushNotificationIOS.addEventListener('register', (token) => {});
    //   }
      
    //   componentWillUnmount() {
    //     PushNotificationIOS.removeEventListener('register', (token) => {});
    //   }

    componentWillMount() {
        // NOTE: You absolutely need this for requestPermissions() promise to resolve. 
        PushNotificationIOS.addEventListener('localNotification', () => {});
        PushNotificationIOS.requestPermissions().then((permissions) => {
            Helper.alertHandler('Have it ' + permissions);
        });       
        PushNotificationIOS.addEventListener('register', (token) => {
            Helper.alertHandler('register: ' + token);
        });
       // PushNotificationIOS.requestPermissions();
      }
      
      componentWillUnmount() {
        PushNotificationIOS.removeEventListener('register', (token) => {
            Helper.alertHandler('unregister: ' + token);
        });
      }

    componentDidMount() {
        var self = this;
        this.props.navigation.addListener(
            'willFocus',
            () => {
                this.setState({deviceId: Helper.getdeviceId()});
            }
        );
       
        // PushNotificationIOS.requestPermissions();
        // PushNotificationIOS.addEventListener('register', function(devicetoken){
        //   console.log('register', devicetoken);
        //   Helper.alertHandler('register: ' + devicetoken);
        // });
        
        // PushNotificationIOS.addEventListener('registrationError', function(error){
        //   var errorKey = Object.keys(error)[0]; 
        //   var errorValue = error[errorKey];
        //   console.log('error', errorKey, errorValue);
        //   Helper.alertHandler('error: ' + errorValue);
        // });
    }

    _onPushNotificationRegistration(token) {
        Helper.alertHandler('Registered for notifications ' + token);
      
        if (this.state.notificationToPost) {
          //this._scheduleNotification(this.state.notificationToPost);
        }
      }

    goToPage = (page, params) => {
        console.log('going to page', page);
        this.props.navigation.navigate(page, params);
    };

    render() {
        const animating = this.state.animating;
        return (

            <ImageBackground source={require('./../img/splash_bg.png')}  style={{ textAlign: 'center', alignItems: 'center', justifyContent:'center', width:'100%', height:'100%'}}>

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
                                onPress={ () => this.goToPage('Search') }
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


