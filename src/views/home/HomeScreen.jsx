import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, StatusBar, TextInput, FlatList, ScrollView } from 'react-native';
import Voice from '@react-native-voice/voice';

import styles from './styles';
import colors from '../../constants/colors';
import wordlist from '../../constants/wordlist.json';

import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = props => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const [isVoice, setIsVoice] = useState(false);

    // gộp mảng lại và loại bỏ mấy cái từ bị trùng
    const words = [...new Set([...wordlist.adjective, ...wordlist.adverb, ...wordlist.verb, ...wordlist.noun])];

    const filterData = (value) => {
        const filteredData = words.filter((item) =>
            // item.toLowerCase().includes(value.toString().toLowerCase())
            item.toLowerCase() == value.toString().toLowerCase()
        );
        setSearchResults(filteredData);
        setShowResults(true);
    };

    const clearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
        setShowResults(false); // Ẩn danh sách kết quả tìm kiếm
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
        stopRecording();
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

    const user = async () => {
        try {
            const id = await AsyncStorage.getItem('@id_user')

            if (id != null) {
                props.navigation.navigate('User');
            } else {
                props.navigation.navigate('Login')
            }

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar animated={true} backgroundColor={colors.primary} barStyle='light-content' />

            <View style={styles.top}>
                <Text style={styles.textTop}>Vocab Master</Text>
                <TouchableOpacity style={styles.back}
                    onPress={() => {
                        user();
                    }}
                >
                    <Image source={require('../../images/user.png')} style={styles.backImg} />
                </TouchableOpacity>

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
                {showResults && (
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
                                    {/* <View style={styles.hr}></View> */}
                                </View>
                            }
                            keyExtractor={(item) => item.toString()}
                            style={styles.searchResults}
                        />
                    </View>
                )}

                <ScrollView style={styles.midView} showsVerticalScrollIndicator={false}>
                    <View style={styles.flatView}>
                        <Text style={styles.flatText}>Nhận diện từ vựng bằng hình ảnh</Text>
                        <Text style={styles.flatText2}>Camera AI</Text>

                        <TouchableOpacity style={styles.flatButtonView} onPress={() => props.navigation.navigate('CameraAI')}>
                            <Text style={styles.flatButtonText}>Khám phá</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.flatView}>
                        <Text style={styles.flatText}>Trò chuyện cùng với AI để cải thiện khả năng giao tiếp</Text>
                        <Text style={styles.flatText2}>Chat AI</Text>

                        <TouchableOpacity style={styles.flatButtonView} onPress={() => props.navigation.navigate('ChatGPT')}>
                            <Text style={styles.flatButtonText}>Khám phá</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.flatView}>
                        <Text style={styles.flatText}>Dịch đoạn văn, từ vựng</Text>
                        <Text style={styles.flatText2}>Translate</Text>

                        <TouchableOpacity style={styles.flatButtonView} onPress={() => props.navigation.navigate('Translate')}>
                            <Text style={styles.flatButtonText}>Khám phá</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.flatView}>
                        <Text style={styles.flatText}>Các từ vựng đã được đánh dấu</Text>
                        <Text style={styles.flatText2}>Bookmark</Text>

                        <TouchableOpacity style={styles.flatButtonView} onPress={() => props.navigation.navigate('Bookmark')}>
                            <Text style={styles.flatButtonText}>Khám phá</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.flatView}>
                        <Text style={styles.flatText}>Danh sách các từ vựng</Text>
                        <Text style={styles.flatText2}>Từ vựng</Text>

                        <TouchableOpacity style={styles.flatButtonView} onPress={() => props.navigation.navigate('Vocabulary')}>
                            <Text style={styles.flatButtonText}>Khám phá</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.flatView}>
                        <Text style={styles.flatText}>Lịch sử tìm kiếm</Text>
                        <Text style={styles.flatText2}>History</Text>

                        <TouchableOpacity style={styles.flatButtonView} onPress={() => props.navigation.navigate('History')}>
                            <Text style={styles.flatButtonText}>Khám phá</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <View style={styles.bottom}>
                    <View style={styles.center}>
                        <View style={styles.row}>
                            <TouchableOpacity style={styles.column}
                                onPress={() => props.navigation.navigate('CameraAI')}>
                                <Image style={styles.image} source={require('../../images/camera.png')} />
                                <Text style={styles.text}>Camera AI</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.column}
                                onPress={() => props.navigation.navigate('ChatGPT')}>
                                <Image style={styles.image} source={require('../../images/chatgpt.png')} />
                                <Text style={styles.text}>Chat AI</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.column}
                                onPress={() => props.navigation.navigate('Translate')}>
                                <Image style={styles.image} source={require('../../images/logo.png')} />
                                <Text style={styles.text}>Translate</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.column}
                                onPress={() => props.navigation.navigate('Exercises')}>
                                <Image style={styles.image} source={require('../../images/english.png')} />
                                <Text style={styles.text}>Bài tập</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.column}
                                onPress={() => props.navigation.navigate('Vocabulary')}>
                                <Image style={styles.image} source={require('../../images/books.png')} />
                                <Text style={styles.text}>Từ vựng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default HomeScreen;
