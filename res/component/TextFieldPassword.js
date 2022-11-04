import React, { useState } from 'react'
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native'
import Text from './Text'
import MyView from './MyView'
import TextFieldRoot from './TextFieldRoot'
import { AntDesign } from '@expo/vector-icons';
import { i18n } from '../Data/lang/i18n'
const TextFieldPassword = (props) => {
    const [isShow, setIsShow] = useState(true);
    return (<View style={{ width: "100%", marginBottom: 20 }}>
        <Text style={{ margin: 5 }}>
            {props.title}
        </Text>
        <MyView>
            <TextFieldRoot
                style={[styles.input, { paddingHorizontal: 60 }]}
                // onChangeText={onChangeNumber}
                // value={"ddsdsd"}
                secureTextEntry={isShow}
                placeholderTextColor={"#dedede"}
                // keyboardType="numeric"
                {...props}
            />
            <TouchableOpacity onPressIn={() => { setIsShow(false) }}
                onPressOut={() => { setIsShow(true) }}
                style={{ borderRadius: 10, backgroundColor: "#c9c9c9", position: "absolute", margin: 4, height: 42, width: 42, justifyContent: "center", alignItems: 'center' }}>
                <AntDesign name="eye" size={24} color="#8f8f8f" />
            </TouchableOpacity>

        </MyView>
    </View>
    )
}

export default TextFieldPassword

const styles = StyleSheet.create({
    input: {
        width: "100%",
        height: 50,
        borderRadius: 10,
        // margin: 12,
        borderWidth: 1,
        backgroundColor: "#f0f0f0",
        borderColor: "#f0f0f0",
        padding: 10,
        paddingHorizontal: 20,
        fontFamily: "arabicFont"

    }
})
