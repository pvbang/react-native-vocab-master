import { Text, View, ScrollView, RefreshControl, TouchableOpacity, Image, StatusBar, TextInput, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import styles from './styles';
import colors from '../../constants/colors';

const HistoryScreen = props => {
  const [id, setID] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
        const id = await AsyncStorage.getItem('@id_user')
        setID(id);

        axios.get('https://vocab-master-api.000webhostapp.com/api/historys/user/'+id)
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
        <Text style={styles.textTop}>Lịch sử tìm kiếm</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.resultsView}>
          <FlatList
            data={data}
            renderItem={({ item }) =>
              <View>
                <TouchableOpacity onPress={() =>
                  props.navigation.navigate('Meaning', {
                    data: item.word,
                  })
                }>
                  <View style={styles.viewTextResults}>
                    <Image source={require('../../images/history.png')} style={styles.imgSearch} />
                    <Text style={styles.textResults}>{item.word}</Text>
                    <Image source={require('../../images/top-left.png')} style={styles.imgTopLeft} />
                  </View>
                </TouchableOpacity>
                <View style={styles.hr}></View>
              </View>
            }
            keyExtractor={(item) => item.id.toString()}
            style={styles.searchResults}
          />
        </View>

      </View>
    </View>
  );
};

export default HistoryScreen;