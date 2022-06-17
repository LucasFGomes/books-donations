import styled from 'styled-components/native'
import { Platform, Dimensions } from 'react-native'

const { height } = Dimensions.get('screen')

export const ContainerKeyboard = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : 'height',
})`

`

export const ContainerInsideKeyboard = styled.View`
  flexDirection: column;
  alignItems: center;
  width: 100%;
  height: 100%;
`

export const Title = styled.Text`
    fontSize: 18px;
    fontWeight: bold;
    marginTop: 15px;
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
    height: 35px;
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
export const ContainerSearch = styled.View`
    flexDirection: row;
    alignItems: center;
    justifyContent: center;
    background: #fff;
    borderWidth:1px;
    borderRadius: 12px;
    width: 85%;
    height: 50px;
    marginTop: 20px;
    borderColor:#fff;
    borderWidth: 1px;
    borderColor: #bbb;
`
export const Search_text = styled.TextInput`
    fontSize:20px;
    width: 82%;
    height:80%;
    borderRadius: 10px;
    alignItems: center;
    marginRight:8px
    marginLeft:8px
`
