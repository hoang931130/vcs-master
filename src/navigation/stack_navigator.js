/* Define basic screens for the App */
import React from 'react';
import { Button, TextInput, View, Dimensions, Platform } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

// Redux.
import { connect } from 'react-redux';
import store from '../func/store';

// Navigations.
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './tab_navigator';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

// Import screens.
import LoginScreen from '../screens/login.js';
import HomeScreen from '../screens/home.js';
import AboutScreen from '../screens/about.js';
import FeedBackScreen from '../screens/feedback.js';

// Styles.
const StyleGlobal = require('../styles/global');

// Custom.
import Settings from '../settings';
import * as CustomHelper from '../func/helper';

// Main.
const Stack = createStackNavigator();
class MainStackNavigator extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = props.userStatus;

    // Keep plash screen showing.
    SplashScreen.preventAutoHideAsync();
  }

  componentDidMount() {
    // Listening to push receiveing.
    if (Platform.OS != 'web') {
      // Push handling.
      //CustomNotification.handlingPushNotification();
    }

    // User load.
    /*
    Drupal.user_load().then(() => {
      if (Drupal.user.uid) {
        //console.log(Drupal.user);
        Drupal.user['field_mobile_is_verified'] = 1; // Remove later.
        this.props.dispatch({ type: 'LOG_IN' });

        // Workaround for iOS issue.
        SplashScreen.hideAsync();

        Chatroom.initChat(this, 0, function(chatroom_list) {
          if (chatroom_list != false) {
            console.log('Firebase inited.');
            Chatroom.databaseAddListening();
          }
        });
      }

      // Turn off plash screen.
      setTimeout(function() {
        SplashScreen.hideAsync();
      }, 400);
    });
    */

    // Register to event update.
    //store.subscribe(() => CustomHelper.componentStateUpdate(this));
  }

  render() {
    return (
				<Stack.Navigator screenOptions={ {headerShown: false} }>
					{ this.state == null || !this.state.is_logged_in ?
					<Stack.Screen name="Login" component={ LoginScreen } options={ {title: 'Login'} } />
          :
          <>
            <Stack.Screen name='Home' component={ BottomTabNavigator } options={ {title: 'Home'} } />
            <Stack.Screen name='About' component={ AboutScreen } options={ {title: 'About'} } />
            <Stack.Screen name='FeedBack' component={ FeedBackScreen } options={ {title: 'Feedback'} } />
          </>
          }
				</Stack.Navigator>
    );
  }
};

const mapStateToProps = (state) => {
  const { userStatus } = state;
  return { userStatus };
};

export default connect(mapStateToProps)(MainStackNavigator);
