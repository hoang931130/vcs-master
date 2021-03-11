/* Login screen */
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Platform, Button, Image, ImageBackground, Dimensions, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

// Redux.
import { connect } from 'react-redux';

// Custom.
import Settings from '../settings.js';
import * as CustomHelper from '../func/helper.js';

// Styles.
const StyleGlobal = require('../styles/global');

// Main.
class LoginScreen extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = props.userStatus;
    this.state.is_loading = false;

    // Login form.
    this.state.username = '';
    this.state.branch_code = '';
    this.state.password = '';
  }

  // Load data.
  componentDidMount() {
  }

  // login handler.
  login() {
    // Validate input.
    var branch_code = this.state.branch_code.trim();
    var username = this.state.username.trim();
    var password = this.state.password.trim();

    if (branch_code == '') {
      CustomHelper.custom_alert('Alert', 'Please enter your branch code.');
      return false;
    }

    if (username == '') {
      CustomHelper.custom_alert('Alert', 'Please enter your username.');
      return false;
    }

    if (password == '') {
      CustomHelper.custom_alert('Alert', 'Please enter your password.');
      return false;
    }

    // Start the process.
    var parent = this;
    this.setState({ is_loading: true });

    // Get CSRF token then process to login user.
    CustomHelper.custom_get_csrf_token()
    .then(csrf_token => CustomHelper.custom_user_smart_login(csrf_token, branch_code, username, password))
    .then(result => {
      if (result['is_error']) {
        parent.setState({ is_loading: false });

        setTimeout(function() {
          CustomHelper.custom_alert('Alert', result['message']);
        }, 1000);
      }
      else{
        // Assign to user object.
        //Drupal.user = result['user'];
        //Drupal.user.uid = parseInt(Drupal.user.uid);
        //Drupal.user['access_token'] = result['token'];

        // Store data for reuse later.
        /*
        CustomHelper.custom_local_storage_set('user', JSON.stringify(Drupal.user)).
        then(() => {
          // Update user state.
          if (Drupal.user.uid) {
            // Change state.
            parent.props.dispatch({ type: 'LOG_IN' });

            // Init chat.
            Chatroom.initChat(parent, 0, function(chat) {
              if (chat != null) {
                console.log('Firebase inited.');
                Chatroom.databaseAddListening();
              }
            });
          }

          // Update state.
          parent.setState({
            is_loading: false,
            username: '',
            password: ''
          });
        });
        */
      }
    })
    .catch((error) => {
      console.error(error);
    });

    return false;
  }

  // Return rendered layout.
  render() {
    return (
      <ScrollView style={ StyleGlobal.container }>
        { Platform.OS === 'web' ? [] : <Spinner visible={ this.state.is_loading } /> }
        <ImageBackground source={ require('../images/app-bg.png') } style={ {flex: 1, resizeMode: 'cover', width: Dimensions.get('window').width, height: Dimensions.get('window').height} }>
          { /* Screen header */ }
          <View>
            <Text>{ Settings.title }</Text>
          </View>

          {/* Login panel */ }
          <View>
            <TextInput style={ StyleGlobal.input_text} placeholder="Branch Code" value={ this.state.branch_code } onChangeText={ (branch_code) => this.setState({ branch_code: branch_code }) } />
            <TextInput style={ StyleGlobal.input_text} placeholder="Username" value={ this.state.username } onChangeText={ (username) => this.setState({ username: username }) } />
            <TextInput style={ StyleGlobal.input_text} placeholder="Password" value={ this.state.password } onChangeText={ (password) => this.setState({ password: password }) } secureTextEntry />

            <TouchableOpacity onPress={ () => this.login() } style={ [StyleGlobal.button, StyleGlobal.button_primary] }>
              <Text style={ StyleGlobal.button_primary_text }>Login</Text>
            </TouchableOpacity>

            <Text>Please be reminded to login daily!</Text>
          </View>

          { /* Footer */ }
          <View>
            <Text>{ Settings.copyright }</Text>
          </View>
        </ImageBackground>
      </ScrollView>
    );
  }
};

// Inline styles.
const styles = StyleSheet.create({
});

const mapStateToProps = (state) => {
  const { userStatus } = state;
  return { userStatus };
};

export default connect(mapStateToProps)(LoginScreen);
