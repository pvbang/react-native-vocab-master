import { Text, View, TouchableOpacity } from 'react-native';
import React, { useState }  from 'react';
// import Voice from '@react-native-voice/voice';

import styles from './styles';

const VocabularyScreen = props => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isVoice, setIsVoice] = useState(false);

  // Voice.onSpeechStart = () => setIsVoice(true);
  // Voice.onSpeechEnd = () => setIsVoice(false);
  // Voice.onSpeechError = err => setError(err.error);
  // Voice.onSpeechResults = result => setResult(result.value[0]);

  const startVoice = async () => {
    try {
      // await Voice.start('en-US');
    } catch (err) {
      setError(err);
    }
  }

  const stopVoice = async () => {
    try {
      // await Voice.stop();
    } catch (err) {
      setError(err);
    }
  }

  return (
    <View>
      <Text>VocabularyScreen</Text>

      <Text>{result}</Text>
      <Text>{error}</Text>
      <Text>{isVoice}</Text>
      {/* onPress={isVoice ? startVoice : stopVoice} */}
      <TouchableOpacity >
        <Text>{isVoice ? 'Stop' : 'Start'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VocabularyScreen;
