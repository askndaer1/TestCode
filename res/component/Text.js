import React from 'react'
import { StyleSheet, Text as NativeText } from 'react-native'
import { i18n } from '../Data/lang/i18n'
const Text = (props) => {
    return (
        <NativeText {...props}
            style={[
                props.style,
                { fontFamily: "arabicFont" },
                props.Bold && { fontFamily: "arabicFontBold" }
            ]} >
            {props.translate ? i18n.t(props.children) : props.children}

        </NativeText>
    )
}
Text.defaultProps = {
    translate: true,
};

export default Text

const styles = StyleSheet.create({})
