import styled from 'styled-components/native'
import { Platform } from 'react-native'


export const Title = styled.Text`
    fontSize:40px;
    fontWeight: bold;
    
`

export const Title_email = styled.TextInput`
    fontSize:20px;
    width: 80%;
    height:40px;
    borderColor: #ADADAD;
    borderWidth:1px;
    borderRadius: 10px;
    paddingLeft: 10px;
    paddingRight: 10px;
    alignItems: center;
    marginTop:40px;

`
export const Title_password = styled(Title_email)`
    marginBottom:50px;
    borderColor:#ABAAAA;

`

export const ButtomTouchableOpacity = styled.TouchableOpacity`
    width: 40%;
    height: 7%;
    backgroundColor: #FEB665;
    alignItems: center;
    justifyContent: center;
    borderRadius: 13px;
`

export const Title_text = styled.Text`
    fontSize: 20px;
    borderRadius: 2px;
    
`

export const ContainerSigUp = styled.View`
    flexDirection: column;
    alignItems: center;
    justifyContent: center;

`

export const Title_text_singUp = styled.Text`
    fontSize:15px;
    
`
export const Text_singUp = styled(Title_text_singUp)`
    color: #01337f;
    fontWeight: bold;
`
export const ContainerKeyboard = styled.KeyboardAvoidingView.attrs({
    behavior: Platform.OS === 'ios' ? 'padding' : 'height',
  })`
  alignItems: center;
  justifyContent: center;

`

export const ContainerInsideKeyboard = styled.View`
    flexDirection: column;
    alignItems: center;
    justifyContent: center;
    width: 100%;
    height: 100%;
`