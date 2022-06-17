import styled from 'styled-components/native'
import { Platform, Dimensions } from 'react-native'

const { height } = Dimensions.get('screen')

export const ContainerKeyboard = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : 'height',
})`
`

export const ContainerInsideKeyboard = styled.ScrollView`
  flexDirection: column;
  width: 100%;
  height: 100%;
`

export const Title = styled.Text`
    fontSize: 18px;
    fontWeight: bold;
    marginTop: 15px;
    alignSelf: center;
    justifyContent: center;
`

export const Input = styled.TextInput`
    fontSize: 20px;
    width: 80%;
    height: 40px;
    borderColor: #ADADAD;
    borderWidth:1px;
    borderRadius: 10px;
    paddingLeft: 10px;
    paddingRight: 10px;
    alignItems: center;
    marginTop: 30px;
`

export const ContainerBook = styled.View`
    width: 100%;
    alignItems: center;
    justifyContent: center;
    marginBottom: 30px;
`

export const InputTextArea = styled(Input) `
  height: 150px;
`



export const ButtomTouchableOpacity = styled.TouchableOpacity`
    width: 40%;
    height: 40px;
    backgroundColor: #FEB665;
    alignItems: center;
    justifyContent: center;
    borderRadius: 13px;
    marginTop: 40px;
`

export const Title_text = styled.Text`
    fontSize:20px;
    borderRadius: 2px;
`

export const ViewCamera = styled.SafeAreaView`
    flex:1; 
    justifyContent: center;
    flexDirection:  column; 
    width: 100%;
    height: 100% 
`

export const ViewCameraTextPosition = styled.View`
    flex: 1;
    backgroundColor: transparent;
    flexDirection: row;
`

export const CameraInsideTextPosition = styled.TouchableOpacity`
    position: absolute;
    bottom: 20px;
    left: 20px;
`
export const CameraText = styled.Text`
    fontSize: 20px;
    marginBottom:13px;
    color: #fff;
`
export const CameraTouchableOpacity = styled.TouchableOpacity`
    justifyContent: center;
    alignItems: center;
    backgroundColor: #121212;
    margin: 20px;
    borderRadius: 20px;
    height: 50px;
`

export const ModalPicture = styled.Modal`
`

export const ViewPicture = styled.View`
    justifyContent:center;
    alignSelf: center;
    margin:20px;
    width:100%;
`
export const ViewTouchableOpacity = styled.TouchableOpacity`
    margin:10px;
`