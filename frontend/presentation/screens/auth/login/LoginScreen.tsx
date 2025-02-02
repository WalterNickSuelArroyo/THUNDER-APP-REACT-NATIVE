import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DefaultTextInput from '../../../components/DefaultTextInput';
import DefaultRoundedButton from '../../../components/DefaultRoundedButton';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigator/MainStackNavigator';
import styles from './Styles';
import { useState } from 'react';
import EmailValidator from '../../../utils/EmailValidator';
import { ApiRequestHandler } from '../../../../data/sources/remote/api/ApiRequestHandler';
import { AuthResponse } from '../../../../domain/models/AuthResponse';
import { defaultErrorResponse, ErrorResponse } from '../../../../domain/models/ErrorResponse';

interface Props extends StackScreenProps<RootStackParamList, 'LoginScreen'> { };


export default function LoginScreen({ navigation, route }: Props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (email === '' || password === '') {
            Alert.alert('Todos los campos son requeridos');
            return;
        }

        // if (!EmailValidator(email)) {
        //     Alert.alert('Correo electrónico inválido');
        //     return;
        // }

        await login(email, password);
    }

    const login = async (email: string, password: string): Promise<AuthResponse | ErrorResponse> => {
        try {
            const response = await ApiRequestHandler.post<AuthResponse>('auth/login', {
                email: email,
                password: password
            })
            console.log(response.data);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                const errorData: ErrorResponse = error.response.data;
                if (Array.isArray(errorData.message)) {
                    console.error('Errores multiples del servidor', errorData.message.join(', '));
                }
                else {
                    console.error('Error unico del servidor', errorData.message);
                }
                return errorData;
            } else {
                console.error('Error en la peticion', error.message);
                return defaultErrorResponse;
            }

        }

    };

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