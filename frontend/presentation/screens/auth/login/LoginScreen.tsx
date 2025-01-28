import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DefaultTextInput from '../../../components/DefaultTextInput';
import DefaultRoundedButton from '../../../components/DefaultRoundedButton';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigator/MainStackNavigator';

interface Props extends StackScreenProps<RootStackParamList, 'LoginScreen'> { };


export default function LoginScreen({ navigation, route }: Props) {
    return (
        <View style={styles.container}>
            <Image style={styles.imageBackground} source={require('../../../../assets/city.jpg')}
            />
            <View style={styles.form}>
                <Image source={require('../../../../assets/user.png')} style={styles.imageUser} />

                <Text style={styles.textLogin}>LOGIN</Text>

                <DefaultTextInput placeholder="Correo electrónico" value="" onChangeText={text => { }} keyboardType="email-address" icon={require('../../../../assets/email.png')} />

                <DefaultTextInput placeholder="Contraseña" value="hola" onChangeText={() => { }} icon={require('../../../../assets/password.png')} secureTextEntry={true} />


                <DefaultRoundedButton text="INICIAR SESIÓN" onPress={() => { }} backgroundColor="green" />

                <View style={styles.containerTextDontHaveAccount}>
                    <View style={styles.divider}></View>
                    <Text style={styles.textDontHaveAccount}>¿No tienes cuenta?</Text>
                    <View style={styles.divider}></View>
                </View>

                <DefaultRoundedButton text="REGISTRARSE" onPress={() => navigation.navigate('RegisterScreen')} backgroundColor='white' />

            </View>

        </View>
    );

}

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
        height: '70%',
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
