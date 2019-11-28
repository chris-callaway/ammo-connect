import React, { Component } from 'react';
import {
    AppRegistry,
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Helper from '../helper';
import moment from 'moment/min/moment-with-locales.min';
var RNFS = require('react-native-fs');

class UploadPage extends React.Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            recording: false,
            loading: false
        };

    }

    componentDidMount() {
        this.props.navigation.setParams({
            title: 'Upload'
        });
        var partyId = this.props.navigation.getParam('id', null);
        console.log('upload screen catch party id', partyId);
        this.setState({partyId: partyId});
    }

;

    recordVideo = async = () => {
        if (this.camera) {
            console.log('has camera');
            this.setState({recording: true});
            this.camera.recordAsync({
                quality: '4:3'
            })
                .then(data => {
                    console.log('data is', data);
                    this.setState({videoPath: data.uri})
                })
                .catch(error => console.log(error))
        }
    };

    stopRecord = async = () => {
        if (this.camera) {
            this.setState({recording: false});
            this.props.navigation.setParams({
                headerRight: <Text onPress={() => {this.uploadVideo()}}
                                   style={styles.uploadBtn}>Done</Text>
            });
            this.camera.stopRecording()
        }
    };

    goToPage = (page, params) => {
        this.props.navigation.navigate(page, params);
    };

    uploadVideo = async = () => {
        this.setState({loading: true});
        console.log('uploaded video', this.state.videoPath);
        this.props.navigation.setParams({
            headerRight: ''
        });
        Helper.getUser().then(user => {
            console.log('Fetched user', user);
            Helper.getUserId(user.username).then(response => {
                console.log('returned response', response);
                response.json().then((json) => {
                    console.log('have json', json);
                    console.log('userId fetched', json[0].id);
                    var userId = json[0].id;
                    var name = userId + '-' + moment().format();
                    var partyId = this.props.navigation.getParam('id', null);
                    console.log('Fetched party id', partyId);
                    //fs.readFile(file.file.path, "utf-8", function (err, data) {
                    //    console.log('read file', data);
                    //});

                    // get a list of files and directories in the main bundle
                    RNFS.readFile(this.state.videoPath.replace('file:', ''), 'ascii').then((fileoutput) => {
                        console.log('read file', fileoutput);
                        var path = RNFS.DocumentDirectoryPath + '/' + name + '.mov';

                        RNFS.writeFile(path, fileoutput, 'ascii')
                            .then((success) => {
                                console.log('FILE WRITTEN!');
                                var uploadUrl = 'http://192.169.217.115:7099/partyfinder/';
                                var files = [
                                    {
                                        name: 'file',
                                        filename: name + '.mov',
                                        //filepath: this.state.videoPath,
                                        filepath: RNFS.DocumentDirectoryPath + '/' + name + '.mov',
                                        filetype: 'video/mov'
                                    }
                                ];

                                var uploadBegin = (response) => {
                                    var jobId = response.jobId;
                                    console.log('UPLOAD HAS BEGUN! JobId: ' + jobId, files[0].filename);
                                };

                                var uploadProgress = (response) => {
                                    var percentage = Math.floor((response.totalBytesSent / response.totalBytesExpectedToSend) * 100);
                                    console.log('UPLOAD IS ' + percentage + '% DONE!');
                                };

                                // upload files
                                var obj = {
                                    toUrl: uploadUrl,
                                    files: files,
                                    method: 'POST',
                                    headers: {
                                        'Accept': 'application/json',
                                        Authorization: 'Basic c2F1bUBhbHR1c2pvYnMuY29tOkJpbGxpb25zNDAh'
                                    },
                                    fields: {
                                        Method: 'upload',
                                        Module: 'Database'
                                    },
                                    begin: uploadBegin,
                                    progress: uploadProgress
                                };

                                console.log('Upload object', obj);
                                RNFS.uploadFiles(obj).promise.then((response) => {
                                    if (response.statusCode == 200) {
                                        console.log('FILES UPLOADED!', response); // response.statusCode, response.headers, response.body
                                        var savedPath = uploadUrl + response.body;

                                        var obj = {
                                            Method: 'insert',
                                            Module: 'Database',
                                            params: {
                                                table: 'Videos',
                                                obj: {
                                                    user_id: json[0].id,
                                                    party_id: this.state.partyId,
                                                    path: savedPath
                                                }
                                            }
                                        };
                                        console.log('created object', obj);
                                        fetch('http://192.169.217.115:7099/partyfinder/', {
                                            method: 'POST',
                                            headers: {
                                                Authorization: 'Basic c2F1bUBhbHR1c2pvYnMuY29tOkJpbGxpb25zNDAh',
                                                Accept: 'application/json',
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify(obj)
                                        }).then((response) => {
                                            console.log('Saved path to DB successfully', response);
                                            this.setState({loading: false});
                                            Helper.alertHandler('Video saved');
                                            this.goToPage('Main', {});
                                        })

                                    } else {
                                        console.log('SERVER ERROR');
                                        this.setState({loading: false});
                                        Helper.alertHandler('Upload error');
                                    }
                                })
                                    .catch((err) => {
                                        if (err.description === "cancelled") {
                                            // cancelled by user
                                        }
                                        console.log(err);
                                    });
                            })
                            .catch((err) => {
                                console.log(err.message);
                            });
                    }).catch((err) => {
                        console.log(err.message);
                    });


                    //var obj = {
                    //    Method: 'insert',
                    //    Module: 'Database',
                    //    params: {
                    //        table: 'Videos',
                    //        obj: {
                    //            user_id: json[0].id,
                    //            party_id: '1',
                    //            path: this.state.videoPath
                    //        }
                    //    }
                    //};
                    //console.log('created object', obj);
                    //fetch('http://192.169.217.115:7099/partyfinder/', {
                    //    method: 'POST',
                    //    headers: {
                    //        Authorization: 'Basic c2F1bUBhbHR1c2pvYnMuY29tOkJpbGxpb25zNDAh',
                    //        Accept: 'application/json',
                    //        'Content-Type': 'application/json'
                    //    },
                    //    body: JSON.stringify(obj)
                    //}).then((response) => {
                    //    console.log('Fetched successfully', response);
                    //    fetch(this.state.videoPath).then((res) => {
                    //        res.blob().then((blob) => {
                    //            console.log("BLOB", blob); // -- it returns -
                    //
                    //            this.setState({loading: false});
                    //            response.json().then((json) => {
                    //                this.setState({loading: false});
                    //                Helper.alertHandler('Video saved');
                    //            }).catch((err) => {
                    //                Helper.alertHandler('Save failed.  Please try again later.');
                    //            });
                    //            return response;
                    //        });
                    //    });
                    //})
                }).catch((err) => {
                    console.log('catch', err);

                });


            });

        });

        //Helper.goToPage('Main', this);
    };

    render() {

        return (

            <View style={{ flex: 1}}>

                <View style={styles.container}>

                    <RNCamera
                        ref={ref => {
                          this.camera = ref;
                        }}
                        style={{
                          flex: 1,
                        }}
                        type={ RNCamera.Constants.Type.back }
                        //codec={ RNCamera.Constants.VideoCodec['H264'] }
                        captureQuality={"high"}
                        captureAudio={true}
                        ratio="4:3"
                        maxDuration="10"
                        onCameraReady={this.onCameraReady}
                        permissionDialogTitle={'Permission to use camera'}
                        permissionDialogMessage={'We need your permission to use your camera phone'}
                        >
                        {
                            //<TouchableOpacity
                            //    onPress={this.state.recording === false ? this.recordVideo : this.stopRecord}>
                            //    <Text>{this.state.recording === false ? "START" : "STOP"}</Text>
                            //</TouchableOpacity>
                        }

                    </RNCamera>

                    {this.state.recording === false ?
                        <TouchableOpacity onPress={this.recordVideo}
                                          style={[styles.buttonContainer]}>
                            <View style={styles.circleInside}></View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={this.stopRecord}
                                          style={[styles.buttonContainer, styles.buttonStopContainer]}>
                            <View style={styles.buttonStop}></View>
                        </TouchableOpacity>
                    }


                    {this.state.loading &&
                    <View style={styles.loading}>
                        <ActivityIndicator size='large'/>
                    </View>
                    }
                </View>
            </View>
        );
    }

    takePicture = async function () {
        if (this.camera) {
            const options = {quality: 0.5, base64: true};
            const data = await this.camera.takePictureAsync(options)
            console.log(data.uri);
        }
    };
}

export default UploadPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    },
    uploadBtn: {
        marginRight: 10,
        color: '#fff',
        fontSize: 16
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
    buttonContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    circleInside: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#D91E18',
        borderColor: '#fff',
        borderWidth: 2
    },
    buttonStopContainer: {
        backgroundColor: 'transparent',
    },
    buttonStop: {
        backgroundColor: '#D91E18',
        width: 40,
        height: 40,
        borderRadius: 3,
        borderColor: '#fff',
        borderWidth: 2
    }
});

