/* Global styles */
var React = require('react-native');
var { StyleSheet, Dimensions } = React;

module.exports = StyleSheet.create({
  // Body.
  container: {
    flex: 1,
    backgroundColor: '#fff',
    color: '#3c3c3c',
    paddingHorizontal: 20,
		flexDirection: 'row',
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
    backgroundColor: '#ddd',
		borderColor:'#FF6242',
    color: '#fff',
	},
  button_primary: {
    backgroundColor: '#FF6242',
		borderColor: '#FF6242',
    color: '#fff',
  },
  button_default: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    color: '#fff',
  },
  // Input text.
  input_text: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#fff',
    width: '100%',
    marginTop: 10,
    borderRadius: 5,
    paddingVertical:5,
    paddingHorizontal:15,
    marginBottom:20,
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
