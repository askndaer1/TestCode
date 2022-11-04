import React from 'react'
import { StyleSheet, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import Text from '@components/Text'
import { Colors } from '@components/constant'
import { Entypo } from '@expo/vector-icons';
const windowWidth = Dimensions.get('window').width;
import LottieView from 'lottie-react-native';
import { AntDesign } from '@expo/vector-icons';
import Dash from 'react-native-dash';
import { ReturnDate, ReturnTime, OrderStatus } from '@components/constant'
const orderDetails = (props) => {
    const { item } = props.route.params;
    const level = OrderStatus.indexOf(item.orderStatus)


    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={{ flex: 1, margin: 30, }}>


                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Entypo name="cross" size={40} color="#8a8a8a" />
                </TouchableOpacity>
                <View style={{ marginBottom: 30 }}>
                    <Text Bold style={{ fontSize: 18 }}>Order detail</Text>
                    <View style={{ marginTop: 10, height: 10, width: "100%", backgroundColor: Colors.Primary }} />
                </View>
                <View style={{}}>

                    <View style={{ position: 'absolute', right: 20, paddingTop: 20, paddingBottom: 20, height: "100%" }}>
                        <Dash dashColor={"#e8e8e8"} dashLength={8} dashThickness={3} style={{ height: "100%", flexDirection: 'column' }} />
                    </View>


                    <View style={{ flexDirection: "row", justifyContent: 'flex-end' }}>
                        <View>
                            <Text Bold style={{ fontSize: 18 }}>received order"</Text>
                            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                                <Text Bold style={{ fontSize: 14, color: Colors.Primary }}>{ReturnDate(item.createdAt)}</Text>
                                <View style={{ margin: 10 }} />
                                <Text Bold style={{ fontSize: 14, color: Colors.Primary }}>{ReturnTime(item.createdAt)}</Text>
                            </View>
                        </View>
                        <AntDesign name={level > 0 ? "checkcircle" : "clockcircleo"} size={24} color={Colors.Primary} style={{ margin: 10, backgroundColor: "#fff", height: 24 }} />
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: 'flex-end', marginTop: 30 }}>
                        <View>
                            <Text Bold style={{ fontSize: 18 }}>Prepared</Text>
                            {/* <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                                <Text Bold style={{ fontSize: 14, color: Colors.Primary }}>الجمعة 20 مايو 2021</Text>
                                <View style={{ margin: 10 }} />
                                <Text Bold style={{ fontSize: 14, color: Colors.Primary }}> 12:41</Text>
                            </View> */}
                        </View>
                        <AntDesign name={level >= 1 ? "checkcircle" : "clockcircleo"} size={24} color={Colors.Primary} style={{ margin: 10, backgroundColor: "#fff", height: 24 }} />
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: 'flex-end', marginTop: 30 }}>
                        <View>
                            <Text Bold style={{ fontSize: 18 }}>Delivery in progress</Text>
                            {/* <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                                <Text Bold style={{ fontSize: 14, color: Colors.Primary }}>الجمعة 20 مايو 2021</Text>
                                <View style={{ margin: 10 }} />
                                <Text Bold style={{ fontSize: 14, color: Colors.Primary }}> 12:41</Text>
                            </View> */}
                        </View>
                        <AntDesign name={level >= 2 ? "checkcircle" : "clockcircleo"} size={24} color={Colors.Primary} style={{ margin: 10, backgroundColor: "#fff", height: 24 }} />
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: 'flex-end', marginTop: 30 }}>
                        <View>
                            <Text Bold style={{ fontSize: 18 }}>Delivered</Text>

                            {/* <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                                <Text Bold style={{ fontSize: 14, color: Colors.Primary }}>الجمعة 20 مايو 2021</Text>
                                <View style={{ margin: 10 }} />
                                <Text Bold style={{ fontSize: 14, color: Colors.Primary }}> 12:41</Text>
                            </View> */}
                        </View>
                        <AntDesign name={level >= 3 ? "checkcircle" : "clockcircleo"} size={24} color={Colors.Primary} style={{ margin: 10, backgroundColor: "#fff", height: 24 }} />

                    </View>
                </View>



                <TouchableOpacity
                    onPress={() => { props.navigation.navigate('orderList', { item }) }}
                    style={{ justifyContent: "center", alignItems: "center", borderRadius: 25, backgroundColor: Colors.Primary, width: "80%", height: 50, marginTop: 30, alignSelf: 'center' }}>
                    <Text style={{ fontSize: 18, color: "#fff" }}>VIEW PRODUCTS</Text>
                </TouchableOpacity>

            </View>

            <LottieView autoPlay

                style={{
                    width: windowWidth,
                    // height: 400,
                    bottom: 0, position: 'absolute',
                }}
                source={require('../../../assets/der.json')}
            />
            {/* <Image resizeMode="stretch" source={require('../../../assets/dr.png')} style={{ bottom: 10, position: 'absolute', width: windowWidth, height: 300 }} /> */}
        </View >
    )
}

export default orderDetails

const styles = StyleSheet.create({})
