import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './styles';
import { useRoute } from '@react-navigation/native';

const MeaningScreen = props => {
    const route = useRoute();
    const [data, setdata] = useState([]);
    useEffect(() => {
        setdata(route.params.data);
    }, []);

    return (
        <View>
            <Text>{data}</Text>
        </View>
    );
};

export default MeaningScreen;
