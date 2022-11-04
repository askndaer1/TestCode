import React, { useRef, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Image } from 'react-native'
import Header from './Header'
import LottieView from 'lottie-react-native';
import { Colors, Currency, Category } from '../component/constant'
const Screen = (props) => {



    if (props.loading) {

        return (
            <SafeAreaView style={styles.container}>
                <Header props={props} title={props.title} />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <LottieView autoPlay

                        style={{
                            width: 400,
                            height: 400,

                        }}
                        source={require('../../assets/loading.json')}
                    />
                </View>
            </SafeAreaView>)
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={Colors.Primary} />
            {!props.isHiddenHeader && <Header title={props.title} />}
            {props.children}
        </SafeAreaView>
    )
}

export default Screen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: StatusBar.currentHeight || 0,
        backgroundColor: "#fcfcfc",
    },
    body: {
        display: "flex",
        flexGrow: 1,
        marginTop: 10,
        marginBottom: 140,
        padding: 10,
        // backgroundColor: "#000"
    }
})
