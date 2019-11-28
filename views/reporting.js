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
import ToggleSwitch from 'toggle-switch-react-native';

class ReportingPage extends React.Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    componentDidMount() {
        this.setState({loadingUser: true});
        this.props.navigation.setParams({
            title: 'Reporting',
            headerRight: ''
        });
        Helper.getUserId(null, true).then(user => {
            console.log('have user', user);
            this.setState({
                userId: user[0].id,
                loadingUser: false,
                email: user[0].email,
                password: user[0].password,
                profile_img: user[0].profile_img,
                loading: false,
                username: 'Enter a username',
                filterExplicit: false
            });
        });
    }

;

    goToPage = (page, params) => {
        this.props.navigation.navigate(page, params);
    };

    sendBlock = (ref) => {
        var self = ref;
        var username = self.blockUser;
        this.setState({loading: true});
        Helper.getUserId(null, true).then(user => {
            var obj = {
                Method: 'insert',
                Module: 'Database',
                params: {
                    table: 'Blocked',
                    obj: {
                        user_id: user[0].id,
                        blocked_username: username
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
                console.log('response is', response);
                self.setState({loading: false});
                Helper.alertHandler('User Blocked');
            }).catch((err) => {
                Helper.alertHandler('Save failed.  Please try again later.');
            });
        });
    };

    updateFilter = (type, ref) => {
        var self = ref;
        var filter = 'filter' + type;
        var filterValue = ref.state.filterExplicit ? 1 : 0;
        this.setState({filterExplicit: !ref.state.filterExplicit});
        var obj = {
            Method: 'update',
            Module: 'Database',
            params: {
                table: 'Users',
                'setAll': {filter_explicit: filterValue},
                id: parseInt(this.state.userId)
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
            console.log('SAVE RESPONSE', response);
            this.setState({loading: false});
            if (response.status == 200) {
                //
            } else {
                Helper.alertHandler('Save failed.  Please try again later.');
            }
            return response;
        })
    };

    sendReport = (ref) => {
        var self = ref;
        this.setState({loading: true});
        var username = self.reportUser;
        var obj = {
            Method: 'insert',
            Module: 'Database',
            params: {
                table: 'Reporting',
                obj: {
                    username: username
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
            console.log('response is', response);
            self.setState({loading: false});
            Helper.alertHandler('User Blocked');
        }).catch((err) => {
            Helper.alertHandler('Save failed.  Please try again later.');
        });
    };

    render() {
        return (

            <ScrollView
                contentContainerStyle={{flex: 1,  alignItems: 'center', backgroundColor: '#fff'}}>

                {(this.state.loading || this.state.loadingUser) &&
                <View style={styles.loading}>
                    <ActivityIndicator size='large'/>
                </View>
                }

                {!this.state.loadingUser && !this.state.loading &&

                <View style={{ marginTop: 20}}>

                    <View style={{flexDirection:'row', alignSelf: 'flex-start'}}>
                        <View style={{flex: 0.7}}>
                            <View style={{flexDirection:'row', alignSelf: 'flex-start'}}>
                                <FormLabel style={{color: '#fff'}}>Report User</FormLabel>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <FormInput placeholder="Enter username" maxLength={15} value={this.state.reportUser}
                                           onChangeText={(text) => this.reportUser = text}
                                           containerStyle={ styles.formInputs }/>
                            </View>
                        </View>
                        <View style={{flex: 0.3}}>
                            <View style={{flexDirection:'row', alignSelf: 'flex-start'}}>
                                <FormLabel style={{color: '#fff'}}></FormLabel>
                            </View>
                            <View style={{flexDirection:'row', alignSelf: 'flex-start'}}>
                                <ButtonComponent
                                    text="Send"
                                    type="primary"
                                    shape="rectangle"
                                    backgroundColors={['#ec2227', '#ec2227']}
                                    gradientStart={{ x: 10, y: 10 }}
                                    gradientEnd={{ x: 10, y: 10 }}
                                    height={40}
                                    width={95}
                                    flex={1.0}
                                    onPress={ () => this.sendReport(this) }
                                    >
                                </ButtonComponent>
                            </View>
                        </View>
                    </View>


                    < View style={{ marginTop: 20, marginBottom: 40}}>

                        <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
                            <View style={{flex: 0.7}}>
                                <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
                                    <FormLabel style={{color: '#fff'}}>Block User</FormLabel>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <FormInput placeholder="Enter username" maxLength={15} value={this.state.blockUser}
                                               onChangeText={(text) => this.blockUser = text}
                                               containerStyle={ styles.formInputs }/>
                                </View>
                            </View>
                            <View style={{flex: 0.3}}>
                                <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
                                    <FormLabel style={{color: '#fff'}}></FormLabel>
                                </View>
                                <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
                                    <ButtonComponent
                                        text="Save"
                                        type="primary"
                                        shape="rectangle"
                                        backgroundColors={['#ec2227', '#ec2227']}
                                        gradientStart={{x: 10, y: 10}}
                                        gradientEnd={{x: 10, y: 10}}
                                        height={40}
                                        width={95}
                                        flex={1.0}
                                        onPress={ () => this.sendBlock(this) }
                                        >
                                    </ButtonComponent>
                                </View>
                            </View>
                        </View>

                        <View style={{ marginTop: 20, marginBottom: 40}}>

                            <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
                                <View style={{flex: 0.7}}>
                                    <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
                                        <FormLabel style={{color: '#fff'}}>Block Explicit Content</FormLabel>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                    </View>
                                </View>
                            </View>

                            <View style={{flexDirection:'row', alignSelf: 'flex-start'}}>
                                <FormLabel style={{color: '#fff'}}></FormLabel>
                            </View>
                            <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
                                <View
                                    style={{flex: 0.7, flexDirection: 'row', alignSelf: 'flex-start', marginLeft: 20}}>
                                    <ToggleSwitch
                                        isOn={this.state.filterExplicit}
                                        onColor='green'
                                        offColor='red'
                                        label=''
                                        size='large'
                                        onToggle={ (isOn) => this.updateFilter('explicit', this) }
                                        />

                                </View>
                            </View>

                        </View>
                    </View>
                </View>
                }

            </ScrollView>

        );
    }
}

export default ReportingPage;

const styles = StyleSheet.create({
    inputsContainer: {
        flex: 1
    },
    fullWidthButton: {
        backgroundColor: '#ec2227',
        height: 70,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    fullWidthButtonText: {
        fontSize: 24,
        color: 'white'
    },
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


