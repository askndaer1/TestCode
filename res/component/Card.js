import React from 'react'
import { StyleSheet, Image, View, Dimensions, TouchableOpacity } from 'react-native'

import { Shadow } from './constant'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Card = ({ children, onPress }) => {
    return (
        <TouchableOpacity style={[styles.card, Shadow]} onPress={onPress}>
            {/* <Image resizeMode="stretch" source={require('../../assets/back/cardbgTwo.png')} style={{ position: 'absolute', height: "100%", width: '100%' }} /> */}
            { children}
        </TouchableOpacity>
    )
}

export default Card

const styles = StyleSheet.create({

    card: {
        width: "46%",
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 10,
        marginLeft: "2%",
        marginRight: "2%",
        overflow: "hidden",

    }
})
