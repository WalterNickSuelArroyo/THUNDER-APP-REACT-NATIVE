import { StyleSheet, Text, TouchableOpacity } from "react-native"

interface Props {
    text: string,
    onPress: () => void,
    backgroundColor?: string,
}

const DefaultRoundedButton = ({text, onPress, backgroundColor}: Props) => {
    return (
        <TouchableOpacity style={[styles.roundedButton, {backgroundColor: backgroundColor || '#fff'}]} onPress={() => onPress()}>
            <Text style={styles.textButton}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    roundedButton: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        marginTop: 20,
    },
    textButton: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 15,
    },
})

export default DefaultRoundedButton;