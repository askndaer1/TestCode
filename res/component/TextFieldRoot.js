import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

import { i18n } from '../Data/lang/i18n'
const TextFieldRoot = (props) => {
    return (<View style={{ width: "100%" }}>
        <TextInput

            placeholderTextColor={"#dedede"}
            {...props}
            placeholder={i18n.t(props.placeholder)}
            style={[styles.input, i18n.language == 'ar' && { textAlign: 'right' }, props.style]}
        />
    </View>
    )
}

export default TextFieldRoot

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
        // textAlign: "right",
        paddingHorizontal: 20,
        fontFamily: "arabicFont"

    }
})
