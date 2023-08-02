import React, { Component } from 'react';
import { DatePickerIOS, ActivityIndicator, Platform, Alert, AlertIOS, Image, Button, StyleSheet, View, TouchableHighlight, TextInput, ListView } from 'react-native';
import { Container, Content, Text, StyleProvider } from 'native-base';
import { createStackNavigator } from 'react-navigation';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment/min/moment-with-locales.min';
import Helper from './../../helper';

class EditPartyDetailsPage extends React.Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({
            title: 'Edit Party Details',
            headerRight: ''
        });

        var partyItem = this.props.navigation.getParam('item', null);
        console.log('party item is', partyItem);
        this.setState({partyItem: partyItem});
        this.setState({name: partyItem.name});
        this.setState({description: partyItem.description});
        this.setState({addressLine1: partyItem.addressLine1});
        this.setState({city: partyItem.city});
        this.setState({addressState: partyItem.state});
        this.setState({zip: partyItem.zip});
    }

    getMinDate = () => {
        return moment().format('MM/DD/YYYY')
    };

    getMaxDate = () => {
        return moment('12/31/2019').format('MM/DD/YYYY')
    };

    dateChanged = (date, type) => {
        var obj = {}
        obj[type] = date;
        this.setState(obj);
    };

    validateForm = (party) => {
        var valid = true;
        return valid;
    };

    goToPage = (page, params) => {
        this.props.navigation.navigate(page, params);
    };

    updateParty = (ref) => {
        var self = ref;
        self.setState({loading: true});
        Helper.getUser().then(user => {
            console.log('Fetched user', user);
            Helper.getUserId(user.username).then(response => {
                console.log('returned response', response);
                response.json().then((json) => {
                    console.log('have json', json);
                    console.log('userId fetched', json[0].id);
                    var userId = json[0].id;
                    var party = {
                        name: ref.name,
                        description: ref.description,
                        addressLine1: ref.addressLine1,
                        zip: ref.zip,
                        city: ref.city,
                        state: ref.addressState,
                        start_date: ref.state.partyItem.startDate,
                        end_date: ref.state.partyItem.endDate,
                        user_id: userId
                    };
                    var valid = this.validateForm(party);
                    if (valid) {
                        Helper.getUser().then(function (user) {
                            console.log('party obj', party);
                            var obj = {
                                Method: 'update',
                                Module: 'Database',
                                params: {
                                    table: 'Parties',
                                    'setAll': party,
                                    id: ref.state.partyItem.id
                                }
                            };

                            console.log('sending obj', obj);

                            fetch('http://192.169.217.115:7099/partyfinder/', {
                                method: 'POST',
                                headers: {
                                    Authorization: 'Basic c2F1bUBhbHR1c2pvYnMuY29tOkJpbGxpb25zNDAh',
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(obj)
                            }).then((response) => {
                                console.log('response is', response);
                                self.setState({loading: false});
                                Helper.alertHandler('Party updated');
                                this.goToPage('Your Parties', {});
                                return response;


                            }, function (err) {
                                Helper.alertHandler('Save failed.  Please try again later.');
                            })

                        }).catch((err) => {
                            console.log('catch', err);
                            Helper.alertHandler('Save failed.  Please try again later.');
                        });

                    } else {
                        Helper.alertHandler(valid);
                    }
                }).catch((err) => {
                    console.log('catch', err);
                    Helper.alertHandler('Save failed.  Please try again later.');
                });
            }).catch((err) => {
                console.log('catch', err);
                Helper.alertHandler('Save failed.  Please try again later.');
            });
        }).catch((err) => {
            console.log('catch', err);
            Helper.alertHandler('Save failed.  Please try again later.');
        });
    };

    render() {

        return (

            <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff'}}>

                {this.state.loading &&
                <View style={styles.loading}>
                    <ActivityIndicator size='large'/>
                </View>
                }

                <View style={{ marginTop: 20}}>

                    <View style={{flexDirection:'row', alignSelf: 'flex-start'}}>
                        <FormLabel style={{color: '#fff'}}>Name</FormLabel>
                    </View>

                    <View style={{flexDirection:'row'}}>
                        <FormInput maxLength={40} value={this.state.name} onChangeText={(text) => this.name = text}
                                   containerStyle={ styles.formInputs }/>
                    </View>

                    <View style={{flexDirection:'row', alignSelf: 'flex-start'}}>
                        <FormLabel style={{color: '#fff'}}>Description</FormLabel>
                    </View>

                    <View style={{flexDirection:'row'}}>
                        <FormInput maxLength={200} inputStyle={{ width: '100%'}} multiline
                                   value={this.state.description}
                                   onChangeText={(text) => this.description = text}
                                   containerStyle={{flex: 1}}/>
                    </View>

                    <View style={{flexDirection:'row'}}>
                        <FormLabel style={{color: '#fff'}}>Address 1</FormLabel>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <FormInput maxLength={40} value={this.state.addressLine1}
                                   onChangeText={(text) => this.addressLine1 = text}
                                   containerStyle={ styles.formInputs }/>
                    </View>

                    <View style={{flexDirection:'row', alignSelf: 'flex-start'}}>
                        <View style={{flex: 0.5}}>
                            <View style={{flexDirection:'row', alignSelf: 'flex-start'}}>
                                <FormLabel style={{color: '#fff'}}>City</FormLabel>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <FormInput maxLength={15} value={this.state.city}
                                           onChangeText={(text) => this.city = text}
                                           containerStyle={ styles.formInputs }/>
                            </View>
                        </View>
                        <View style={{flex: 0.5}}>
                            <View style={{flexDirection:'row', alignSelf: 'flex-start'}}>
                                <FormLabel style={{color: '#fff'}}>State</FormLabel>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <FormInput maxLength={2} value={this.state.addressState}
                                           onChangeText={(text) => this.addressState = text}
                                           containerStyle={ styles.formInputs }/>
                            </View>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', alignSelf: 'flex-start'}}>
                        <FormLabel style={{color: '#fff'}}>Zip</FormLabel>
                    </View>
                    <View style={{flexDirection:'row', marginBottom: 20}}>
                        <FormInput maxLength={5} value={this.state.zip} onChangeText={(text) => this.zip = text}
                                   containerStyle={ styles.formInputs }/>
                    </View>

                    <View style={{marginTop: 40, marginBottom: 20, alignItems: 'center'}}>

                        <ButtonComponent
                            text="Update Party"
                            type="primary"
                            shape="rectangle"
                            backgroundColors={['#ec2227', '#ec2227']}
                            gradientStart={{ x: 10, y: 10 }}
                            gradientEnd={{ x: 10, y: 10 }}
                            height={50}
                            width={250}
                            flex={1.0}
                            onPress={ () => this.updateParty(this) }
                            >
                        </ButtonComponent>
                    </View>

                </View>

            </View>

        );
    }
}

export default EditPartyDetailsPage;

const styles = StyleSheet.create({
    formInputs: {
        flex: 1
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
    }
});


