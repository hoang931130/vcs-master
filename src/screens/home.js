/* Home screen */
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform, Image, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

// Redux.
import { connect } from 'react-redux';

// Custom.
import Settings from '../settings.js';
import * as CustomHelper from '../func/helper.js';

// Styles.
const StyleGlobal = require('../styles/global');

// Main.
class HomeScreen extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = props.userStatus;
    this.state.is_loading = true;
  }

  // Load data.
  componentDidMount() {
  }

  // Return rendered layout.
  render() {
    return (
    <ScrollView style={ StyleGlobal.container }>
    <View>
      { Platform.OS === 'web' ? [] : <Spinner visible={ this.state.is_loading } /> }

    </View>
    </ScrollView>
    );
  }
};

// Inline styles.
const styles = StyleSheet.create({
})

const mapStateToProps = (state) => {
  const { userStatus } = state;
  return { userStatus };
};

export default connect(mapStateToProps)(HomeScreen);
