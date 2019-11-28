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
// import TableView from 'react-native-tableview';
// const { Section, Item } = TableView;

class AddPriceUpdateScreen extends React.Component{

    constructor(props) {
        super(props);
    }

    state = {
        loading: false,
        manufacturer: [],
        retailer: [],
        caliber: [],
        type: [],
        rounds: [],
        casing: [],
        deviceId: '',
        manufacturerSelected: '',
        retailerSelected: '',
        caliberSelected: '',
        typeSelected: '',
        roundsSelected: '',
        casingSelected: ''
    };

    componentDidMount() {
        var self = this;
        this.props.navigation.addListener(
            'willFocus',
            () => {
                this.setState({loading: true});
                var prom = [];
                prom.push(this.getListItem('manufacturer'));
                prom.push(this.getListItem('retailer'));
                prom.push(this.getListItem('caliber'));
                prom.push(this.getListItem('type'));
                prom.push(this.getListItem('rounds'));
                prom.push(this.getListItem('casing'));
                Promise.all(prom).then((result) => {
                    this.setState({loading: false});
                });
            }
        );
    }

    getListItem = async (property) => {
        var self = this;
        var obj = {
            Method: 'query',
            Module: 'Database',
            params: {
                query: 'SELECT DISTINCT ' + property + ' FROM entries'
            }
        };

        return await Helper.apiFetch(obj).then(function (json) {
            let list = json.map((item, i) => {
                return {value: item[property], label: item[property], key: i}
            });
            var item = {};
            item[property] = [{
                value: 'All',
                label: 'All',
                key: 'None'
            }].concat(list);
            self.setState(item);
        });

    };

    goToPage = (page, params) => {
        this.props.navigation.navigate(page, params);
    };

    saveNotification = async () => {
        var self = this;
        this.setState({loading: true});
        var deviceId = Helper.getdeviceId();
        var item = {
            uuid: deviceId,
            manufacturer: this.state.manufacturerSelected ? this.state.manufacturerSelected : 'All',
            caliber: this.state.caliberSelected ? this.state.caliberSelected : 'All',
            retailer: this.state.retailerSelected ? this.state.retailerSelected : 'All',
            type: this.state.typeSelected ? this.state.typeSelected : 'All',
            rounds: this.state.roundsSelected ? this.state.roundsSelected : 'All',
            casing: this.state.casingSelected ? this.state.casingSelected : 'All'
        };
        console.log('item', item);
        var obj = {
            Method: 'insert',
            Module: 'Database',
            params: {
                table: 'notifications',
                obj: item
            }
        };

        return await Helper.apiFetch(obj).then(function (json) {
            console.log('Saved');
            self.setState({loading: false});
            self.goToPage('PriceUpdates');
        });
    };

    openUrl = (url) => {

    };

    render() {
        const animating = this.state.animating;
        return (

            <KeyboardAwareScrollView style={{backgroundColor: '#fff'}}>

                <ScrollView
                    contentContainerStyle={{ flex: 1, alignItems: 'center', marginTop: 20, backgroundColor: '#fff', justifyContent: 'center'}}>

                    {this.state.loading &&
                    <View style={styles.loading}>
                        <ActivityIndicator size='large'/>
                    </View>
                    }

                    <View style={{ alignItems:'center', textAlign:'left', width:'100%' }}>

                       {/* <View style={{flexDirection:'row',textAlign: 'left', width:'100%'}}>
                            <FormLabel labelStyle={{color:'#000000',  width:'100%'}}>Select
                                Manufacturers</FormLabel>
                        </View> */}

                        <View style={{flexDirection:'row',textAlign: 'left', width:'90%', borderBottomWidth:1, borderBottomColor:'#f1f1f1'}}>

                            <RNPickerSelect
                                
                                placeholder={{label: 'Select Manufacturers'}}
                                items={this.state.manufacturer}
                                onValueChange={value => {
                                    this.setState({
                                      manufacturerSelected: value
                                    });
                                  }}
                                style={{
                                    placeholder: {
                                        top: 20,
                                        color: '#000',
                                        flexDirection:'row',
                                    },
                                    inputAndroid: {
                                      backgroundColor: 'transparent',
                                      width:370,
                                      color:'#777777',
                                      top: 20
                                    },
                                    inputIOS: {
                                        top: 20
                                    },
                                    inputIOSContainer: {
                                        height: 60
                                    },
                                    iconContainer: {
                                      top: 5,
                                      right: 15
                                    },
                                    viewContainer: {
                                        height: 60,
                                        flex: 1
                                    }
                                  }}
                                value={this.state.manufacturerSelected}
                                useNativeAndroidPickerStyle={false}
                                textInputProps={{ }}
                                
                                />

                        
                                
                        </View>
                        <View style={{ textAlign: 'right', alignSelf: 'flex-end', paddingEnd:25 }}>
                        {
                            <Image source={require('./../img/arrow.png')}
                                  style={{resizeMode: 'contain', width: 20, height: 20, textAlign: 'right', marginTop:-36}}/>
                        }
                       
                        </View>
                        

                        {/* <View style={{flexDirection:'row',extAlign: 'left', width:'100%', marginTop:10}}>
                            <FormLabel labelStyle={{color:'#000000',  width:'100%' }}>Select Retailer</FormLabel>
                        </View> */}

                        <View style={{flexDirection:'row',textAlign: 'left', width:'90%', borderBottomWidth:1, borderBottomColor:'#f1f1f1'}}>
                            <RNPickerSelect
                                placeholder={{label: 'Select Retailer'}}
                                items={this.state.retailer}
                                onValueChange={value => {
                                    this.setState({
                                      retailerSelected: value
                                    });
                                  }}
                                style={{
                                    placeholder: {
                                        top: 20,
                                        color: '#000',
                                        flexDirection:'row',
                                    },
                                    inputAndroid: {
                                        backgroundColor: 'transparent',
                                        width:370,
                                        color:'#777777',
                                        top: 20
                                    },
                                    inputIOS: {
                                        top: 20
                                    },
                                    inputIOSContainer: {
                                        height: 60
                                    },
                                    iconContainer: {
                                      top: 5,
                                      right: 15
                                    },
                                    viewContainer: {
                                        height: 60,
                                        flex: 1
                                    }
                                  }}
                                value={this.state.retailerSelected}
                                useNativeAndroidPickerStyle={false}
                                
                                />
                        </View>
                        <View style={{ textAlign: 'right', alignSelf: 'flex-end', paddingEnd:25 }}>
                        {
                            <Image source={require('./../img/arrow.png')}
                                  style={{resizeMode: 'contain', width: 20, height: 20, textAlign: 'right', marginTop:-36}}/>
                        }
                       
                        </View>

                       {/* <View style={{flexDirection:'row',extAlign: 'left', width:'100%', marginTop:10}}>
                            <FormLabel labelStyle={{color:'#000000',  width:'100%' }}>Select Caliber</FormLabel>
                        </View> */}

                        <View style={{textAlign: 'left', width:'90%', borderBottomWidth:1, borderBottomColor:'#f1f1f1'}}>
                            <RNPickerSelect
                                placeholder={{label: 'Select Caliber'}}
                                items={this.state.caliber}
                                onValueChange={value => {
                                    this.setState({
                                      caliberSelected: value
                                    });
                                  }}
                                style={{
                                    placeholder: {
                                        top: 20,
                                        color: '#000',
                                        flexDirection:'row',
                                    },
                                    inputAndroid: {
                                        backgroundColor: 'transparent',
                                        width:370,
                                        color:'#777777',
                                        top: 20
                                    },
                                    inputIOS: {
                                        top: 20
                                    },
                                    inputIOSContainer: {
                                        height: 60
                                    },
                                    iconContainer: {
                                      top: 5,
                                      right: 15
                                    },
                                    viewContainer: {
                                        height: 60,
                                        flex: 1
                                    }
                                  }}
                                value={this.state.caliberSelected}
                                useNativeAndroidPickerStyle={false}
                                
                                />
                        </View>
                        <View style={{ textAlign: 'right', alignSelf: 'flex-end', paddingEnd:25 }}>
                        {
                            <Image source={require('./../img/arrow.png')}
                                  style={{resizeMode: 'contain', width: 20, height: 20, textAlign: 'right', marginTop:-36}}/>
                        }
                       
                        </View>

                       {/* <View style={{flexDirection:'row',textAlign: 'left', width:'100%', marginTop:10}}>
                            <FormLabel labelStyle={{color:'#000000',  width:'100%' }}>Select Type</FormLabel>
                        </View> */}

                        <View style={{flexDirection:'row',textAlign: 'left', width:'90%', borderBottomWidth:1, borderBottomColor:'#f1f1f1'}}>
                            <RNPickerSelect
                                placeholder={{
                                    label: 'Select Type',
                                    value: null,
                                }}
                                items={this.state.type}
                                onValueChange={value => {
                                    this.setState({
                                      typeSelected: value
                                    });
                                  }}
                                style={{
                                    placeholder: {
                                        top: 20,
                                        color: '#000',
                                        flexDirection:'row',
                                    },
                                    inputAndroid: {
                                        backgroundColor: 'transparent',
                                        width:370,
                                        color:'#777777',
                                        top: 20
                                    },
                                    inputIOS: {
                                        top: 20
                                    },
                                    inputIOSContainer: {
                                        height: 60
                                    },
                                    iconContainer: {
                                      top: 5,
                                      right: 15
                                    },
                                    viewContainer: {
                                        height: 60,
                                        flex: 1
                                    }
                                  }}
                                value={this.state.typeSelected}
                                useNativeAndroidPickerStyle={false}
                                
                                />
                        </View>
                        <View style={{ textAlign: 'right', alignSelf: 'flex-end', paddingEnd:25 }}>
                        {
                            <Image source={require('./../img/arrow.png')}
                                  style={{resizeMode: 'contain', width: 20, height: 20, textAlign: 'right', marginTop:-36}}/>
                        }
                       
                        </View>

                        <View style={{flexDirection:'row',textAlign: 'left', width:'90%', borderBottomWidth:1, borderBottomColor:'#f1f1f1'}}>
                            <RNPickerSelect
                                placeholder={{label: 'Select Rounds', value: null}}
                                items={this.state.rounds}
                                onValueChange={value => {
                                    this.setState({
                                      roundsSelected: value
                                    });
                                  }}
                                style={{
                                    placeholder: {
                                        top: 20,
                                        color: '#000',
                                        flexDirection:'row',
                                    },
                                    inputAndroid: {
                                        backgroundColor: 'transparent',
                                        width:370,
                                        color:'#777777',
                                        top: 20
                                    },
                                    inputIOS: {
                                        top: 20
                                    },
                                    inputIOSContainer: {
                                        height: 60
                                    },
                                    iconContainer: {
                                      top: 5,
                                      right: 15
                                    },
                                    viewContainer: {
                                        height: 60,
                                        flex: 1
                                    }
                                  }}
                                value={this.state.roundsSelected}
                                useNativeAndroidPickerStyle={false}
                                
                                />
                        </View>
                        <View style={{ textAlign: 'right', alignSelf: 'flex-end', paddingEnd:25 }}>
                        {
                            <Image source={require('./../img/arrow.png')}
                                  style={{resizeMode: 'contain', width: 20, height: 20, textAlign: 'right', marginTop:-36}}/>
                        }
                       
                        </View>

                        <View style={{flexDirection:'row',textAlign: 'left', width:'90%', borderBottomWidth:1, borderBottomColor:'#f1f1f1'}}>
                            <RNPickerSelect
                               
                                placeholder={{label: 'Select Casing'}}
                                items={this.state.casing}
                                onValueChange={value => {
                                    this.setState({
                                      casingSelected: value
                                    });
                                  }}
                                style={{
                                    placeholder: {
                                        top: 20,
                                        color: '#000',
                                        flexDirection:'row',
                                    },
                                    inputAndroid: {
                                        backgroundColor: 'transparent',
                                        width:370,
                                        color:'#777777',
                                        top: 20
                                    },
                                    inputIOS: {
                                        top: 20
                                    },
                                    inputIOSContainer: {
                                        height: 60
                                    },
                                    iconContainer: {
                                      top: 5,
                                      right: 15
                                    },
                                    viewContainer: {
                                        height: 60,
                                        flex: 1
                                    }
                                  }}
                                value={this.state.casingSelected}
                                useNativeAndroidPickerStyle={false}
                                
                                />
                        </View>
                        <View style={{ textAlign: 'right', alignSelf: 'flex-end', paddingEnd:25 }}>
                        {
                            <Image source={require('./../img/arrow.png')}
                                  style={{resizeMode: 'contain', width: 20, height: 20, textAlign: 'right', marginTop:-36}}/>
                        }
                       
                        </View>

                        <View style={{flexDirection:'row', marginTop: 40}}>
                            <ButtonComponent
                                text="Save"
                                type="primary"
                                shape="rectangle"
                                backgroundColors={['#ec2227', '#ec2227']}
                                gradientStart={{ x: 10, y: 10 }}
                                gradientEnd={{ x: 10, y: 10 }}
                                height={50}
                                width={250}
                                flex={1.0}
                                color="#2658db"
                                onPress={ () => this.saveNotification() }
                                //textStyle={{color: '#2658db'}}
                                >
                            </ButtonComponent>
                        </View>

                    </View>

                </ScrollView>

            </KeyboardAwareScrollView>

        );
    }
}

export default AddPriceUpdateScreen;

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


