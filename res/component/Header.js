import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Colors } from './constant';
import Text from "../component/Text"
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { withDataStorageContext } from './../Data/context'
const Header = (props) => {
    const navigation = useNavigation();
    return (
        <View style={styles.header}>
            <Text Bold style={{ color: "#f3f3f3" }}>{props.title}</Text>
            <TouchableOpacity
                onPress={() => { navigation.navigate('Cart') }}
                style={{ justifyContent: 'center', alignItems: 'center', height: 40, width: 40, position: "absolute", left: 20, backgroundColor: "#fff", borderRadius: 30 }}>
                <Entypo name="shopping-cart" size={25} color={Colors.Primary} />
                {props.DataStorageProvider.Cart.length > 0 &&
                    <View style={{ justifyContent: 'center', alignItems: 'center', position: "absolute", right: -20, backgroundColor: "#e74c3c", height: 26, width: 26, borderRadius: 15 }}>
                        <Text style={{ color: "#fff" }}>{props.DataStorageProvider.Cart.length}</Text>
                    </View>
                }

            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => { navigation.navigate('SearchProduct') }}
                style={{ justifyContent: 'center', alignItems: 'center', height: 40, width: 40, position: "absolute", right: 20, backgroundColor: "#fff", borderRadius: 30 }}>
                <FontAwesome5 name="search" size={22} color={Colors.Primary} />
            </TouchableOpacity>
        </View>
    )
}

export default withDataStorageContext(Header)

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.Primary, height: 60,
        justifyContent: 'center', alignItems: 'center'
    }

})
