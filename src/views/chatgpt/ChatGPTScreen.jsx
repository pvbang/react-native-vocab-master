import React, { useState, useCallback, useEffect } from 'react';
import { View, SafeAreaView, Image, TouchableOpacity, LogBox, StatusBar } from 'react-native';
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat';
import Voice from '@react-native-voice/voice';

import styles from './styles';
import colors from '../../constants/colors';
import strings from '../../constants/string';

const logo = require('../../images/chatgpt.png');

const API_URL = 'https://api.openai.com/v1/completions';
const MAX_TOKENS = 1000;

LogBox.ignoreLogs(['`new NativeEventEmitter()` was called with a non-null argument without the required `addListener` method.', '`new NativeEventEmitter()` was called with a non-null argument without the required `removeListeners` method.']);

const ChatGPTScreen = props => {
  const [messages, setMessages] = useState([]);
  const [isVoice, setIsVoice] = useState(false);
  const [voiceText, setVoiceText] = useState(null);

  useEffect(() => {
    firstMessage();

    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const firstMessage = () => {
    setMessages([
      {
        _id: 1,
        text: 'Hi there! How can I help you?.',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'ChatGPT',
          avatar: logo,
        },
      },
    ]);
  };

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    console.log(messages);
    const value = messages[0].text;
    callApi(value);
  }, []);

  const callApi = async value => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          `Bearer ${strings.OPEN_AI_KEY}`,
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: value,
        max_tokens: MAX_TOKENS,
        temperature: 0,
      }),
    });

    const data = await res.json();
    if (data) {
      const value = data?.choices[0]?.text.trimStart();
      console.log(value);
      addNewMessage(value);
    }
  };

  const addNewMessage = data => {
    const value = {
      _id: Math.random(999999999),
      text: data,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'ChatGPT',
        avatar: logo,
      },
    };

    setMessages(previousMessages => GiftedChat.append(previousMessages, value));
  };

  const speechStartHandler = e => {
    console.log('start record', e);
  };
  const speechEndHandler = e => {
    setIsVoice(false);
    console.log('stop record', e);
  };
  const speechResultsHandler = e => {
    const text = e.value[0];
    setVoiceText(text);
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
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor={colors.white} barStyle='dark-content' />
      <TouchableOpacity style={styles.back}
        onPress={() => {
          props.navigation.goBack();
        }}
      >
        <Image source={require('../../images/back.png')} style={styles.backImg} />
      </TouchableOpacity>

      <GiftedChat
        renderSend={(props) => {
          return (
            <Send {...props}>
              <View style={styles.row}>
                <View style={styles.voiceView}>
                  <TouchableOpacity onPress={() => voice()}>
                    {isVoice ? (
                      <Image source={require('../../images/voice-stop.png')} resizeMode={'center'} style={styles.image} />
                    ) : (
                      <Image source={require('../../images/voice.png')} resizeMode={'center'} style={styles.image} />
                    )}
                  </TouchableOpacity>
                </View>
                <View style={styles.sendView}>
                    <Image source={require('../../images/send.png')} resizeMode={'center'} style={styles.image} />
                </View>
              </View>
            </Send>
          );
        }}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: colors.primary
                }
              }}
            />
          );
        }}
        text={voiceText}
        messages={messages}
        alwaysShowSend={true}
        placeholder='Nhập tin nhắn của bạn...'
        dateFormat='DD/MM/YYYY'
        textInputStyle={styles.textInputStyle}
        onSend={messages => {
          onSend(messages); 
          console.log(voiceText);
          setVoiceText(null);
        }}
        onInputTextChanged={text => setVoiceText(text)}
        user={{
          _id: 1,
        }}
      />
    </SafeAreaView>
  );
}

export default ChatGPTScreen;