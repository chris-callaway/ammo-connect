import React, { Component } from 'react';
import { ActivityIndicator, Platform, Alert, AlertIOS, Image, Button, StyleSheet, View, ScrollView, TouchableHighlight, TextInput, ListView } from 'react-native';
import { Container, Content, Text, StyleProvider } from 'native-base';
import { createStackNavigator } from 'react-navigation';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component';
import Helper from '../helper';
import PhotoUpload from 'react-native-photo-upload'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class EditProfilePage extends React.Component<Props> {

    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.setState({loadingUser: true});
        Helper.getUserId(null, true).then(user => {
            console.log('have user', user);
            this.setState({
                userId: user[0].id,
                loadingUser: false,
                email: user[0].email,
                username: user[0].username,
                password: user[0].password,
                profile_img: user[0].profile_img
            });
        });
    };

    state = {
        loading: false,
        username: '',
        password: '',
        profile_img: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
    };

    goToPage = (page, params) => {
        this.props.navigation.navigate(page, params);
    };

    validateForm = (email, username, password, profileImg) => {
        console.log('validating', email, username, password, profileImg);
        var valid = true;
        //if (!Helper.validateEmail(email)) {
        //    Helper.alertHandler('Please enter a valid email.');
        //    valid = false;
        //}
        //else
        if ((!username || username.length < 5) && !this.state.username) {
            Helper.alertHandler('Your username must be at least 5 characters long.');
            valid = false;
        }
        //else if (!password || password.length < 5) {
        //    Helper.alertHandler('Your password must be at least 5 characters long.');
        //    valid = false;
        //}
        else if ((!profileImg || profileImg.indexOf('default_avatar') > -1) && !this.state.profile_img) {
            Helper.alertHandler('Please upload an image for your profile.');
            valid = false;
        }
        return valid;
    };

    saveAccount = (email, username, password, profileImg, ref) => {
        var self = ref;
        var valid = this.validateForm(email, username, password, profileImg);

        if (valid) {
            this.setState({loading: true});
            var userObj = {
                email: this.state.email,
                username: username,
                password: this.state.password,
                profile_img: profileImg
            };
            console.log('userObj', userObj);
            var obj = {
                Method: 'update',
                Module: 'Database',
                params: {
                    table: 'Users',
                    'setAll': userObj,
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
                    Helper.alertHandler("Account updated");
                    this.goToPage('Find A Party', {});
                } else {
                    Helper.alertHandler('Save failed.  Please try again later.');
                }
                return response;
            })
        }

    };

    render() {
        return (

            <KeyboardAwareScrollView style={{backgroundColor: '#fff'}}>
                <ScrollView contentContainerStyleyle={{ flex: 1,alignItems: 'center', backgroundColor: '#fff'}}>

                    {this.state.loading &&
                    <View style={styles.loading}>
                        <ActivityIndicator size='large'/>
                    </View>
                    }

                    {this.state.loadingUser &&
                    <View style={{flex: 1}}>
                        <View style={styles.loading}>
                            <ActivityIndicator size='large'/>
                        </View>
                        <View style={{flex: 1, alignItems: 'center',
        justifyContent: 'center', marginTop: 80}}>
                            <Text>Fetching User...</Text>
                        </View>
                    </View>
                    }

                    {!this.state.loadingUser &&

                    <View style={{ marginTop: 20, flex: 1}}>

                        {
                            //<View style={{flexDirection:'row', alignSelf: 'flex-start'}}>
                            //    <FormLabel style={{color: '#fff'}}>Email</FormLabel>
                            //</View>
                            //
                            //<View style={{flexDirection:'row'}}>
                            //<FormInput value={this.state.email} onChangeText={(text) => this.email = text}
                            //containerStyle={ styles.formInputs }/>
                            //</View>
                        }

                        <View style={{flexDirection:'row', alignSelf: 'flex-start'}}>
                            <FormLabel style={{color: '#fff'}}>Username</FormLabel>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <FormInput value={this.state.username} onChangeText={(text) => this.username = text}
                                       containerStyle={ styles.formInputs }/>
                        </View>

                        {
                            //<View style={{flexDirection:'row', alignSelf: 'flex-start'}}>
                            //    <FormLabel style={{color: '#fff'}}>Password</FormLabel>
                            //</View>
                            //<View style={{flexDirection:'row'}}>
                            //<FormInput value={this.state.password} secureTextEntry={true}
                            //onChangeText={(text) => this.password = text}
                            //containerStyle={ styles.formInputs }/>
                            //</View>
                        }

                        <View style={{flexDirection:'row', marginTop: 20}}>
                            <FormLabel style={{color: '#fff'}}>Profile Image</FormLabel>
                        </View>
                        <View style={{flexDirection:'row', marginTop: 20}}>
                            {this.state.imageLoading &&
                            <View style={styles.loading}>
                                <ActivityIndicator size='large'/>
                            </View>
                            }
                            <PhotoUpload
                                onStart={() => {this.setState({loading: true})}}
                                onCancel={() => {this.setState({loading: false})}}
                                photoPickerTitle="Select Profile Image"
                                onPhotoSelect={avatar => {
                                 if (avatar) {
                                   this.setState({profile_img: 'data:image/png;base64,' + avatar, loading: false});
                                 }
                               }}>
                                <Image style={{
                           paddingVertical: 30,
                           width: 150,
                           height: 150,
                           borderRadius: 75
                         }} resizeMode='cover' source={{
                           uri: this.state.profile_img
                         }}/>
                            </PhotoUpload>

                            {
                                //<Image
                                //style={{width: 100, height: 100, resizeMode: 'contain'}}
                                //source={{uri: base64Icon}}/>
                            }
                        </View>


                        <View style={{marginTop: 40, marginBottom: 20, alignItems: 'center'}}>
                            <ButtonComponent
                                text="Update"
                                type="primary"
                                shape="rectangle"
                                backgroundColors={['#ec2227', '#ec2227']}
                                gradientStart={{ x: 10, y: 10 }}
                                gradientEnd={{ x: 10, y: 10 }}
                                height={50}
                                width={250}
                                flex={1.0}
                                onPress={ () => this.saveAccount(this.email, this.username, this.password, this.state.profile_img, this) }
                                >
                            </ButtonComponent>
                        </View>

                    </View>
                    }

                </ScrollView>
            </KeyboardAwareScrollView>


        );
    }
}

export default EditProfilePage;

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
    },
    loadingText: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 5,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#333'
    }
});


