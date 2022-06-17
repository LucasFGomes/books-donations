import styled from 'styled-components/native'
import { Platform } from 'react-native'

export const ContainerKeyboard = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : 'height',
})`

`

export const ContainerInsideKeyboard = styled.View`
  flexDirection: column;
  width: 100%;
  height: 100%;
`

export const Title = styled.Text`
    fontSize:24px;
    fontWeight: bold;
    marginTop: 10px;
`

export const Input = styled.TextInput`
    fontSize:20px;
    width: 80%;
    height:40px;
    borderColor: #ADADAD;
    borderWidth:1px;
    borderRadius: 10px;
    paddingLeft: 10px;
    paddingRight: 10px;
    alignItems: center;
    marginTop:30px;

`

export const ContainerNewDonate = styled.View`
    flex: 1;
    width: 100%;
`

export const ScrollViewNewDonate = styled.ScrollView `
    width: 100%;
`