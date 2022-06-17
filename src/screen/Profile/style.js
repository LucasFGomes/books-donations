import { StyleSheet, Dimensions } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    width: Dimensions.get('screen').width - 50,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 25,
    borderColor: '#c3c9cb',
    paddingLeft: 10,
    fontSize: 15,
  },
  textInputDisabled: {
    width: Dimensions.get('screen').width - 50,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 25,
    borderColor: '#c3c9cb',
    backgroundColor: '#E1E1E1',
    paddingLeft: 10,
    fontSize: 15,
  },
  image: {
    aspectRatio: 1,
    width: 150,
    height: 'auto',
    alignSelf: 'center',
    marginVertical: 20,
  },
  button: {
    width: '30%',
    height: 40,
    backgroundColor: '#1E90FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: 'black',
    shadowOpacity: 0.4,
  },
  removeButton: {
    width: Dimensions.get('screen').width - 50,
    height: 40,
    backgroundColor: '#E60202',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: 'black',
    shadowOpacity: 0.4,
  },
  exitButton: {
    width: Dimensions.get('screen').width - 120,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: 'black',
    shadowOpacity: 0.4,
    marginTop: 30
  },
  text: {
    fontSize: 15,
    borderRadius: 2
  },
  textButton: {
    color: 'red',
    fontWeight: 'bold',
  },
  signUp: {
    marginTop: 25,
    flexDirection: 'row'
  },
  signUpText: {
    fontSize: 15,
    color: '#01337f'
  },
  iconUser: {
    width: 75,
    height: 75,
    alignItems: 'center'
  },
  boxInfo: {
    backgroundColor: "#ebebeb", 
    borderRadius: 10, 
    padding: 25, 
    borderStyle: 'solid',
    borderColor: "#000",
  },
  textProfile: {
    fontSize: 15,
  }
});

export default styles;
