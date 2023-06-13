import { Text, View, ScrollView, RefreshControl, TouchableOpacity, Image, StatusBar, TextInput, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import styles from './styles';
import colors from '../../constants/colors';

const ExercisesScreen = props => {
  const [id, setID] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      axios.get('https://vocab-master-api.000webhostapp.com/api/exercises')
        .then(function (response) {
          console.log(response.data);
          setData(response.data);
        })
        .catch(function (error) {
          console.log(error.message);
        });
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
        <Text style={styles.textTop}>Exercises</Text>
      </View>

      <View style={styles.content}>
        <ScrollView style={styles.midView} showsVerticalScrollIndicator={false}>

{data.map((ex) => {
            return (
              <View key={ex.id} style={styles.flatView}>
                <Text style={styles.flatText}>{ex.name_exercise}</Text>
                <Text style={styles.flatText2}>Exercise {ex.id}</Text>

                <TouchableOpacity style={styles.flatButtonView} onPress={() => props.navigation.navigate('CameraAI')}>
                  <Text style={styles.flatButtonText}>Học</Text>
                </TouchableOpacity>
              </View>
            )
          })}
          

        </ScrollView>
      </View>
    </View>
  );
};

export default ExercisesScreen;