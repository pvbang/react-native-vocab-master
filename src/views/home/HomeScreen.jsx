import React from 'react';
import { Text, View, TouchableOpacity, Image, StatusBar } from 'react-native';
import styles from './styles';
import colors from '../../constants/colors';

export default function HomeScreen({navigation}) {
    return (
        <View style={styles.container}>
            <StatusBar animated={true} backgroundColor = {colors.white} barStyle='dark-content' />

            <View style={styles.bottom}>
                <View style={styles.center}>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.column}
                            onPress={() => navigation.navigate('CameraAI')}>
                            <Image style={styles.image} source={require('../../images/camera.png')} />
                            <Text style={styles.text}>Camera AI</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.column}
                            onPress={() => navigation.navigate('ChatGPT')}>
                            <Image style={styles.image} source={require('../../images/chatgpt.png')} />
                            <Text style={styles.text}>Chat AI</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.column}
                            onPress={() => navigation.navigate('Lectures')}>
                            <Image style={styles.image} source={require('../../images/lectures.png')} />
                            <Text style={styles.text}>Bài giảng</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.column}
                            onPress={() => navigation.navigate('Exercises')}>
                            <Image style={styles.image} source={require('../../images/english.png')} />
                            <Text style={styles.text}>Bài tập</Text>
                        </TouchableOpacity>
                
                        <TouchableOpacity style={styles.column}
                            onPress={() => navigation.navigate('Vocabulary')}>
                            <Image style={styles.image} source={require('../../images/books.png')} />
                            <Text style={styles.text}>Từ vựng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}
