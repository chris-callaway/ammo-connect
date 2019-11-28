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
import TableView from 'react-native-tableview';
const { Section, Item } = TableView;

class SearchResultsScreen extends React.Component<Props> {

    constructor(props) {
        super(props);
    }

    state = {
        loading: false,
        searchResults: []
    };

    componentDidMount() {
        var self = this;
        this.props.navigation.addListener(
            'willFocus',
            () => {
                this.setState({loading: true});
                var searchResults = this.props.navigation.getParam('searchResults', null);
                console.log('searchResults is', searchResults);
                this.setState({searchResults: searchResults, loading: false});
            }
        );
    }

    goToPage = (page, params) => {
        this.props.navigation.navigate(page, params);
    };

    openUrl = (url) => {

    };

    render() {
        const animating = this.state.animating;
        if (!this.state.searchResults) {
            this.setState({searchResults: []});
        }
        return (

            <View style={{ flex: 1 }}>
                <TableView reactModuleForCell="CustomTableCell"
                           style={{ flex: 1 }}>


                    <Section>
                        {this.state.searchResults.map(item =>

                                <Item onPress={event => this.openUrl()}
                                      style={styles.tableCell}
                                      manufacturer={item.manufacturer}
                                      retailer={item.retailer}
                                      type={item.type}
                                      caliber={item.caliber} height="110"
                                      rounds={item.rounds} latitude={item.latitude} longitude={item.longitude}
                                      casing={item.casing} price={item.price} id={item.id}
                                      key={item.id}></Item>
                        )}

                    </Section>
                </TableView>
            </View>

        );
    }
}

export default SearchResultsScreen;

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


