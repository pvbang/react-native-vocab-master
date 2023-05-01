import React, { useState, useCallback, useEffect } from 'react';
import { View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat';

import styles from './styles';
import colors from '../../constants/colors';
import strings from '../../constants/string';

const logo = require('../../images/chatgpt.png');

const API_URL = 'https://api.openai.com/v1/completions';
const MAX_TOKENS = 1000;

const ChatGPTScreen = props => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    firstMessage();
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

  return (
    <SafeAreaView style={styles.container}>
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
                  <TouchableOpacity onPress={() => console.log('Custom button pressed')}>
                    <Image source={require('../../images/voice.png')} resizeMode={'center'} style={styles.image}/>
                  </TouchableOpacity>
                </View>
                <View style={styles.sendView}>
                  <Image source={require('../../images/send.png')} resizeMode={'center'} style={styles.image}/>
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
        messages={messages}
        alwaysShowSend={true}
        placeholder='Nhập tin nhắn của bạn...'
        dateFormat='DD/MM/YYYY'
        textInputStyle={styles.textInputStyle}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </SafeAreaView>
  );
}

export default ChatGPTScreen;