import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
   
    center: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },

    bottom: {
        position: 'absolute',
        bottom: 5,
        alignSelf: 'center'
    },

    row: {
        flexDirection: 'row', 
        alignItems: 'center',
    },

    column: {
        flexDirection: 'column', 
        alignItems: 'center',
        margin: 9,
        // backgroundColor: colors.black,
    },

    text: {
        color: colors.primary_black, 
        fontSize: 14, 
        fontWeight: 'bold',
        fontFamily: 'Roboto'
    },

    image: {
        height: 50, 
        width: 50
    }

});

export default styles;
