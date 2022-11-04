import React from 'react'
import { StyleSheet, View } from 'react-native'
import Text from './Text'
import TextFieldRoot from './TextFieldRoot'
const TextField = (props) => {
    return (<View style={{ width: "100%", marginBottom: 20 }}>
        <Text style={{ margin: 5 }}>
            {props.title}
        </Text>
        <TextFieldRoot
            style={styles.input}
            placeholderTextColor={"#dedede"}
            {...props}
        />
    </View>
    )
}

export default TextField

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
