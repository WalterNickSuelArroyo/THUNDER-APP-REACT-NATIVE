import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
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
    textRegister: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 25,
        alignSelf: 'center',
    },
    back: {
        width: 35,
        height: 35,
        position: 'absolute',
        top: 20,
    },

});

export default styles;