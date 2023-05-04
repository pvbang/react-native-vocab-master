import { StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../views/home/HomeScreen';
import ChatGPTScreen from '../views/chatgpt/ChatGPTScreen';
import CameraScreen from '../views/camera/CameraScreen';
import TranslateScreen from '../views/translate/TranslateScreen';
import ExercisesScreen from '../views/exercises/ExercisesScreen';
import VocabularyScreen from '../views/vocabulary/VocabularyScreen';
import MeaningScreen from '../views/meaning/MeaningScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="CameraAI"
            component={CameraScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Meaning"
            component={MeaningScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ChatGPT"
            component={ChatGPTScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Translate"
            component={TranslateScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Exercises"
            component={ExercisesScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Vocabulary"
            component={VocabularyScreen}
            options={{ headerShown: false }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
