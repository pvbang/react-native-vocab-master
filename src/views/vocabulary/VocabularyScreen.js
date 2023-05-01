import { Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import strings from '../../constants/string';

const VocabularyScreen = props => {
  const sourceText = 'Hello, world!';
  const targetLanguage = 'vi';
  const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${strings.GOOGLE_API_KEY}`;

  const translation = async () => {
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: sourceText,
        target: targetLanguage,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const translatedText = data.data.translations[0].translatedText;
        console.log(translatedText);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  translation();

  return (
    <View style={styles.container}>
      <Text>VocabularyScreen</Text>


    </View>
  );
};

export default VocabularyScreen;
