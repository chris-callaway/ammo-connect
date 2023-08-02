import React, { Component } from 'react';
import { DatePickerIOS, ActivityIndicator, Platform, Alert, AlertIOS, Image, Button, StyleSheet, View, ScrollView, TouchableHighlight, TextInput, ListView } from 'react-native';
import { Container, Content, Text, StyleProvider } from 'native-base';
import { createStackNavigator } from 'react-navigation';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment/min/moment-with-locales.min';
import Helper from '../helper';

class AddPartyPage extends React.Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({
            title: 'Add Party',
            headerRight: ''
        });
    }

;

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

    addParty = (ref) => {
        var self = ref;

        var party = {
            name: ref.name,
            description: ref.description,
            addressLine1: ref.addressLine1,
            zip: ref.zip,
            city: ref.city,
            state: ref.addressState,
            start_date: ref.state.startDate,
            end_date: ref.state.endDate,
        };
        var valid = this.validateForm(party);
        if (valid) {
            Helper.getUser().then(function (user) {
                console.log('user is', user);
                Helper.getUserId(user.username).then(response => {
                    console.log('returned response', response);
                    response.json().then((json) => {
                        var userId = json[0].id;
                        party.user_id = userId;
                        console.log('party obj', party);
                        self.setState({loading: true});
                        var obj = {
                            Method: 'insert',
                            Module: 'Database',
                            params: {
                                table: 'Parties',
                                obj: party
                            }
                        };

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
                            self.setState({loading: false});
                            Helper.alertHandler('Party saved');
                            self.goToPage('Main', {});
                        }).catch((err) => {
                            Helper.alertHandler('Save failed.  Please try again later.');
                        });
                    })
                });
            });

        } else {
            Helper.alertHandler(valid);
        }
    };

    createAccount = (email, username, password) => {
        var self = this;
        var valid = this.validateForm(email, username, password);

        if (valid) {
            this.setState({loading: true});
            var obj = {
                Method: 'createAccount',
                Module: 'Account',
                params: {
                    account: {
                        email: email,
                        username: username,
                        password: password
                    }
                }
            };

            fetch('http://192.169.217.115:7099/partyfinder/', {
                method: 'POST',
                headers: {
                    Authorization: 'Basic c2F1bUBhbHR1c2pvYnMuY29tOkJpbGxpb25zNDAh',
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            }).then((response) => {
                this.setState({loading: false});
                response.json().then((json) => {
                    self.setState({loading: false});
                    if (json && json.msg == 'User created successfully') {
                        Helper.alertHandler(json.msg);
                        self.goToPage('Home', {});
                    } else if (json.msg == 'Email is not valid') {
                        Helper.alertHandler(json.msg);
                    }
                }).catch((err) => {
                    Helper.alertHandler('Save failed.  Please try again later.');
                });
                return response;
            })
        }

    };

    render() {
        return (

            <ScrollView
                contentContainerStyle={{ alignItems: 'center', backgroundColor: '#fff'}}>

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
                        <FormInput maxLength={40} onChangeText={(text) => this.name = text}
                                   containerStyle={ styles.formInputs }/>
                    </View>

                    <View style={{flexDirection:'row', alignSelf: 'flex-start'}}>
                        <FormLabel style={{color: '#fff'}}>Description</FormLabel>
                    </View>

                    <View style={{flexDirection:'row'}}>
                        <FormInput maxLength={200} inputStyle={{ width: '100%'}} multiline
                                   onChangeText={(text) => this.description = text}
                                   containerStyle={ styles.formInputs }/>
                    </View>

                    <View style={{flexDirection:'row', alignSelf: 'flex-start'}}>
                        <FormLabel style={{color: '#fff'}}>Address 1</FormLabel>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <FormInput maxLength={40} onChangeText={(text) => this.addressLine1 = text}
                                   containerStyle={ styles.formInputs }/>
                    </View>

                    <View style={{flexDirection:'row', alignSelf: 'flex-start'}}>
                        <View style={{flex: 0.5}}>
                            <View style={{flexDirection:'row', alignSelf: 'flex-start'}}>
                                <FormLabel style={{color: '#fff'}}>City</FormLabel>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <FormInput maxLength={15} onChangeText={(text) => this.city = text}
                                           containerStyle={ styles.formInputs }/>
                            </View>
                        </View>
                        <View style={{flex: 0.5}}>
                            <View style={{flexDirection:'row', alignSelf: 'flex-start'}}>
                                <FormLabel style={{color: '#fff'}}>State</FormLabel>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <FormInput maxLength={2} onChangeText={(text) => this.addressState = text}
                                           containerStyle={ styles.formInputs }/>
                            </View>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', alignSelf: 'flex-start'}}>
                        <FormLabel style={{color: '#fff'}}>Zip</FormLabel>
                    </View>
                    <View style={{flexDirection:'row', marginBottom: 20}}>
                        <FormInput maxLength={5} onChangeText={(text) => this.zip = text}
                                   containerStyle={ styles.formInputs }/>
                    </View>

                    <View style={{flexDirection:'row', alignSelf: 'flex-start'}}>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <View
                                style={{flexDirection:'row', alignItems: 'center', marginBottom: 20}}>
                                <FormLabel style={{color: '#fff', alignItems: 'center'}}>When does the party
                                    start?</FormLabel>
                            </View>
                            <View style={{flexDirection:'row', alignSelf: 'flex-start'}}>
                                <DatePicker style={{flex: 1, alignSelf: 'flex-start', marginLeft: 20, marginRight: 20}}
                                            date={this.state.startDate}
                                            mode="datetime"
                                            placeholder="Select Date"
                                            format="MM/DD/YY hh:mm a"
                                            minDate="2016-05-01"
                                            maxDate="2019-06-01"
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            customStyles={{
                                              dateIcon: {
                                                position: 'absolute',
                                                left: 0,
                                                top: 4,
                                                marginLeft: 0
                                              },
                                              dateInput: {
                                                marginLeft: 36
                                              }
                                            }}
                                            onDateChange={(date) => {this.dateChanged(date, 'startDate')}}
                                    />
                            </View>
                        </View>

                    </View>

                    <View style={{flex: 1, alignItems: 'center'}}>
                        <View style={{flexDirection:'row', alignItems: 'center', marginBottom: 20}}>
                            <FormLabel style={{color: '#fff', alignItems: 'center'}}>When does the party
                                end?</FormLabel>
                        </View>
                        <View style={{flex: 1, flexDirection:'row', alignSelf: 'flex-start'}}>
                            <DatePicker style={{flex: 1, alignSelf: 'flex-start', marginLeft: 20, marginRight: 20}}
                                        date={this.state.endDate}
                                        mode="datetime"
                                        placeholder="Select Date"
                                        format="MM/DD/YY hh:mm a"
                                        minDate="2016-05-01"
                                        maxDate="2019-06-01"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        customStyles={{
                              dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                              },
                              dateInput: {
                                marginLeft: 36
                              },
                              btnTextConfirm: {
                                color: '#000'
                              }
                              // ... You can check the source to find the other keys.
                            }}
                                        onDateChange={(date) => {this.dateChanged(date, 'endDate')}}
                                />
                        </View>
                    </View>


                    <View style={{marginTop: 40, marginBottom: 20, alignItems: 'center'}}>

                        <ButtonComponent
                            text="Add Party"
                            type="primary"
                            shape="rectangle"
                            backgroundColors={['#ec2227', '#ec2227']}
                            gradientStart={{ x: 10, y: 10 }}
                            gradientEnd={{ x: 10, y: 10 }}
                            height={50}
                            width={250}
                            flex={1.0}
                            onPress={ () => this.addParty(this) }
                            >
                        </ButtonComponent>
                    </View>

                </View>

            </ScrollView>

        );
    }
}

export default AddPartyPage;

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


