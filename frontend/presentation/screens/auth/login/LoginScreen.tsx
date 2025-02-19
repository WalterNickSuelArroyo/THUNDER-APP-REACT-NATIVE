import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DefaultTextInput from '../../../components/DefaultTextInput';
import DefaultRoundedButton from '../../../components/DefaultRoundedButton';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigator/MainStackNavigator';
import styles from './Styles';
import { useEffect, useState } from 'react';
import EmailValidator from '../../../utils/EmailValidator';
import { container } from '../../../../di/container';
import { useAuth } from '../../../hooks/useAuth';

interface Props extends StackScreenProps<RootStackParamList, 'LoginScreen'> { };


export default function LoginScreen({ navigation, route }: Props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginViewModel = container.resolve('loginViewModel');

    const { authResponse, saveAuthSession } = useAuth();

    useEffect(() => {
        if (authResponse !== null && authResponse !== undefined) {
            if (authResponse.user.roles!.length > 1) {
                navigation.replace('RolesScreen');
            } else {
                navigation.replace('ClientHomeScreen')
            }

        }

    }, [authResponse])

    const handleLogin = async () => {
        if (email === '' || password === '') {
            Alert.alert('Todos los campos son requeridos');
            return;
        }

        if (!EmailValidator(email)) {
            Alert.alert('Correo electrónico inválido');
            return;
        }

        const response = await loginViewModel.login(email, password);

        if ('token' in response) {
            saveAuthSession(response);


            console.log('Login exitoso');
        }
        console.log(response);
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


                <DefaultRoundedButton text="INICIAR SESIÓN" onPress={() => {
                    handleLogin()
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