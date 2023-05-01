import { Text, View, ScrollView, RefreshControl, TouchableOpacity, Image, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import SoundPlayer from 'react-native-sound-player';

import styles from './styles';
import colors from '../../constants/colors';
import strings from '../../constants/string';

const MeaningScreen = props => {
    const route = useRoute();
    const [isLoading, setIsLoading] = useState(true);

    const [word, setWord] = useState([]);               // từ vựng
    const [phonetic, setPhonetic] = useState(null);       // ngữ âm
    const [audio, setAudio] = useState(null);             // audio
    const [partOfSpeech, setPartOfSpeech] = useState([]);   // noun, v, adj,...
    const [definition, setDefinition] = useState([]);       // định nghĩa
    const [example, setExample] = useState([]);         // ví dụ
    const [synonyms, setSynonyms] = useState([]);       // từ đồng nghĩa
    const [antonyms, setAntonyms] = useState([]);       // từ trái nghĩa
    const [urlWiki, setUrlWiki] = useState(null);         // url wiktionary

    const [wordVN, setWordVN] = useState(null);
    const [partOfSpeechVN, setPartOfSpeechVN] = useState(null);
    const [definitionVN, setDefinitionVN] = useState(null);
    const [exampleVN, setExampleVN] = useState(null);

    useEffect(() => {
        setWord(route.params.data);
    }, []);

    const getData = async () => {
        if (isLoading == true) {
            try {
                axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
                    .then(res => {
                        setIsLoading(false);
                        console.log(res.data);
                        translation(word, "word");

                        setPhonetic(res.data[0].phonetic);
                        try {
                            setAudio(res.data[0].phonetics[0].audio);
                        } catch (e1) {
                            console.log(e1);
                        }
                        try {
                            setPartOfSpeech(res.data[0].meanings[0].partOfSpeech);
                            translation(res.data[0].meanings[0].partOfSpeech, "partOfSpeech");

                            setDefinition(res.data[0].meanings[0].definitions[0].definition);
                            translation(res.data[0].meanings[0].definitions[0].definition, "definition");

                            setExample(res.data[0].meanings[0].definitions[0].example);
                            translation(res.data[0].meanings[0].definitions[0].example, "example");

                            setSynonyms(res.data[0].meanings[0].synonyms);
                            setAntonyms(res.data[0].meanings[0].antonyms);
                        } catch (e2) {
                            console.log(e2);
                        }

                        setUrlWiki(res.data[0].sourceUrls);

                    })
                    .catch(error => console.log(error));
            } catch (e) {
                console.log(e)
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

    const translation = (text, type) => {
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
            .then(response => {
                return response.json();
            })
            .then(data => {
                const translatedText = data.data.translations[0].translatedText;
                if (type == "word") {
                    setWordVN(translatedText);
                    console.log(wordVN);
                } else if (type == "partOfSpeech") {
                    setPartOfSpeechVN(translatedText);
                    console.log(partOfSpeechVN);
                } else if (type == "definition") {
                    setDefinitionVN(translatedText);
                } else if (type == "example") {
                    setExampleVN(translatedText);
                } else {
                    console.log(type);
                    console.log(translatedText);
                }
            })
            .catch(error => {
                console.log('There was a problem with the fetch operation:', error);
            });
    }

    getData();
    // console.log(synonyms);

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

                    <View style={styles.row2}>
                        <Image source={require('../../images/deduce.png')} style={styles.imageRow2} />
                        <Text style={styles.textContentGreenBold}>{wordVN}</Text>
                    </View>

                    <Text style={styles.textContentBlackBold}>{partOfSpeechVN} ({partOfSpeech})</Text>

                    {definition && (
                        <Text style={styles.textContentBlack}>{definition}</Text>
                    )}
                    {definition && (
                        <View style={styles.row2}>
                            <Image source={require('../../images/deduce.png')} style={styles.imageRow2} />
                            <Text style={styles.textContentGreen}>{definitionVN}</Text>
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

                    <View style={styles.marginTop10}>
                        <Text style={styles.textContentBlackBold}>Website: {urlWiki}</Text>
                    </View>

                </ScrollView>
            </View>

        </View>
    );
};

export default MeaningScreen;