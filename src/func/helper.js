/* Helper functions - Made by giaidieu.com */
import React from 'react';
import { Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Redux.
//import { connect } from 'react-redux';
//import store from './store';

// Load user from localstorage if logged in.
export async function user_load() {
  try {
    const data = await AsyncStorage.getItem('user');
    if (data != null) {
      this.user = JSON.parse(data);
    }
  }
  catch(e) {
    console.error(e);
  }
};

// Remove user from localstorage.
export async function user_remove() {
  try {
    AsyncStorage.removeItem('user');

    this.user = {
      uid: 0,
      name: 'Anonymous',
      access_token: '',
    };
  }
  catch(e) {
    console.error(e);
  }
};

/**
 * Wrapper function for Alert message.
 */
export function custom_alert(title, message) {
  if (Platform.OS == 'web') {
    alert(message);
  }
  else {
    Alert.alert(title, message);
  }
}

/**
 * Wrapper function for Confirm message.
 * callback => when OK is pressed.
 */
export function custom_confirm(title, message, callback) {
  if (Platform.OS == 'web') {
    if (confirm(message) && typeof callback == 'function') {
      callback();
    }
  }
  else {
    Alert.alert(title, message, [
      {
        text: 'Cancel',
        onPress: () => {return false;},
        style: 'cancel'
      },
      {
        text: 'OK',
        onPress: () => {
          if (typeof callback == 'function') {
            callback();
          }
        }
      },
    ], { cancelable: false });
  }
}

/**
 * Remove from local storage by name.
 */
export async function custom_local_storage_remove(name) {
  try {
    await AsyncStorage.removeItem(name);
  }
  catch(e) {
    console.error(e);
  }
}

/**
 * Get value from local storage by name.
 */
export async function custom_local_storage_get(name, type) {
  try {
    const value = await AsyncStorage.getItem(name);
    if (type == 'json') {
      return value == null ? {} : JSON.parse(value);
    }

    return value;
  }
  catch(e) {
    console.error(e);
  }
}

/**
 * Store a string or JSON object to local storage.
 */
export async function custom_local_storage_set(name, value) {
  try {
    await AsyncStorage.setItem(name, value);
    console.log(name + ' has been stored to local storage.');
  }
  catch(e) {
    console.error(e);
  }
}

/**
 * Make a web service call to backend CMS via custom API.
 */
export async function custom_service_get_request(service_name, params) {
  var query = new Array();

  if (typeof params == 'object') {
    for (var key in params) {
      if (typeof params[key] == 'string') {
        query.push(key + '=' + params[key].replace(/\s+/g, '+'));
      }
      else{
        query.push(key + '=' + params[key]);
      }
    }
  }

  var url = '';
  if (!query.length) {
    url = Drupal.settings.path + '/custom_api/' + service_name + '?_format=json';
  }
  else{
    url = Drupal.settings.path + '/custom_api/' + service_name + '?_format=json&' + query.join('&');
  }

  console.log('GET request is: ' + url);

  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.json();
};

/**
 * Make a web service call to backend CMS.
 */
export async function custom_service_post_request(csrf_token, service_name, params) {
  // If a valid csrf_token, continue.
  if (csrf_token != null && csrf_token != '') {
    try {
      const response = await fetch(Drupal.settings.path + '/custom_api/' + service_name + '?_format=json', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrf_token,
        },
        body: JSON.stringify(params)
      });

      return response.json();
    }
    catch (error) {
      console.error(error);
    }
  }

  return null;
};

/**
 * Get the session token from CMS.
 */
export async function custom_get_csrf_token() {
  try {
    const response = await fetch(Drupal.settings.path + '/rest/session/token', {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'text/plain'
      }
    });

    return response.text();
  }
  catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Login a user and get JSON Web Token in return if authenticated.
 */
export async function custom_user_smart_login(csrf_token, username, password) {
  // If a valid csrf_token, continue.
  if (csrf_token != null && csrf_token != '') {
    try {
      const response = await fetch(Drupal.settings.path + '/custom_api/token?_format=json', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrf_token,
        },
        body: JSON.stringify({'username': username, 'password': password})
      });

      return response.json();
    }
    catch (error) {
      console.error(error);
    }
  }

  return null;
};

/**
 * Helper function to formar number.
 */
export function custom_thousand_format(number, decimal_point) {
  number += '';
  var x = number.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;

  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + decimal_point + '$2');
  }

  return x1 + x2;
}

/**
 * Validate whether a text is valid email address.
 */
export function custom_validate_is_email(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

/**
 * Validate a URL.
 */
export function custom_validate_is_url(url) {
  return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}
