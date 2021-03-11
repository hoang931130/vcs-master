/* Main App */
import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';

// Redux.
import { Provider } from 'react-redux';
import store from './src/func/store';

// Navigations.
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './src/navigation/stack_navigator';
import { navigationRef, isReadyRef } from './src/func/navigation.js';

// Custom.
//import * as CustomHelper from './src/func/helper.js';

// Main App.
class App extends React.Component {
  componentDidMount() {
    // Navigation is not rendered.
    isReadyRef.current = false;
  }

  render() {
    return (
      <Provider store={ store }>
        <NavigationContainer ref={ navigationRef } onReady={ () => {isReadyRef.current = true;} }>
          <MainStackNavigator />
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
