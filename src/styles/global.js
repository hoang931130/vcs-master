/* Global styles */
var React = require('react-native');
var { StyleSheet, Dimensions } = React;

module.exports = StyleSheet.create({
  // Body.
  container_login: {
    flex: 1,
    backgroundColor: '#fff',
    color: '#3c3c3c',
		flexDirection: 'row',
    height: 800,
  },
	// Buttons.
  button: {
    alignItems: 'center',
    padding: 10,
    width: '100%',
    borderRadius: 5,
    marginTop: 10,
  },
	button_cancel:{
    backgroundColor: '#ea413e',
		borderColor:'#ea413e',
    color: '#fff',
    marginTop: 100,
    textTransform: 'uppercase',
    borderRadius: 0,
	},
  button_primary: {
    backgroundColor: '#ea413e',
		borderColor: '#ea413e',
    color: '#fff',
    marginTop: 100,
    textTransform: 'uppercase',
    borderRadius: 0,
  },
  button_primary_text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button_default: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    color: '#fff',
  },
  // login note
  login_note: {
    color: '#fff',
    paddingTop: 40,
    textAlign: 'center',
  },
  
  // copyright
  copyright: {
    position: 'absolute',
    bottom: -105,
    left: '32%',
    color: '#fff',
    fontSize: 16,
  },
  // title login
  wapper_title_login: {
    marginHorizontal: 40,
  },
  login_title: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    paddingTop: 20,
    paddingBottom: 10,
    fontSize: 20,
  },
  // wapper input
  wapper_input: {
    marginHorizontal: 30,
    marginTop: 100,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'rgba(0, 0, 0,0.6)',
  },
  // wapper color gary 5px
  border_gray: {
    width: '100%',
    height: 5,
    backgroundColor: '#a1b7ca',
    marginVertical: 5,
  },
  // wapper color fff 5px
  border_white: {
    width: '100%',
    height: 5,
    backgroundColor: '#fff',
    marginVertical: 5,
  },
  // Input text.
  input_text: {
    height: 32,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#fff',
    width: '100%',
    marginTop: 30,
    borderRadius: 5,
    paddingVertical:5,
    paddingHorizontal:15,
    marginBottom:20,
    zIndex: 2,
    position: 'relative',
    color: 'c5c5c6',
    outline: 'none',
	},
  // Input textarea.
  input_textarea: {
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#fff',
    width: '100%',
    marginTop: 10,
    borderRadius: 5,
    padding:10,
    marginBottom:20,
  },
});
