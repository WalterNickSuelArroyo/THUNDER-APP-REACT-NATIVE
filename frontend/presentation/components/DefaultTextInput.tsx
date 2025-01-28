import { Image, KeyboardType, StyleSheet, TextInput, View } from "react-native";

interface Props {
    placeholder: string,
    value: string,
    onChangeText: (text: string) => void,
    keyboardType?: KeyboardType,
    icon: any,
    secureTextEntry?: boolean,
}

const DefaultTextInput = ({ placeholder, value, onChangeText, keyboardType='default', icon, secureTextEntry=false }: Props) => {
    return (
        <View style={styles.containerTextinput}>
            <Image source={icon} style={styles.textInputIcon} />
            <TextInput placeholder={placeholder} style={styles.textInput} placeholderTextColor='white' value={value} onChangeText={text => onChangeText(text)} keyboardType={keyboardType} secureTextEntry={secureTextEntry} />
        </View>
    );
}

const styles = StyleSheet.create({
    containerTextinput: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    textInput: {
        width: '80%',
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        color: '#fff',
        fontSize: 17,
    },
    textInputIcon: {
        width: 25,
        height: 25,
        marginRight: 10,
    },
});

export default DefaultTextInput;