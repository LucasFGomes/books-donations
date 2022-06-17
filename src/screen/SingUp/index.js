import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import api from '../../services/api'
import location from '../../services/location'
import {Picker} from '@react-native-picker/picker';
import _ from 'lodash';

import { 
          Title,
          ContainerSigUp,
          Title_email,
          Title_name,
          Title_password,
          Title_phone,
          Title_username,
          ButtomTouchableOpacity,
          Title_text,
          ContainerLogin,
          Title_text_login,
          Text_login,
          ContainerKeyboard,
          ContainerInsideKeyboard 
        } from './style'

const { width } = Dimensions.get('window')

export default function SingUp({ navigation }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [phone, setPhone] = useState('')
  const [username, setUsername] = useState('')
  const [state, setState] = useState(undefined)
  const [city, setCity] = useState(null)
  const [stateList, setStateList] = useState([])
  const [cityList, setCityList] = useState([])

  useEffect(() => {
    async function fetchStates(){ 
      const {data} = await api.get('/states')
      const states = data.map( item => ({label: item.name, value: item.name, id: item.id}))
      setStateList(states)
    }
    fetchStates();
  }, [])

  async function handleSingUp() {
    const data = {
      email,
      name,
      password,
      passwordConfirmation: password_confirmation,
      username,
      phone,
      state,
      city
    }

    try {
      const response = await api.post('/users', data)
      alert('Registro realizado com sucesso!')
      navigation.navigate('Login')
    }catch(e){
      alert('Erro ao registrar usuário, tente novamente')
    }
  }

  async function handleSelectState(value, index) {
    if(!value) return
    
    setState(value)

    const { id } = stateList[index]

    const { data } = await api.get(`/states/${id}/cities`)

    const cities = data.map( item => ({label: item.name, value: item.name}))

    setCityList(cities)
  }

  const props = {
    placeholderTextColor: "#AAAA"
  }

  return (
      <ContainerKeyboard >
        <ContainerInsideKeyboard>
              <Title>Cadastro</Title>
              <ContainerSigUp>
                <Title_email
                  placeholder='e-mail'
                  keyboardType='email-address'
                  autoCapitalize='none'
                  autoCorrect={false}
                  value={email}
                  onChangeText={setEmail}
                  {...props}
                />
                <Title_name 
                  placeholder= 'nome'
                  autoCapitalize='none'
                  autoCorrect={false}
                  value={name}
                  onChangeText={setName}
                  {...props}
                />
                <Title_name 
                  placeholder= 'username'
                  autoCapitalize='username'
                  autoCorrect={false}
                  value={name}
                  onChangeText={setName}
                  {...props}
                />
                <Title_password
                  secureTextEntry={true}
                  placeholder='senha'
                  keyboardType='default'
                  value={password}
                  onChangeText={setPassword}
                  {...props}
                />
                 <Title_password
                  secureTextEntry={true}
                  placeholder='confirmação da senha'
                  keyboardType='default'
                  value={passwordConfirmation}
                  onChangeText={setPasswordConfirmation}
                  {...props}
                />
                <Title_phone 
                  placeholder= 'numero de celular'
                  autoCapitalize='none'
                  autoCorrect={false}
                  value={phone}
                  onChangeText={setPhone}
                  {...props}
                />
                <View>
                  <Picker
                    style={{
                      fontSize: 18,
                      width: width*0.8,
                      borderRadius: 50,
                      color: '#333',
                      marginTop: 5,
                    }}
                    selectedValue={state}
                    onValueChange={handleSelectState}
                  >
                    {stateList.length !== 0 && stateList.map(state => (
                      <Picker.Item label={state.label} value={state.value} />
                    ))}
                  </Picker>
                  <Picker
                    style={{
                      fontSize: 18,
                      width: width*0.8,
                      borderRadius: 50,
                      color: '#333',
                      paddingRight: 30, 
                      marginTop: 5,
                    }}
                    selectedValue={city}
                    onValueChange={(itemValue, itemIndex) =>
                      setCity(itemValue)
                    }>
                    {cityList.length !== 0 && cityList.map(city => (
                      <Picker.Item label={city.label} value={city.value} />
                    ))}
                  </Picker>
                </View>
              </ContainerSigUp>
              <ButtomTouchableOpacity onPress={handleSingUp}>
                <Title_text>Criar Conta</Title_text>
              </ButtomTouchableOpacity>

              <ContainerLogin>
                <Title_text_login>Já possui conta?</Title_text_login>
                <Text_login onPress={() => navigation.navigate('Login')}>
                  Entre agora
                </Text_login>
              </ContainerLogin>
            </ContainerInsideKeyboard>
          </ContainerKeyboard>
  )
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    width: width*0.8,
    height: 40,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ADADAD',
    borderRadius: 10,
    color: '#333',
    paddingRight: 30,
    marginTop: 25,
  },
  inputAndroid: {
    fontSize: 18,
    width: width*0.8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ADADAD',
    borderRadius: 10,
    color: '#333',
    paddingRight: 30, 
    marginTop: 25,
  },
});
