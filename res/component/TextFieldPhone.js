import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import Text from './Text'
import MyView from './MyView'
import TextFieldRoot from './TextFieldRoot'
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const TextFieldPhone = (props) => {

    const phoneNumber = (num) => {
        const phoneno = /^\d{10}$/;
        if (num.match(phoneno))
            return true;
        else
            return false;
    }

    return (<View style={{ width: "100%", marginBottom: 20 }}>
        <Text style={{ margin: 5 }}>
            {props.title}
        </Text>
        <MyView>
            <TextFieldRoot
                style={[styles.input, { paddingHorizontal: 60 }]}
                // onChangeText={onChangeNumber}
                // value={"ddsdsd"}

                placeholderTextColor={"#dedede"}
                keyboardType="numeric"
                {...props}
            />
            <TouchableOpacity
                style={{ borderRadius: 10, backgroundColor: "#c9c9c9", position: "absolute", margin: 4, height: 42, width: 42, justifyContent: "center", alignItems: 'center' }}>
                <Text style={{ margin: 5 }}>
                    006
                </Text>
            </TouchableOpacity>
            {/* {props.value != '' &&
                !phoneNumber(props.value) &&
                <Text style={{ margin: 5, fontSize: 12, color: "red" }}>
                    رقم الهاتف غير صحيح
                </Text>
            } */}
        </MyView>
    </View>
    )
}

export default TextFieldPhone

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
