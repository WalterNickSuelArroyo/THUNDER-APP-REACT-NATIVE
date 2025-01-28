import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from './Styles';
import DefaultTextInput from "../../../components/DefaultTextInput";
import DefaultRoundedButton from "../../../components/DefaultRoundedButton";
import { RootStackParamList } from "../../../navigator/MainStackNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { useState } from "react";
import EmailValidator from "../../../utils/EmailValidator";
import PasswordValidator from "../../../utils/PasswordValidator";
import PhoneValidator from "../../../utils/PhoneValidator";

interface Props extends StackScreenProps<RootStackParamList, 'RegisterScreen'> { };

export default function RegisterScreen({ navigation, route }: Props) {

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        if (name === '' || lastName === '' || email === '' || phone === '' || password === '' || confirmPassword === '') {
            Alert.alert('Todos los campos son requeridos');
            return;
        }

        if (!EmailValidator(email)) {
            Alert.alert('Correo electrónico inválido');
            return;
        }

        if (!PhoneValidator(phone)) {
            Alert.alert('Teléfono inválido, debe tener 9 dígitos');
            return;
        }

        if (!PasswordValidator(password)) {
            Alert.alert('Contraseña inválida, debe tener al menos 6 caracteres');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Las contraseñas no coinciden');
            return;
        }

        console.log("Name: ", name);
        console.log("Last Name: ", lastName);
        console.log("Email: ", email);
        console.log("Phone: ", phone);
        console.log("Password: ", password);
        console.log("Confirm Password: ", confirmPassword);

    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}} >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>
                <View style={styles.container}>
                    <Image style={styles.imageBackground} source={require('../../../../assets/city.jpg')} />
                    <View style={styles.form}>
                        <TouchableOpacity onPress={() => navigation.pop()}>
                            <Image source={require('../../../../assets/left_arrow.png')} style={styles.back} />
                        </TouchableOpacity>
                        <Image source={require('../../../../assets/user.png')} style={styles.imageUser} />
                        <Text style={styles.textRegister}>REGISTRARSE</Text>

                        <DefaultTextInput placeholder="Nombre" value={name} onChangeText={setName} icon={require('../../../../assets/user.png')} />

                        <DefaultTextInput placeholder="Apellido" value={lastName} onChangeText={setLastName} icon={require('../../../../assets/user_image.png')} />

                        <DefaultTextInput placeholder="Correo electrónico" value={email} onChangeText={setEmail} keyboardType="email-address" icon={require('../../../../assets/email.png')} />

                        <DefaultTextInput placeholder="Teléfono" value={phone} onChangeText={setPhone} keyboardType="numeric" icon={require('../../../../assets/phone.png')} />

                        <DefaultTextInput placeholder="Contraseña" value={password} onChangeText={setPassword} icon={require('../../../../assets/password.png')} secureTextEntry={true} />

                        <DefaultTextInput placeholder="Confirmar contraseña" value={confirmPassword} onChangeText={setConfirmPassword} icon={require('../../../../assets/password.png')} secureTextEntry={true} />

                        <DefaultRoundedButton text="REGISTRARSE" onPress={() => {
                            handleRegister()
                        }} backgroundColor="black" />
                    </View>
                </View>
            </ScrollView>

        </KeyboardAvoidingView>


    );
}