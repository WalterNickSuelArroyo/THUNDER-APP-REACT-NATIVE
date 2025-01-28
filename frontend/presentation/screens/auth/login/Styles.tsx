import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        opacity: 0.5,
    },
    form: {
        width: '85%',
        height: '75%',
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 25,
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    imageUser: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginBottom: 20,
    },
    textLogin: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 25,
        alignSelf: 'center',
    },


    containerTextDontHaveAccount: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    textDontHaveAccount: {
        color: '#fff',
        fontSize: 15,
    },
    divider: {
        height: 1,
        width: 75,
        backgroundColor: '#fff',
        marginHorizontal: 5,
    },
});

export default styles;