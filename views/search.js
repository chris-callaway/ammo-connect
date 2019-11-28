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


class SearchScreen extends React.Component {

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
                    console.log('finished all promises');
                    this.setState({loading: false});
                });
            }
        );
    }

    getListItem = async (property) => {
        var self = this;
        console.log('getting list item', property);
        var obj = {
            Method: 'query',
            Module: 'Database',
            params: {
                query: 'SELECT DISTINCT ' + property + ' FROM entries WHERE ' + property + ' IS NOT NULL AND ' + property + ' != ""'
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

    performSearch = () => {
        var self = this;
        self.setState({loading: true});
        var query = 'SELECT * FROM entries';
        var joined = false;
        if (this.state.manufacturerSelected && this.state.manufacturerSelected != 'All') {
            joined = true;
        }
        if (this.state.manufacturerSelected && this.state.manufacturerSelected != 'All') {
            query += ' WHERE manufacturer = "' + this.state.manufacturerSelected + '"';
        }

        if (this.state.retailerSelected && this.state.retailerSelected != 'All') {
            if (joined) {
                query += ' AND ';
            } else {
                joined = true;
                query += ' WHERE ';
            }
            query += 'retailer = "' + this.state.retailerSelected + '"';
        }

        if (this.state.caliberSelected && this.state.caliberSelected != 'All') {
            if (joined) {
                query += ' AND ';
            } else {
                joined = true;
                query += ' WHERE ';
            }
            query += 'caliber = "' + this.state.caliberSelected + '"';
        }

        if (this.state.typeSelected && this.state.typeSelected != 'All') {
            if (joined) {
                query += ' AND ';
            } else {
                joined = true;
                query += ' WHERE ';
            }
            query += 'type = "' + this.state.typeSelected + '"';
        }

        if (this.state.roundsSelected && this.state.roundsSelected != 'All') {
            if (joined) {
                query += 'AND ';
            } else {
                joined = true;
                query += ' WHERE ';
            }
            query += 'rounds = "' + this.state.roundsSelected + '"';
        }

        if (this.state.casingSelected && this.state.casingSelected != 'All') {
            if (joined) {
                query += ' AND ';
            } else {
                joined = true;
                query += ' WHERE ';
            }
            query += 'casing = "' + this.state.casingSelected + '"';
        }

        console.log('performing query', query);
        var obj = {
            Method: 'query',
            Module: 'Database',
            params: {
                query: query + ' LIMIT 20'
            }
        };

        console.log('query is', query);

        return Helper.apiFetch(obj).then(function (json) {
            console.log('response', json);
            self.setState({loading: false});
            self.goToPage('SearchResults', {searchResults: json});
        });
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

                        <View style={{flexDirection:'row', marginTop: 30, marginTop: 40 }}>
                            <ButtonComponent
                                text="Search"
                                type="primary"
                                shape="rectangle"
                                backgroundColors={['#cc0607', '#cc0607']}
                                gradientStart={{ x: 10, y: 10 }}
                                gradientEnd={{ x: 10, y: 10 }}
                                height={60}
                                width={'90%'}
                                flex={1.0}
                                color="#2658db"
                                onPress={ () => this.performSearch() }
                                textStyle={{ color: "#ffffff", fontSize: 16, letterSpacing: 0, textTransform:'uppercase' }}
                                >
                            </ButtonComponent>
                        </View>

                    </View>
                    <View style={{height: 40}}></View>

                </ScrollView>

            </KeyboardAwareScrollView>

        );
    }
}

export default SearchScreen;

const styles = StyleSheet.create({
    formInputs: {
        width: 400
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
        height: 40,
        width:400
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


