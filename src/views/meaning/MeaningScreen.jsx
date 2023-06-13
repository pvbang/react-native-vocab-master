import { Text, View, ScrollView, RefreshControl, TouchableOpacity, Image, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import SoundPlayer from 'react-native-sound-player';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';
import colors from '../../constants/colors';
import strings from '../../constants/string';

const MeaningScreen = props => {
    const route = useRoute();
    const [id, setID] = useState('');
    const [bookmark, setBookmark] = useState(false);
    const [bookmarkID, setBookmarkID] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const [word, setWord] = useState([]);                   // từ vựng
    const [phonetic, setPhonetic] = useState(null);         // ngữ âm
    const [audio, setAudio] = useState(null);               // audio
    const [partOfSpeech, setPartOfSpeech] = useState(null);     // noun
    const [partOfSpeech2, setPartOfSpeech2] = useState(null);   // verb
    const [partOfSpeech3, setPartOfSpeech3] = useState(null);   // adj
    const [definition, setDefinition] = useState(null);         // định nghĩa
    const [definition2, setDefinition2] = useState(null);
    const [definition3, setDefinition3] = useState(null);
    const [example, setExample] = useState(null);           // ví dụ
    const [synonyms, setSynonyms] = useState([]);           // từ đồng nghĩa
    const [antonyms, setAntonyms] = useState([]);           // từ trái nghĩa
    const [urlWiki, setUrlWiki] = useState(null);           // url wiktionary

    // dịch sang tiếng việt
    const [wordVN, setWordVN] = useState(null);
    const [partOfSpeechVN, setPartOfSpeechVN] = useState(null);
    const [partOfSpeechVN2, setPartOfSpeechVN2] = useState(null);
    const [partOfSpeechVN3, setPartOfSpeechVN3] = useState(null);
    const [definitionVN, setDefinitionVN] = useState(null);
    const [definitionVN2, setDefinitionVN2] = useState(null);
    const [definitionVN3, setDefinitionVN3] = useState(null);
    const [exampleVN, setExampleVN] = useState(null);

    useEffect(() => {
        setWord(route.params.data);
        getUser();
    }, []);

    useEffect(() => {
        getData();
    }, [word]);

    useEffect(() => {
        if (!bookmark) {
            deleteBookmark();
        }
    }, [bookmark]);

    const changeBookmark = () => {
        if (bookmark) {
            deleteBookmark();
            setBookmark(false);
        } else {
            addBookmark();
            setBookmark(true);
        }
    } 

    const getUser = async () => {
        try {
            const id = await AsyncStorage.getItem('@id_user')
            setID(id);

            axios.get('https://vocab-master-api.000webhostapp.com/api/bookmarks/user/'+id+'/'+route.params.data)
            .then(function (response) {
                console.log(response.data.length);
                console.log(response.data);
                if (response.data.length != 0) {
                    setBookmark(true);
                    setBookmarkID(response.data[0].id)
                    console.log(response.data[0].id);
                } else {
                    setBookmark(false);
                }
            })
            .catch(function (error) {
                console.log(error.message);
            });
        } catch (e) {
            console.log(e)
        }
    }

    const deleteBookmark = async () => {
        try {
            axios.get('https://vocab-master-api.000webhostapp.com/api/bookmarks/delete/'+bookmarkID)
            .then(function (response) {
                console.log("delete bookmark");
            })
            .catch(function (error) {
                console.log(error.message);
            });
        } catch (e) {
            console.log(e)
        }
    }

    const addBookmark = () => {
        axios.post('https://vocab-master-api.000webhostapp.com/api/bookmarks/add', {
            id_user: id,
            word: word,
        })
            .then(function (response) {
                setBookmark(true);
            })
            .catch(function (error) {
                console.log(error.message);
            });
    }

    const getData = async () => {
        if (isLoading == true) {
            try {
                await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
                    .then(res => {
                        setIsLoading(false);
                        // console.log(res.data);

                        // word
                        translation(word).then(translatedText => {
                            setWordVN(translatedText);
                        }).catch(error => { console.log(error); });

                        // phonetic
                        setPhonetic(res.data[0].phonetic);

                        // audio
                        try {
                            setAudio(res.data[0].phonetics[0].audio);
                        } catch (e1) {
                            console.log(e1);
                        }

                        try {

                            // partOfSpeech
                            setPartOfSpeech(res.data[0].meanings[0].partOfSpeech);
                            translation(res.data[0].meanings[0].partOfSpeech).then(translatedText => {
                                setPartOfSpeechVN(translatedText.charAt(0).toUpperCase() + translatedText.slice(1).toLowerCase());
                            }).catch(error => { console.log(error); });

                            // definition
                            setDefinition(res.data[0].meanings[0].definitions[0].definition);
                            translation(res.data[0].meanings[0].definitions[0].definition).then(translatedText => {
                                setDefinitionVN(translatedText);
                            }).catch(error => { console.log(error); });

                            // meanings 2, 3
                            if (res.data[0].meanings.length == 2) {
                                setPartOfSpeech2(res.data[0].meanings[1].partOfSpeech);
                                translation(res.data[0].meanings[1].partOfSpeech).then(translatedText => {
                                    setPartOfSpeechVN2(translatedText.charAt(0).toUpperCase() + translatedText.slice(1).toLowerCase());
                                    console.log(translatedText);
                                }).catch(error => { console.log(error); });

                                setDefinition2(res.data[0].meanings[1].definitions[0].definition);
                                translation(res.data[0].meanings[1].definitions[0].definition).then(translatedText => {
                                    setDefinitionVN2(translatedText);
                                }).catch(error => { console.log(error); });
                            }
                            if (res.data[0].meanings.length == 3) {
                                setPartOfSpeech2(res.data[0].meanings[1].partOfSpeech);
                                translation(res.data[0].meanings[1].partOfSpeech).then(translatedText => {
                                    setPartOfSpeechVN2(translatedText.charAt(0).toUpperCase() + translatedText.slice(1).toLowerCase());
                                    console.log(translatedText);
                                }).catch(error => { console.log(error); });
                                setPartOfSpeech3(res.data[0].meanings[2].partOfSpeech);
                                translation(res.data[0].meanings[2].partOfSpeech).then(translatedText => {
                                    setPartOfSpeechVN3(translatedText.charAt(0).toUpperCase() + translatedText.slice(1).toLowerCase());
                                    console.log(translatedText);
                                }).catch(error => { console.log(error); });

                                setDefinition2(res.data[0].meanings[1].definitions[0].definition);
                                translation(res.data[0].meanings[1].definitions[0].definition).then(translatedText => {
                                    setDefinitionVN2(translatedText);
                                }).catch(error => { console.log(error); });
                                setDefinition3(res.data[0].meanings[2].definitions[0].definition);
                                translation(res.data[0].meanings[2].definitions[0].definition).then(translatedText => {
                                    setDefinitionVN3(translatedText);
                                }).catch(error => { console.log(error); });
                            }

                            // example
                            setExample(res.data[0].meanings[0].definitions[0].example);
                            translation(res.data[0].meanings[0].definitions[0].example).then(translatedText => {
                                setExampleVN(translatedText);
                            }).catch(error => { console.log(error); });

                            setSynonyms(res.data[0].meanings[0].synonyms);
                            setAntonyms(res.data[0].meanings[0].antonyms);
                        } catch (e2) {
                            console.log(e2);
                        }

                        setUrlWiki(res.data[0].sourceUrls);

                    })
                    .catch(error => console.log(error));
            } catch (e) {
                console.log(e);
            }

        }
    }

    const sound = () => {
        try {
            if (audio != null) {
                SoundPlayer.playUrl('' + audio);
            }
        } catch (e) {
            console.log(e)
        }
    }

    const translation = (text) => {
        return new Promise((resolve, reject) => {
            fetch(`https://translation.googleapis.com/language/translate/v2?key=${strings.GOOGLE_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    q: text,
                    target: 'vi',
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

    // getData();

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
                <Text style={styles.textTop}>{word}</Text>
                <View style={styles.bookmarkView}>
                    <TouchableOpacity onPress={changeBookmark}>
                        {bookmark ? <Image source={require('../../images/bookmark-check.png')} style={styles.bookmarkImage} /> : <Image source={require('../../images/bookmark.png')} style={styles.bookmarkImage} />}
                    </TouchableOpacity>
                </View>

            </View>

            <View style={styles.content}>
                <ScrollView style={styles.scrollView} refreshControl={
                    <RefreshControl refreshing={isLoading} colors={[colors.primary]} tintColor={colors.primary} />
                }>

                    <View style={styles.row}>
                        <Text style={styles.textContentBlackBold}>{word.toString().toLowerCase()}</Text>
                        <Text style={styles.textContentGray}>{phonetic}</Text>
                        {audio && (
                            <TouchableOpacity onPress={() => sound()} style={styles.audio} >
                                <Image source={require('../../images/sound.png')} style={styles.sound} />
                            </TouchableOpacity>
                        )}
                    </View>

                    {wordVN && (
                        <View style={styles.row2}>
                            <Image source={require('../../images/deduce.png')} style={styles.imageRow2} />
                            <Text style={styles.textContentGreenBold}>{wordVN}</Text>
                        </View>
                    )}

                    {partOfSpeechVN && (
                        <Text style={styles.textContentBlackBold}>{partOfSpeechVN} ({partOfSpeech})</Text>
                    )}

                    {definition && (
                        <Text style={styles.textContentBlack}>{definition}</Text>
                    )}
                    {definition && (
                        <View style={styles.row2}>
                            <Image source={require('../../images/deduce.png')} style={styles.imageRow2} />
                            <Text style={styles.textContentGreen}>{definitionVN}</Text>
                        </View>
                    )}

                    {partOfSpeechVN2 && (
                        <Text style={styles.textContentBlackBold}>{partOfSpeechVN2} ({partOfSpeech2})</Text>
                    )}

                    {definition2 && (
                        <Text style={styles.textContentBlack}>{definition2}</Text>
                    )}
                    {definition2 && (
                        <View style={styles.row2}>
                            <Image source={require('../../images/deduce.png')} style={styles.imageRow2} />
                            <Text style={styles.textContentGreen}>{definitionVN2}</Text>
                        </View>
                    )}

                    {partOfSpeechVN3 && (
                        <Text style={styles.textContentBlackBold}>{partOfSpeechVN3} ({partOfSpeech3})</Text>
                    )}

                    {definition3 && (
                        <Text style={styles.textContentBlack}>{definition3}</Text>
                    )}
                    {definition3 && (
                        <View style={styles.row2}>
                            <Image source={require('../../images/deduce.png')} style={styles.imageRow2} />
                            <Text style={styles.textContentGreen}>{definitionVN3}</Text>
                        </View>
                    )}

                    {example && (
                        <Text style={styles.textContentBlackBold}>Ví dụ:</Text>
                    )}
                    {example && (
                        <Text style={styles.textContentBlack}>{example}</Text>
                    )}
                    {example && (
                        <View style={styles.row2}>
                            <Image source={require('../../images/deduce.png')} style={styles.imageRow2} />
                            <Text style={styles.textContentGreen}>{exampleVN}</Text>
                        </View>
                    )}

                    {synonyms.length > 0 ? (
                        <Text style={styles.textContentBlackBold}>Từ đồng nghĩa:</Text>
                    ) : null}
                    {synonyms.map((item, index) => {
                        return <Text key={index} style={styles.textContentGreen}>{item}</Text>
                    })}

                    {antonyms.length > 0 ? (
                        <View style={styles.marginTop10}>
                            <Text style={styles.textContentBlackBold}>Từ trái nghĩa:</Text>
                        </View>
                    ) : null}
                    {antonyms.map((item, index) => {
                        return <Text key={index} style={styles.textContentGreen}>{item}</Text>
                    })}

                    {urlWiki && (
                        <View style={styles.marginVertical10}>
                            <Text style={styles.textContentBlackBold}>Website: {urlWiki}</Text>
                        </View>
                    )}

                    <View style={styles.marginVertical10}></View>

                </ScrollView>
            </View>

        </View>
    );
};

export default MeaningScreen;