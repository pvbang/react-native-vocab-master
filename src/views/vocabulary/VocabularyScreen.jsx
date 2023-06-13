import { Text, View, ScrollView, RefreshControl, TouchableOpacity, Image, StatusBar, TextInput, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import Voice from '@react-native-voice/voice';

import styles from './styles';
import colors from '../../constants/colors';
import wordlist from '../../constants/wordlist.json';

const VocabularyScreen = props => {
  // gộp mảng lại và loại bỏ mấy cái từ bị trùng
  const words = [...new Set([...wordlist.adjective, ...wordlist.adverb, ...wordlist.verb, ...wordlist.noun])];

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(words);
  const [showResults, setShowResults] = useState(false);

  const [isVoice, setIsVoice] = useState(false);

  const filterData = (value) => {
    const filteredData = words.filter((item) =>
      item.toLowerCase().includes(value.toString().toLowerCase())
    );
    setSearchResults(filteredData);
    setShowResults(true);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults(words);
    setShowResults(false);  // Ẩn danh sách kết quả tìm kiếm
  }

  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const speechStartHandler = e => {
    console.log('start record', e);
  };
  const speechEndHandler = e => {
    setIsVoice(false);
    console.log('stop record', e);
  };
  const speechResultsHandler = e => {
    const text = e.value[0];
    setSearchQuery(text);
    filterData(text);
    console.log(text);
  };
  const startRecording = async () => {
    try {
      await Voice.start('en-Us');
    } catch (error) {
      console.log('error', error);
    }
  };
  const stopRecording = async () => {
    try {
      await Voice.stop();
      setIsVoice(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const voice = () => {
    setIsVoice(!isVoice);
    if (!isVoice == true) {
      startRecording();
    } else if (!isVoice == false) {
      stopRecording();
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
        <Text style={styles.textTop}>Từ vựng</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.searchView}>
          <Image source={require('../../images/search.png')} style={styles.imgSearch} />
          <TextInput
            style={styles.search}
            placeholder="Tìm kiếm từ vựng"
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              filterData(text);
            }}
          />
          {showResults && (
            <TouchableOpacity onPress={clearSearch}>
              <Image source={require('../../images/reject.png')} style={styles.imgReject} />
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => voice()}>
            {isVoice ? (
              <Image source={require('../../images/voice-stop.png')} resizeMode={'center'} style={styles.imgVoice} />
            ) : (
              <Image source={require('../../images/voice.png')} resizeMode={'center'} style={styles.imgVoice} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.resultsView}>
          <FlatList
            data={searchResults}
            renderItem={({ item }) =>
              <View>
                <TouchableOpacity onPress={() =>
                  props.navigation.navigate('Meaning', {
                    data: item,
                  })
                }>
                  <View style={styles.viewTextResults}>
                    <Image source={require('../../images/search.png')} style={styles.imgSearch} />
                    <Text style={styles.textResults}>{item}</Text>
                    <Image source={require('../../images/top-left.png')} style={styles.imgTopLeft} />
                  </View>
                </TouchableOpacity>
                <View style={styles.hr}></View>
              </View>
            }
            keyExtractor={(item) => item.toString()}
            style={styles.searchResults}
          />
        </View>
      </View>
    </View>
  );
};

export default VocabularyScreen;