import { Text, View, StatusBar, TextInput, TouchableOpacity, Image, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import colors from '../../constants/colors';

import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const login = () => {
    if (email == '' || password == '') {
      alert("Hãy nhập đầy đủ thông tin");
    } else {
      setIsLoading(true);
      Axios.post('https://vocab-master-api.000webhostapp.com/api/auth/login', {
        email: email,
        password: password,
      })
        .then(function (response) {
          console.log(response.data);
          storeUser(response.data.user.id, response.data.user.name, response.data.user.email);
          setIsLoading(false);
          props.navigation.navigate('Home')
        })
        .catch(function (error) {
          setIsLoading(false);
          alert("Tài khoản không tồn tại");
          console.log(error.message);
        });
    }
  };

  const storeUser = async (id, name, email) => {
    try {
      await AsyncStorage.setItem('@id_user', '' + id)
      await AsyncStorage.setItem('@name_user', '' + name)
      await AsyncStorage.setItem('@email_user', '' + email)
      await AsyncStorage.setItem('@password_user', '' + password)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor={colors.white} barStyle='dark-content' />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.imageLogoView}>
          <Image source={require('../../images/logo.png')} style={styles.image} />
          <Text style={styles.textImageLogo}>Vocab Master</Text>
        </View>

        <View style={styles.formView}>
          <Text style={styles.textForm}>Đăng nhập!</Text>

          <View style={styles.inputView}>
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              placeholderTextColor={colors.gray_text_form}
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.textInput}
              placeholder="Mật khẩu"
              placeholderTextColor={colors.gray_text_form}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
          </View>

          <TouchableOpacity onPress={login}>
            <View style={styles.buttonView}>
              {isLoading ? <ActivityIndicator size="small" color={colors.white} /> : <Text style={styles.textButton}>Đăng nhập</Text>}
            </View>
          </TouchableOpacity>

          <View style={styles.registerView}>
            <Text style={styles.textGray}>Chưa có tài khoản?</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
              <Text style={styles.textRegister}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
