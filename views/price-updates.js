import React, { Component } from 'react';
import { AsyncStorage, ActivityIndicator, Platform, Alert, AlertIOS, Image, Button, StyleSheet, View, ScrollView, TouchableHighlight, TextInput, ListView } from 'react-native';
import { Container, Content, Text, StyleProvider } from 'native-base';
import { createStackNavigator } from 'react-navigation';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component';
import Helper from '../helper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DeviceInfo from 'react-native-device-info';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
/* import TableView from 'react-native-tableview';
const { Section, Item } = TableView; */
import Swipeout from 'react-native-swipeout';

class PriceUpdatesScreen extends React.Component<Props> {

    constructor(props) {
        super(props);
    }

    state = {
        loading: false,
        notifications: []
    };

    componentDidMount() {
        var self = this;
        this.props.navigation.addListener(
            'willFocus',
            () => {
                var deviceId = Helper.getdeviceId();
                this.setState({deviceId: deviceId});
                this.getNotifications(deviceId);
            }
        );
    }

    getNotifications = async (uuid) => {
        var self = this;
        var obj = {
            Method: 'query',
            Module: 'Database',
            params: {
                query: 'SELECT * FROM notifications WHERE uuid = "' + uuid + '"'
            }
        };

        console.log('fetching', obj.params.query);

        return await Helper.apiFetch(obj).then(function (json) {
            console.log('notifications', json);
            self.setState({notifications: json});
        });
    };

    deleteNotification = async (item, index) => {
        var self = this;
        console.log('deleting item', item, index);
        var notifications = this.state.notifications;
        notifications.splice(index, 1);
        var obj = {
            Method: 'delete',
            Module: 'Database',
            params: {
                table: 'notifications',
                id: item.id
            }
        };

        return Helper.apiFetch(obj).then(function (json) {
            console.log('Fetched done');
            self.setState({notifications: notifications, loading: false});
        });
    };

    goToPage = (page, params) => {
        this.props.navigation.navigate(page, params);
    };


    render() {
        const animating = this.state.animating;
        if (!this.state.searchResults) {
            this.setState({searchResults: []});
        }

        var style = {
            borderColor: '#ec2227',
            height: 100,
            paddingLeft: 10,
            paddingTop: 10
        };

        // Fill the full native table cell height.
        style.flex = 1;

        // Buttons
        let swipeoutBtns = (item, index) => {
            return [
                {
                    text: 'Remove',
                    backgroundColor: 'red',
                    onPress: () => {
                        this.deleteNotification(item, index)
                    }
                }
            ]
        };

        if (this.state.notifications.length == 0) {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ alignItems: 'center', textAlign: 'center', marginTop: 40}}>
                        <Text style={{alignItems: 'center', textAlign: 'center'}}>No Notifications Saved</Text>
                    </View>
                </View>

            )
        } else {
            return (

                <View style={{ flex: 1 }}>
                    {this.state.notifications.map((item, index) =>
                            <Swipeout
                                autoClose={true}
                                orientation={'row'}
                                right={swipeoutBtns(item, index)} key={item.id}>
                                <View
                                    style={{paddingLeft: 10, height: 70, backgroundColor: '#fff'}}>
                                    <View style={{ alignItems: 'flex-start', textAlign: 'flex-start', marginTop: 10}}>
                                        <Text style={{fontSize: 12}}>Manufacturer: {item.manufacturer} |
                                            Retailer: {item.retailer}</Text>
                                    </View>
                                    <View style={{ alignItems: 'flex-start', textAlign: 'flex-start'}}>
                                        <Text style={{fontSize: 12}}>Caliber: {item.caliber} | Type: {item.type}</Text>
                                    </View>
                                    <View style={{ alignItems: 'flex-start', textAlign: 'flex-start'}}>
                                        <Text style={{fontSize: 12}}>
                                            Rounds: {item.rounds} |
                                            Casing: {item.casing}</Text>
                                    </View>
                                </View>

                            </Swipeout>
                    )}
                </View>

            );
        }
    }
}

export default PriceUpdatesScreen;

const styles = StyleSheet.create({
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


