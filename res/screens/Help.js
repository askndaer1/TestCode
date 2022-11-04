import React from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native'
import { Linking } from 'react-native'
import { WebView } from 'react-native-webview';
import Text from "../component/Text"
import { Colors } from "../component/constant"
import { Ionicons } from '@expo/vector-icons';
import Screen from '../component/Screen'
import { Entypo } from '@expo/vector-icons';
const Help = () => {


    return (
        <Screen title={"المساعدة"}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ paddingBottom: 160, flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ margin: 20 }}>
                        <Text Bold style={{ textAlign: 'center', fontSize: 16 }}>For inquiries and assistance, please contact the company</Text>
                    </View>

                    <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
                        <TouchableOpacity
                            onPress={() => { Linking.openURL('whatsapp://send?text=hello&phone=+60183908955') }}
                            style={{ height: 40, margin: 20, backgroundColor: "#33d9b2", borderRadius: 10, width: "40%", flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ textAlign: 'center', fontSize: 16, color: "#fff" }}>via whatsapp</Text>
                            <Ionicons name="logo-whatsapp" size={30} color={"#fff"} style={{ margin: 5 }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { Linking.openURL(`tel:${"0060183908955"}`) }}
                            style={{ height: 40, margin: 20, backgroundColor: Colors.Primary, borderRadius: 10, width: "40%", flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ textAlign: 'center', fontSize: 16, color: "#fff" }}>Over the phone</Text>
                            <Entypo name="phone" size={30} color={"#fff"} style={{ margin: 5 }} />
                        </TouchableOpacity>

                    </View>
                    <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
                        <TouchableOpacity
                            onPress={() => { Linking.openURL('whatsapp://send?text=hello&phone=+60183908955') }}
                            style={{ height: 40, margin: 20, backgroundColor: "#33d9b2", borderRadius: 10, width: "40%", flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ textAlign: 'center', fontSize: 16, color: "#fff" }}>via whatsapp</Text>
                            <Ionicons name="logo-whatsapp" size={30} color={"#fff"} style={{ margin: 5 }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { Linking.openURL(`tel:${"0060183908955"}`) }}
                            style={{ height: 40, margin: 20, backgroundColor: Colors.Primary, borderRadius: 10, width: "40%", flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ textAlign: 'center', fontSize: 16, color: "#fff" }}>Over the phone</Text>
                            <Entypo name="phone" size={30} color={"#fff"} style={{ margin: 5 }} />
                        </TouchableOpacity>

                    </View>
                    <View style={{ marginBottom: 30, margin: 30 }}>
                        <Text Bold style={{ fontSize: 16 }}>How to use the App</Text>
                        <View style={{ marginTop: 10, height: 10, width: "100%", backgroundColor: Colors.Primary, borderRadius: 10 }} />
                    </View>


                    <View style={{ height: 250, margin: 20 }}>
                        <WebView

                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            source={{ uri: "https://www.youtube.com/embed/Zq6ceWmtoqM" }}

                        />
                    </View>



                    <View style={{ margin: 40 }} />
                </View>
            </ScrollView>
        </Screen>
    )
}

export default Help

const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', alignItems: 'center' } })
