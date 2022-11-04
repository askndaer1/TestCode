import React from 'react'
import { StyleSheet, View } from 'react-native'
import Text from "../component/Text"
const Message = () => {
    return (
        <View style={styles.container}>
            <Text Bold>Messages</Text>
        </View>
    )
}

export default Message

const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', alignItems: 'center' } })
