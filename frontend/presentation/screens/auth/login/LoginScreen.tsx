import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DefaultTextInput from '../../../components/DefaultTextInput';
import DefaultRoundedButton from '../../../components/DefaultRoundedButton';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigator/MainStackNavigator';
import styles from './Styles';
import { useState } from 'react';
import EmailValidator from '../../../utils/EmailValidator';

interface Props extends StackScreenProps<RootStackParamList, 'LoginScreen'> { };


export default function LoginScreen({ navigation, route }: Props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (email === '' || password === '') {
            Alert.alert('Todos los campos son requeridos');
            return;
        }

        if (!EmailValidator(email)) {
            Alert.alert('Correo electrónico inválido');
            return;
        }


        console.log(email);
        console.log(password);
    }

    return (
        <View style={styles.container}>
            <Image style={styles.imageBackground} source={require('../../../../assets/city.jpg')}
            />
            <View style={styles.form}>
                <Image source={require('../../../../assets/user.png')} style={styles.imageUser} />

                <Text style={styles.textLogin}>LOGIN</Text>

                <DefaultTextInput placeholder="Correo electrónico" value={email} onChangeText={setEmail} keyboardType="email-address" icon={require('../../../../assets/email.png')} />

                <DefaultTextInput placeholder="Contraseña" value={password} onChangeText={setPassword} icon={require('../../../../assets/password.png')} secureTextEntry={true} />


                <DefaultRoundedButton text="INICIAR SESIÓN" onPress={() => { handleLogin()
                }} backgroundColor="red" />

                <View style={styles.containerTextDontHaveAccount}>
                    <View style={styles.divider}></View>
                    <Text style={styles.textDontHaveAccount}>¿No tienes cuenta?</Text>
                    <View style={styles.divider}></View>
                </View>

                <DefaultRoundedButton text="REGISTRARSE" onPress={() => navigation.navigate('RegisterScreen')} backgroundColor='black' />

            </View>

        </View>
    );
}