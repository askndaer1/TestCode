import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Text from "../component/Text"
import { Colors } from './constant';
const Button = (props) => {
    return (
        <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center", borderRadius: 25, backgroundColor: Colors.Primary, width: "80%", height: 50, marginTop: 30, alignSelf: 'center' }}
            {...props}
        >
            <Text Bold style={{ fontSize: 14, color: "#fff" }}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({})
