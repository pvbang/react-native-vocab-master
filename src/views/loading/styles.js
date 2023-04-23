import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
    },

    image: {
        top: -30,
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },

    text: {
        top: 200,
        color: colors.text_loading, 
        fontSize: 30, 
        fontWeight: 'bold',
        fontFamily: 'Roboto'
    },
});

export default styles;
