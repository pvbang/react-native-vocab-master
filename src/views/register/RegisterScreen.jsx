import { Text, View, StatusBar, TextInput, TouchableOpacity, Image, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import colors from '../../constants/colors';

import Axios from 'axios';

const RegisterScreen = props => {
  const [ten, setTen] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  // const getUsers = async () => {
  //   try {
  //     Axios.get(`https://vocab-master-api.000webhostapp.com/api/users`)
  //       .then(res => {
  //         console.log(res.data);
  //       })
  //       .catch(error => console.log(error));
  //     // .finally(() => setIsLoading(false));

  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  const register = () => {
    if (ten == '' || email == '' || password == '' || password2 == '') {
      alert("Hãy nhập đủ thông tin");
    } else if (password == password2) {
      setIsLoading(true);
      Axios.post('https://vocab-master-api.000webhostapp.com/api/users/add', {
        name: ten,
        email: email,
        password: password,
      })
        .then(function (response) {
          setIsLoading(false);
          alert("Đăng ký thành công");
          console.log(response.data);
        })
        .catch(function (error) {
          isLoading(false);
          console.log(error.message);
        });
    } else {
      alert("Mật khẩu nhập lại không khớp");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor={colors.white} barStyle='dark-content' />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.imageLogoView}>
          <Image source={require('../../images/logo.png')} style={styles.image} />
          <Text style={styles.textImageLogo}>Vocab Master</Text>
        </View>

        <View style={styles.formView}>
          <Text style={styles.textForm}>Đăng ký!</Text>

          <View style={styles.inputView}>
            <TextInput
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

          <View style={styles.inputView}>
            <TextInput
              style={styles.textInput}
              placeholder="Nhập lại mật khẩu"
              placeholderTextColor={colors.gray_text_form}
              onChangeText={(text) => {
                setPassword2(text);
              }}
            />
          </View>

          <TouchableOpacity onPress={register}>
            <View style={styles.buttonView}>
              {isLoading ? <ActivityIndicator size="small" color={colors.white} /> : <Text style={styles.textButton}>Đăng ký</Text>}
            </View>
          </TouchableOpacity>

          <View style={styles.registerView}>
            <Text style={styles.textGray}>Đã có tài khoản?</Text>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Text style={styles.textRegister}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;
