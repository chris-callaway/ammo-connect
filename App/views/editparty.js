import React, { Component } from 'react';
import { ActionSheetIOS, ActivityIndicator, Platform, Alert, AlertIOS, Image, Button, StyleSheet, View, TouchableHighlight, TextInput, ListView, InteractionManager } from 'react-native';
import { Container, Content, Text, StyleProvider } from 'native-base';
import { createStackNavigator, NavigationActions } from 'react-navigation';
import { Icon, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component';
// import TableView from 'react-native-tableview';
// const { Section, Item } = TableView;
import moment from 'moment/min/moment-with-locales.min';
import Helper from '../helper';
import Swipeout from 'react-native-swipeout';

class EditPartyPage extends React.Component<Props> {

    constructor(props) {
        super(props);
        console.log('props are', props.navigation);
        this.getPartiesByUserId();
    }

    componentDidMount() {
    }

    state = {
        loading: false,
        parties: []
    };

    showMenu = (event) => {
        var day = moment();
        var fullDate = event.startDate + ' ' + event.startTime;
        console.log('event', event);
        var threshold = moment(fullDate, 'MM/DD/YYYY hh:mm a').add(1, 'hours');
        if (moment().isAfter(threshold)) {
            // watch and upload videos
        } else {
            // not time for videos
        }
        ActionSheetIOS.showActionSheetWithOptions({
                options: ['Cancel', 'Remove'],
                destructiveButtonIndex: 1,
                cancelButtonIndex: 0
            },
            (buttonIndex) => {
                if (buttonIndex === 1) { /* destructive action */
                }
            });
    };

    async getPartiesByUserId() {
        this.setState({loading: true});

        Helper.getUser().then(user => {
            console.log('Fetched user', user);
            Helper.getUserId(user.username).then(response => {
                console.log('returned response', response);
                response.json().then((json) => {
                    console.log('have json', json);
                    console.log('userId fetched', json[0].id);
                    var userId = json[0].id;
                    var query = 'SELECT * FROM Parties WHERE user_id = "' + userId + '"';
                    var obj = {
                        Method: 'query',
                        Module: 'Database',
                        params: {
                            query: query
                        }
                    };

                    fetch('http://192.169.217.115:7099/partyfinder/', {
                        method: 'POST',
                        headers: {
                            Authorization: 'Basic c2F1bUBhbHR1c2pvYnMuY29tOkJpbGxpb25zNDAh',
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(obj),
                    }).then((response) => {
                        this.setState({loading: false});
                        response.json().then((json) => {
                            if (json) {
                                console.log('received parties', json);
                                this.setState({parties: json});
                                return json;
                            }
                        }).catch((err) => {
                            console.log('Could not find any parties at this time');
                        });
                    });
                })
            })
        });
    }

    editParty = (item, index) => {
        console.log('item is', item, index);
        this.goToPage('EditPartyDetails', {item: item});
    };

    goToPage = (page, params) => {
        this.props.navigation.navigate(page, params);
    };

    deleteParty = (item, index) => {
        var self = this;
        console.log('deleting item', item, index);
        var parties = this.state.parties;
        parties.splice(index, 1);
        var obj = {
            Method: 'delete',
            Module: 'Database',
            params: {
                table: 'Parties',
                id: item.id
            }
        };

        fetch('http://192.169.217.115:7099/partyfinder/', {
            method: 'POST',
            headers: {
                Authorization: 'Basic c2F1bUBhbHR1c2pvYnMuY29tOkJpbGxpb25zNDAh',
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj),
        }).then((response) => {
            Helper.alertHandler('Item deleted');
            setTimeout(function () {
                self.setState({parties: parties});
            }, 500);
        });
    };

    render() {

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
                        this.deleteParty(item, index)
                    }
                },
                {
                    text: 'Edit',
                    backgroundColor: '#333',
                    onPress: () => {
                        this.editParty(item, index)
                    }
                }
            ]
        };

        return (

            <View style={{ flex: 1 }}>
                {this.state.parties.map((item, index) =>



                        <Swipeout
                            autoClose={true}
                            orientation={'row'}
                            right={swipeoutBtns(item, index)} key={item.id}>
                            <View
                                style={{paddingLeft: 10, height: 50, backgroundColor: '#fff', justifyContent: 'center'}}>
                                <Text>{item.name}</Text>
                            </View>

                        </Swipeout>
                )}
            </View>
        );
    }
}

export default EditPartyPage;


const styles = StyleSheet.create({
    tableCell: {
        flex: 1,
        marginTop: 40
    },
    formInputs: {
        width: 250
    },
    buttons: {
        flexDirection: 'row',
        backgroundColor: 'purple',
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
    },
    headerBtn: {
        marginRight: 10,
        color: '#fff',
        fontSize: 16
    }
});


