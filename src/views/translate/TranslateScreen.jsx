import { Text, View, StatusBar, TouchableOpacity, Image, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';

import styles from './styles';
import colors from '../../constants/colors';
import strings from '../../constants/string';

const TranslateScreen = (props) => {
  const [inputLanguage, setInputLanguage] = useState('English');
  const [outputLanguage, setOutputLanguage] = useState('Vietnamese');
  const [textTranslate, setTextTranslate] = useState('');
  const [result, setResult] = useState('');
  const [target, setTarget] = useState('vi');

  const translation = (text) => {
    return new Promise((resolve, reject) => {
      fetch(`https://translation.googleapis.com/language/translate/v2?key=${strings.GOOGLE_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          target: target,
        }),
      })
        .then(response => response.json())
        .then(data => {
          const translatedText = data.data.translations[0].translatedText;
          resolve(translatedText);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  const reverseLanguage = () => {
    if (inputLanguage == "English") {
      setInputLanguage("Vietnamese");
      setOutputLanguage("English");
      setTarget('en');
    } else {
      setInputLanguage("English");
      setOutputLanguage("Vietnamese");
      setTarget('vi');
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
        <Text style={styles.textTop}>Translate</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.textTrans}>{inputLanguage}</Text>
          <Image source={require('../../images/sound.png')} style={styles.sound} />
        </View>

        <View style={styles.transView}>
          <TextInput
            style={styles.translateInput}
            placeholder="Nhập từ hoặc câu mà bạn muốn dịch"
            value={textTranslate}
            multiline={true}
            numberOfLines={1}
            onChangeText={(text) => {
              setTextTranslate(text);

              translation(text).then(translatedText => {
                setResult(translatedText);
              }).catch(error => { console.log(error); });
            }}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.textTrans}>{outputLanguage}</Text>
          <Image source={require('../../images/sound.png')} style={styles.sound} />
        </View>

        <View style={styles.transView}>
          <TextInput
            style={styles.translateInput}
            value={result}
            multiline={true}
            numberOfLines={1}
          />
        </View>
      </View>


      <View style={styles.bottom}>
        <TouchableOpacity style={styles.inputLanguage}
          onPress={() => console.log(inputLanguage)}>
          <Text style={styles.textLanguage}>{inputLanguage}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnReverse}
          onPress={() => reverseLanguage()}>
          <Image style={styles.imageReverse} source={require('../../images/reverse.png')} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.outputLanguage}
          onPress={() =>console.log(outputLanguage)}>
          <Text style={styles.textLanguage}>{outputLanguage}</Text>
        </TouchableOpacity>
      </View>
    </View >
  );
};

export default TranslateScreen;
