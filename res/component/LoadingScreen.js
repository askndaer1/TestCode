import React from 'react'
import { StyleSheet, Text, View, Dimensions, Keyboard } from 'react-native'
const { width, height } = Dimensions.get('window');
import LottieView from 'lottie-react-native';
const LoadingScreen = ({ show }) => {

    if (!show)
        return <View />
    else {
        Keyboard.dismiss()

        return (
            <View style={{ position: 'absolute', backgroundColor: "#000000CC", width: "100%", height: height }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <LottieView autoPlay

                        style={{
                            width: 400,
                            height: 400,

                        }}
                        source={require('../../assets/loading.json')}
                    />
                </View>
            </View>
        )
    }
}

export default LoadingScreen

const styles = StyleSheet.create({})
