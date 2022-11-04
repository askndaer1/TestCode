import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function divider(props) {
    return (
        <View style={styles.divider}>
            <View style={styles.hairline} />
            <Text style={styles.loginButtonBelowText1}>{props.title}</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    divider: {
        width: "96%",
        marginVertical: 20,
        height: 40,
        justifyContent: 'center', alignItems: 'center', alignSelf: 'center'
    }
    ,
    hairline: {
        backgroundColor: '#A2A2A2',
        height: 2,
        width: "100%",
        position: 'absolute',
    },

    loginButtonBelowText1: {

        fontSize: 14,
        paddingHorizontal: 5,
        alignSelf: 'center',
        color: '#fff',
        backgroundColor: '#bdc3c7', width: 30,
        borderRadius: 20,
        height: 30,
        fontSize: 14,
        lineHeight: 30, textAlign: 'center'
    },
})
