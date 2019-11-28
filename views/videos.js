import React, { Component } from 'react';
import { Dimensions, ActionSheetIOS, ActivityIndicator, Platform, Alert, AlertIOS, Image, Button, StyleSheet, View, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, TextInput, ListView, PickerIOS } from 'react-native';
import { Container, Content, Text, StyleProvider } from 'native-base';
import { Icon, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component';
// import TableView from 'react-native-tableview';
// const { Section } = TableView;
import moment from 'moment/min/moment-with-locales.min';
import Video from 'react-native-video';
import Helper from '../helper';
import {
    UltraPickerIOS,
    UltraPickerIOSCloseBar,
    Group,
    Item
} from "react-native-ultra-picker-ios"

class VideosPage extends React.Component<Props> {

    constructor(props) {
        super(props);
        this.videos = this.getVideos();
        this.state = {
            loading: false,
            videos: [],
            player: null,
            currentVideo: '',
            ratings: [{value: '1', 'label': '1'}, {value: '2', label: '2'}],
            showingPicker: true
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({
            title: 'Videos'
        });

    }

    _selectRating(rating) {
        console.log('Selected rating');
    }

    rateParty = (event) => {
        console.log('rating party');
        var partyId = this.props.navigation.getParam('id', null);

        ActionSheetIOS.showActionSheetWithOptions({
                options: ['Cancel', '1', '2', '3', '4', '5'],
                //destructiveButtonIndex: 1,
                cancelButtonIndex: 0
            },
            (buttonIndex) => {
                var rating = buttonIndex;
                if (rating !== 0) {
                    this.setState({loading: true});
                    console.log('button index', buttonIndex);
                    Helper.getUser().then(user => {
                        Helper.getUserId(user.username).then(response => {
                            response.json().then((json) => {
                                var userId = json[0].id;
                                var partyObj = {
                                    party_id: partyId,
                                    user_id: userId,
                                    rating: rating
                                };

                                // determine if already saved
                                var query = 'SELECT id, user_id FROM Ratings WHERE party_id = "' + partyId + '" AND user_id = "' + userId + '"';
                                var searchObj = {
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
                                    body: JSON.stringify(searchObj)
                                }).then((response) => {
                                    response.json().then((json) => {
                                        try {
                                            if (json && json.length > 0) {
                                                console.log('found rating', json[0].id, partyObj.rating);

                                                fetch('http://192.169.217.115:7099/partyfinder/', {
                                                    method: 'POST',
                                                    headers: {
                                                        Authorization: 'Basic c2F1bUBhbHR1c2pvYnMuY29tOkJpbGxpb25zNDAh',
                                                        Accept: 'application/json',
                                                        'Content-Type': 'application/json'
                                                    },
                                                    body: JSON.stringify({
                                                        Method: 'update',
                                                        Module: 'Database',
                                                        params: {
                                                            table: 'Ratings',
                                                            'setAll': partyObj,
                                                            id: json[0].id
                                                        }
                                                    })
                                                }).then((response) => {
                                                    Helper.alertHandler('Rating updated');
                                                    console.log('update response', response);
                                                    // saved rating
                                                    this.setState({loading: false});
                                                }).catch((err) => {
                                                    Helper.alertHandler('Rating save failed');
                                                    this.setState({loading: false});
                                                    console.log('Failed', err);
                                                })

                                            } else {
                                                // save new entry
                                                var obj = {
                                                    Method: 'insert',
                                                    Module: 'Database',
                                                    params: {
                                                        table: 'Ratings',
                                                        obj: partyObj
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
                                                    // saved rating
                                                    this.setState({loading: false});
                                                    Helper.alertHandler('Rating saved');
                                                }).catch((err) => {
                                                    this.setState({loading: false});
                                                    Helper.alertHandler('Rating save failed');
                                                });
                                            }
                                        } catch (e) {
                                            Helper.alertHandler(e);
                                        }
                                    }).catch((err) => {
                                        Helper.alertHandler(JSON.stringify(err));
                                        this.setState({loading: false});
                                    });
                                }).catch((err) => {
                                    this.setState({loading: false});
                                    Helper.alertHandler('Rating save failed');
                                });
                            }).catch((err) => {
                                this.setState({loading: false});
                                Helper.alertHandler('Rating save failed');
                            });
                        }).catch((err) => {
                            this.setState({loading: false});
                            Helper.alertHandler('Rating save failed');
                        });
                    }).catch((err) => {
                        this.setState({loading: false});
                        Helper.alertHandler('Rating save failed');
                    });
                }
            });
    };

    async getVideos() {
        var partyId = this.props.navigation.getParam('id', null);
        console.log('next screen catch party id', partyId);
        this.setState({loading: true});
        var query = 'SELECT * FROM Videos WHERE party_id = "' + partyId + '"';
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

            response.json().then((json) => {
                if (json) {
                    console.log('received videos', json);
                    if (json.length == 0) {
                        this.setState({loading: false});
                    }
                    this.setState({loading: false, videos: json, currentVideo: json[0].path, videoIndex: 0});
                    return json;
                }
            }).catch((err) => {
                console.log('Could not find any parties at this time');
            });
        });

    }

;

    cycleVideo = () => {
        var nextIndex;
        if (this.state.videoIndex == this.state.videos.length - 1) { // restart cycle
            nextIndex = this.state.videoIndex = 0;
        } else {
            nextIndex = this.state.videoIndex + 1;
        }
        if (nextIndex <= this.state.videos.length && nextIndex !== 0) {
            this.setState({currentVideo: this.state.videos[nextIndex].path, videoIndex: nextIndex});
        } else if (nextIndex !== 0) {
            this.setState({currentVideo: this.state.videos[0].path, videoIndex: 0});
        } else {
            // restart video
            this.setState({isVideoPaused: true, currentVideo: this.state.videos[0].path, videoIndex: 0});
            this.player.seek(0);
        }
    };

    onVideoEnd = () => {
        cycleVideo();
    };

    pickerOpen = () => {
        console.log('opening');
        this.setState({showingPicker: true});
    }

    pickerClosed = () => {
        this.setState({showingPicker: false});
    }

    pickerChanged(result) {
        console.log(JSON.stringify(result.nativeEvent));
    }

    render() {
        let items = [{
            label: 'Banana',
            value: 'Banana',
        }, {
            label: 'Mango',
            value: 'Mango',
        }, {
            label: 'Pear',
            value: 'Pear',
        }];

        const animating = this.state.animating;
        var partyId = this.props.navigation.getParam('id', null);
        if (!this.state.currentVideo && !this.state.videos) {
            return (
                <View style={{ flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{ color: '#fff' }}>Fetching Videos...</Text>
                </View>
            )
        } else if (this.state.videos && this.state.videos.length == 0) {
            return (
                <View
                    style={{ flex: 1.0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000'}}>

                    {this.state.loading &&
                    <View style={styles.loading}>
                        <ActivityIndicator size='large'/>
                    </View>
                    }

                    <View
                        style={{position: 'absolute', zIndex:9, bottom: 0, height: 50, flexDirection: 'row', backgroundColor: '#FFF'}}>

                        <View>
                            <ButtonComponent
                                text="Rate This Party"
                                type="primary"
                                shape="rectangle"
                                backgroundColors={['#ec2227', '#ec2227']}
                                gradientStart={{ x: 10, y: 10 }}
                                gradientEnd={{ x: 10, y: 10 }}
                                height={50}
                                width={2000}
                                style={{flexDirection: 'row'}}
                                flex={1.0}
                                onPress={ () => this.rateParty() }>
                            </ButtonComponent>
                        </View>

                        <UltraPickerIOS testID={"UltraPickerView"} onChange={this.pickerChanged}
                                        style={[styles.ultraPicker, this.state.showingPicker ? {} : styles.hidden]}>
                            <UltraPickerIOSCloseBar buttonTestID={"UltraPickerCloseBarButton"} style={styles.closeBar}
                                                    onClose={this.pickerClosed}/>
                            <Group>
                                <Item label="1"/>
                                <Item label="2"/>
                                <Item label="3"/>
                                <Item label="4"/>
                                <Item label="5" selected={true}/>
                            </Group>
                        </UltraPickerIOS>

                    </View>

                    <Text style={{color: '#fff'}}>No Videos Found</Text>
                </View>
            )
        } else if (this.state.currentVideo) {
            return (

                <View
                    style={{ flex: 1.0, backgroundColor: '#000', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>

                    {this.state.loading &&
                    <View style={styles.loading}>
                        <ActivityIndicator size='large'/>
                    </View>
                    }

                    <View
                        style={{position: 'absolute', zIndex:9, bottom: 0, height: 50, flexDirection: 'row', backgroundColor: '#FFF'}}>

                        <View style={{backgroundColor: '#fff'}}>
                            <ButtonComponent
                                text="Rate This Party"
                                type="primary"
                                shape="rectangle"
                                backgroundColors={['#ec2227', '#ec2227']}
                                gradientStart={{ x: 10, y: 10 }}
                                gradientEnd={{ x: 10, y: 10 }}
                                height={50}
                                width={2000}
                                style={{flexDirection: 'row'}}
                                flex={1.0}
                                onPress={ () => this.rateParty() }>
                            </ButtonComponent>
                        </View>

                        <UltraPickerIOS testID={"UltraPickerView"} onChange={this.pickerChanged}
                                        style={[styles.ultraPicker, this.state.showingPicker ? {} : styles.hidden]}>
                            <UltraPickerIOSCloseBar buttonTestID={"UltraPickerCloseBarButton"}
                                                    style={styles.closeBar}
                                                    onClose={this.pickerClosed}/>
                            <Group>
                                <Item label="1"/>
                                <Item label="2"/>
                                <Item label="3"/>
                                <Item label="4"/>
                                <Item label="5" selected={true}/>
                            </Group>
                        </UltraPickerIOS>

                    </View>

                    <View style={{flex: 1.0}}>

                        <TouchableHighlight onPress={this.cycleVideo} underlayColor="white">

                            <Video
                                source={{uri: this.state.currentVideo}}   // Can be a URL or a local file.
                                ref={(ref) => {
                                this.player = ref
                            }}                                      // Store reference
                                onBuffer={this.onBuffer}                // Callback when remote video is buffering
                                onEnd={this.cycleVideo}
                                onLoad={()=>{

                            }}
                                resizeMode={"cover"}
                                style={{
                                width: Dimensions.get('window').width,
                                height: Dimensions.get('window').height,
                                minWidth: Dimensions.get('window').width,
                                minHeight: Dimensions.get('window').height,
                                //transform: [{ rotate: '90deg'}],
                                //position: 'absolute',
                                //top: 0,
                                //left: 0,
                                //bottom: 0,
                                //right: 0,
                            }}
                                />

                        </TouchableHighlight>


                        {

                            //<TableView reactModuleForCell="CustomTableCellVideo"
                            //           style={{ flex: 1 }} onPress={event => this.showMenu(event)}
                            //    >
                            //
                            //
                            //    <Section>
                            //        {this.state.videos.map(item =>
                            //
                            //                <Item style={styles.tableCell} name={item.name} address={item.addressLine1}
                            //                      city={item.city} height="150"
                            //                      endtime={item.end_time} latitude={item.latitude}
                            //                      longitude={item.longitude}
                            //                      startDate={item.start_date} startTime={item.start_time}
                            //                      state={item.state}
                            //                      username={item.username} zip={item.zip} rating={item.AVG}
                            //                      id={item.id}></Item>
                            //        )}
                            //
                            //    </Section>
                            //</TableView>
                        }
                    </View>


                </View>


            );

            this.player.presentFullscreenPlayer();
        }

    }


}

export default VideosPage;


const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
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
        justifyContent: 'center',
        zIndex: 9999
    },
    closeBar: {
        height: 44
    },
    ultraPicker: {
        height: 220,
        zIndex: 10
    },
    hidden: {
        width: 0,
        height: 0,
    }
});


