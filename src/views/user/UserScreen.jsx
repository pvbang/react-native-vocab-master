import { Text, View, ScrollView, RefreshControl, TouchableOpacity, ActivityIndicator, Image, StatusBar, TextInput, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

import styles from './styles';
import colors from '../../constants/colors';

const UserScreen = props => {
  const [id, setID] = useState('');
  const [ten, setTen] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const getUser = async () => {
    try {
      const id = await AsyncStorage.getItem('@id_user')
      const name = await AsyncStorage.getItem('@name_user')
      const email = await AsyncStorage.getItem('@email_user')
      const password = await AsyncStorage.getItem('@password_user')

      setID(id);
      setTen(name);
      setEmail(email);
      setPassword(password);
    } catch (e) {
      console.log(e)
    }
  }

  const save = () => {
    setIsLoading(true);
    Axios.post('https://vocab-master-api.000webhostapp.com/api/users/update/'+id, {
      name: ten,
      email: email,
      password: password,
    })
      .then(function (response) {
        storeUser();
        alert("Chỉnh sửa thông tin thành công");
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsLoading(false);
        alert("Chỉnh sửa thông tin không thành công");
        console.log(error.message);
      });
  }

  const storeUser = async () => {
    try {
      await AsyncStorage.setItem('@id_user', '' + id)
      await AsyncStorage.setItem('@name_user', '' + ten)
      await AsyncStorage.setItem('@email_user', '' + email)
      await AsyncStorage.setItem('@password_user', '' + password)
    } catch (e) {
      console.log(e)
    }
  }

  React.useEffect(() => {
    getUser();
  }, [])

  const deleteUser = async () => {
    try {
      await AsyncStorage.setItem('@id_user', '')
      await AsyncStorage.setItem('@name_user', '')
      await AsyncStorage.setItem('@email_user', '')
      await AsyncStorage.setItem('@password_user', '')
      props.navigation.navigate('Login')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor={colors.primary} barStyle='light-content' />

      <View style={styles.top}>
        <TouchableOpacity style={styles.back}
          onPress={() => {
            props.navigation.goBack();
          }}
        >
          <Image source={require('../../images/back_white.png')} style={styles.backImg} />
        </TouchableOpacity>
        <Text style={styles.textTop}>Quản lý tài khoản</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.inputView}>
          <TextInput
            defaultValue={ten}
            style={styles.textInput}
            placeholder="Tên người dùng"
            placeholderTextColor={colors.gray_text_form}
            onChangeText={(text) => {
              setTen(text);
            }}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            defaultValue={email}
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
          secureTextEntry={true}
            defaultValue={password}
            style={styles.textInput}
            placeholder="Mật khẩu"
            placeholderTextColor={colors.gray_text_form}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
        </View>

        <TouchableOpacity onPress={save}>
          <View style={styles.buttonView}>
            {isLoading ? <ActivityIndicator size="small" color={colors.white} /> : <Text style={styles.textButton}>Lưu</Text>}
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={deleteUser}>
          <View style={styles.logoutView}>
            {isLoading ? <ActivityIndicator size="small" color={colors.white} /> : <Text style={styles.textLogout}>Đăng xuất</Text>}
          </View>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default UserScreen;