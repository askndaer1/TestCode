import React from 'react'
import { StyleSheet, View } from 'react-native'
import { i18n } from '../Data/lang/i18n'
const MyView = (props) => {
    return (
        <View style={i18n.language == 'ar' && { flexDirection: 'row-reverse' }}>
            {props.children}
        </View>
    )
}
MyView.defaultProps = {
    translate: true,
};

export default MyView

const styles = StyleSheet.create({})
