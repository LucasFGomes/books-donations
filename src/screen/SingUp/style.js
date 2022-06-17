import styled from 'styled-components/native'
import { Platform } from 'react-native'

export const Title = styled.Text`
    fontSize:40px;
    fontWeight: bold;
`
export const ContainerSigUp = styled.View`
    flexDirection: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    paddingBottom:20px;

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
    marginTop:25px;

`
export const Title_name = styled(Title_email)`
    borderColor:#ABAAAA;
    fontSize:20px;
`
export const Title_password = styled(Title_email)`

`

export const Title_phone = styled(Title_email)`

`

export const Title_username = styled(Title_email)`

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
    fontSize:20px;
    borderRadius: 2px;
    
`
export const ContainerLogin = styled.View`
    flexDirection: column;
    alignItems: center;
    justifyContent: center;
    paddingTop:20px;
`

export const Title_text_login = styled.Text`
    fontSize:15px;
    
`
export const Text_login = styled(Title_text_login)`
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
