import { View, Text, Image, StatusBar } from 'react-native';
import React from 'react';
import styles from './styles';
import colors from '../../constants/colors';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor={colors.white} barStyle="light-content" />
      
      <Image source={require('../../images/logo.png')} style={styles.image} />
      <Text style={styles.text}>Vocab Master</Text>
    </View>
  );
};

export default LoadingScreen;
