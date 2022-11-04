import React, { useState } from 'react'
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native'
import Text from './Text'
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
const TextFieldPassword = (props) => {
    const [isShow, setIsShow] = useState(true);
    return (<View style={{ width: "100%", marginBottom: 20 }}>
        <View>
            <TextInput
                style={styles.input}
                // onChangeText={onChangeNumber}
                // value={"ddsdsd"}

                placeholderTextColor={"#8a8a8a"}
                // keyboardType="numeric"
                {...props}
            />
            <TouchableOpacity

                style={{ borderRadius: 10, backgroundColor: "#c9c9c9", position: "absolute", margin: 4, height: 42, width: 42, justifyContent: "center", alignItems: 'center' }}>
                <AntDesign name="search1" size={24} color="#8f8f8f" />
            </TouchableOpacity>

        </View>
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
        textAlign: "right",
        paddingHorizontal: 20,
        fontFamily: "arabicFont"

    }
})
