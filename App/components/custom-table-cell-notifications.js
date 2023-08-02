import React, { Component } from 'react';
import { AsyncStorage, ActivityIndicator, Platform, Alert, AlertIOS, Image, Button, StyleSheet, View, TouchableHighlight, TextInput, ListView } from 'react-native';
import { Container, Content, Text, StyleProvider } from 'native-base';
import InlineImage from './inline-image.js'

class CustomTableCellNotificationsList extends React.Component<Props> {

    constructor(props) {
        super(props);
    }

    render() {
        var style = {
            borderColor: 'purple',
            height: 140,
            paddingLeft: 10,
            paddingTop: 10
        };

        // Fill the full native table cell height.
        style.flex = 1;

        // All Item props get passed to this cell inside this.props.data. Use them to control the rendering, for example background color:
        if (this.props.data.backgroundColor !== undefined) {
            style.backgroundColor = this.props.data.backgroundColor
        }

        // parse int
        //this.props.data.rating = parseInt(this.props.data.rating);
        //
        //var ratings = [];
        //for (var i = 0; i < this.props.data.rating; i++) {
        //    ratings.push(<Image source={require('./../img/lit.png')}
        //                        style={{width: 20, height: 20}}/>);
        //}

        return (
            <View style={style}>
                <View style={{flexDirection: 'row', position: 'absolute', right: 10, top: 10}}>

                </View>
                <View>
                    <Text style={styles.tableText}>{this.props.data.manufacturer}</Text>
                </View>
                <View>
                    <Text style={styles.tableText}>{this.props.data.caliber}</Text>

                </View>
                <View>
                    <Text
                        style={styles.tableText}>Type: {this.props.data.type} | Rounds: {this.props.data.rounds} |
                        Casing: {this.props.data.casing}</Text>
                </View>
                <View style={{ opacity: 0, height: 15}}/>
                {
                    //    <View>
                    //    <Text style={styles.tableText}>Start: {this.props.data.startDate}</Text>
                    //</View>
                    //<View>
                    //    <Text style={styles.tableText}>End: {this.props.data.endDate}</Text>
                    //</View>
                }


                <View style={{ opacity: 0, height: 15}}/>
                <View style={{position: 'absolute', right: 10, bottom: 10}}>
                    <View style={{position: 'absolute', right: 0, bottom: 20}}>
                        <Text>${this.props.data.price}</Text>
                    </View>

                    <Text style={styles.tableText}>Retailer: {this.props.data.retailer}</Text>
                </View>

            </View>

        )
    }
}

export default CustomTableCellNotificationsList;


const styles = StyleSheet.create({
    cellView: {
        flex: 1
    },
    buttons: {
        flexDirection: 'row',
        backgroundColor: '#ec2227',
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
    tableText: {
        fontSize: 12
    }
});
