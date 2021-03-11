/* Define basic tabs used in top / bottom for the App */
import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Image } from 'react-native';

// Redux.
import { connect } from 'react-redux';
import store from '../func/store';

// Custom.
import Settings from '../settings';
import * as CustomHelper from '../func/helper';

// Import screens.
import HomeScreen from '../screens/home.js';
import AboutScreen from '../screens/about.js';
import FeedBackScreen from '../screens/feedback.js';

// Create bottom tabs.
const BottomTab = createMaterialBottomTabNavigator();
class BottomTabNavigator extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = props.userStatus;
  }

  componentDidMount() {
    // Register to event update.
    //store.subscribe(() => CustomHelper.componentStateUpdate(this));
	}


  render() {
    return (
			<BottomTab.Navigator activeColor="#FF6242" inactiveColor="#BABABA" labeled={ true } shifting={ false }
        barStyle={{ backgroundColor: '#fff',height:70,paddingTop:10 }}
			  initialRouteName='Home'
			  backBehavior='history'
      >
				<BottomTab.Screen name='Home' component={ HomeScreen } options={ {tabBarLabel: 'Home'} } />
        <BottomTab.Screen name='About' component={ AboutScreen } options={ {tabBarLabel: 'About'} } />
        <BottomTab.Screen  name='FeedBack' component={ FeedBackScreen } options={ {tabBarLabel: 'Feedback'} } />
      </BottomTab.Navigator>
    );
  }
};

const mapStateToProps = (state) => {
  const { userStatus } = state;
  return { userStatus };
};

export default connect(mapStateToProps)(BottomTabNavigator);
