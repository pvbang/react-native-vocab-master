import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },

    back: {
        width: 55, 
        height: 55, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: colors.back,
        borderRadius: 100,
        marginHorizontal: 14,
        marginTop: 11,
        position: 'absolute',
        zIndex: 100,
    },
    backImg: {
        width: 20, 
        height: 20, 
        zIndex: 99
    },
    
    row: {
        flexDirection: 'row',
        height: '100%',
    },

    textInputStyle: {
        color: '#000000',
        marginBottom: 0
    },

    voiceView: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    
    image: {
        width: 27,
        height: 27,
    },

    sendView: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingEnd: 15,
        paddingStart: 7
    },

    voice: {
        zIndex: 99
    }
});

export default styles;
