import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, FlatList, Image } from 'react-native'
import { Colors } from '@components/constant'
import { Shadow } from '@components/constant'
import Text from '@components/Text'
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Fade from '@components/Animations/Fade'
import { withDataStorageContext } from '../../Data/context'


const Cart = (props) => {
    const navigation = useNavigation();
    const [cartTotal, setCartTotal] = useState(0);
    const [Delivery, setDelivery] = useState(0);
    const [DeliveryView, setDeliveryView] = useState(false);


    const addToCart = async (item, Op, Qu) => {
        props.DataStorageProvider.AddToCart(item, Op, Qu)
        total();

    }

    const checkQuantity = (productID) => {
        const List = props.DataStorageProvider.Cart
        const newData = List.filter(item => { return item.productID == productID })
        //  console.log(newData)
        if (newData.length > 0) { return newData[0].productQuantity } else return 0
    }

    useEffect(() => {
        total();
    }, [props.DataStorageProvider.Cart]);

    const doOrder = async (type) => {
        if (props.DataStorageProvider.isLogin != "true") {
            // alert("يجب تسجيل الدخول لانشاء الطلب ")
            props.DataStorageProvider.setMessage({
                message: "You must be logged in to create an order",
                title: 'notes',
                show: true
            })
            return
        }

        props.navigation.push('ShippingAddress', { cartTotal })
        // setDeliveryView(false)
        // if (cartTotal <= 0)
        //     return

        // let Body = {
        //     "products": JSON.stringify(props.DataStorageProvider.Cart),
        //     "orderDeliveryTime": type,
        //     "orderStatus": "Pending",
        //     "orderSum": cartTotal
        // }
        // console.log(Body)
        // let MyOrder = await Server.doOrder(Body)
        // console.log(MyOrder)
        // if (MyOrder) {
        //     // console.log(Login.user)
        //     props.DataStorageProvider.setCart([])
        //     props.DataStorageProvider.setOrderScreen(true)
        //     navigation.replace('OrderMessage')
        //     // alert("Order Successes")
        // }
    }

    const renderItem = ({ item, index }) => {
        let x = checkQuantity(item.productID)
        // setSum(Sum + (item.productPrice * item.productQuantity))
        return (<View style={[{ flexDirection: 'row', overflow: 'hidden', margin: 10, flex: 1, height: 150, backgroundColor: "#fff", borderRadius: 10 }, Shadow]}>
            <View style={{ width: '30%' }}>
                <Image resizeMode="cover" source={{ uri: item.productImg1 }} style={{ width: "100%", height: 150, backgroundColor: Colors.Primary }} />
            </View>

            <View style={{ backgroundColor: "#f9f9f9", justifyContent: 'space-around', alignItems: "center", height: 150, width: "70%" }}>
                <Text style={{ textAlign: "center", }}> {item.productName}   </Text>
                <View style={{ width: "80%", paddingHorizontal: 10, height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>
                    <Text translate={false} style={{ color: '#2980b9', }}>RM {item.productPrice}</Text>
                    <Text translate={false} style={{ color: '#2980b9', }}>RM {(item.productPrice * x).toFixed(2)}</Text>

                </View>
                <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'space-around', marginBottom: 10 }}>
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: "center", width: 40, height: 40, backgroundColor: "#e74c3c" }}
                        onPress={() => addToCart(item, "minus", x)}>
                        <Entypo name="minus" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text Bold style={{ lineHeight: 40, fontSize: 16 }}>{x}</Text>
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: "center", width: 40, height: 40, backgroundColor: "#27ae60" }}
                        onPress={() => addToCart(item, "add", x)}>
                        <Entypo name="plus" size={24} color="#fff" />
                    </TouchableOpacity>

                </View>
            </View>

        </View>)
    };

    const total = () => {
        let totalVal = 0;
        for (let i = 0; i < props.DataStorageProvider.Cart.length; i++) {
            totalVal += props.DataStorageProvider.Cart[i].productPrice * props.DataStorageProvider.Cart[i].productQuantity;
        }
        setCartTotal(totalVal);
    };
    return (
        <View style={{ flex: 1, }}>
            <View style={{ flex: 1, marginTop: 30, marginHorizontal: 30 }}>
                <View fadeMode={"fadeIn"} delay={200}>
                    <View style={{ marginBottom: 30 }}>
                        <Text Bold style={{ fontSize: 18, textAlign: 'center' }}>Cart</Text>
                        <View style={{ marginTop: 10, height: 10, width: "100%", backgroundColor: Colors.Primary }} />
                        <TouchableOpacity style={{ position: 'absolute' }} onPress={() => navigation.goBack()}>
                            <Entypo name="cross" size={40} color="#8a8a8a" />
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.productID}
                    data={props.DataStorageProvider.Cart}
                    renderItem={renderItem}
                    numColumns={1}
                    onEndReachedThreshold={.3}

                />
                <View style={{ alignSelf: 'center', borderRadius: 10, flexDirection: 'row', backgroundColor: Colors.Primary, width: '94%', height: 40, justifyContent: 'space-around', alignItems: "center" }}>
                    <Fade fadeMode={"fadeIn"} delay={600}><Text Bold style={{ fontSize: 18, color: "#fff" }}>RM {cartTotal.toFixed(2)}</Text></Fade>

                    <Fade fadeMode={"fadeIn"} delay={500}><Text Bold style={{ fontSize: 18, color: "#fff" }} >Total</Text></Fade>
                </View>

                <TouchableOpacity
                    onPress={doOrder}
                    style={[{ marginTop: 10, alignSelf: 'center', borderRadius: 10, flexDirection: 'row', backgroundColor: "#2980b9", width: '94%', height: 50, justifyContent: 'space-around', alignItems: "center" }, cartTotal <= 0 && { backgroundColor: "#bdc3c7" }]}>
                    <Text Bold style={{ fontSize: 18, color: "#fff" }} >SEND ORDER</Text>
                </TouchableOpacity>
            </View>
            {
                DeliveryView &&
                <View style={{ position: 'absolute', height: '100%', width: '100%', backgroundColor: "#000000CC", justifyContent: 'center', alignItems: "center" }}>
                    <TouchableOpacity onPress={() => { doOrder("fast") }} style={{ marginBottom: 20, justifyContent: 'space-around', flexDirection: 'row', backgroundColor: "#fff", borderRadius: 10, height: 100, width: '90%' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <FontAwesome5 name="shipping-fast" size={50} color="#2980b9" />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text Bold style={{ fontSize: 18 }}>توصيل سريع</Text>
                            <Text Bold style={{ fontSize: 18, color: "#bdc3c7" }}>سيوصلك طلبك في غضون ساعتين</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { doOrder("normal") }} style={{ justifyContent: 'space-around', flexDirection: 'row', backgroundColor: "#fff", borderRadius: 10, height: 100, width: '90%' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <FontAwesome5 name="truck" size={50} color="#2980b9" />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text Bold style={{ fontSize: 18 }}>توصيل اعتيادي</Text>
                            <Text Bold style={{ fontSize: 18, color: "#bdc3c7" }}>سيتم توصيل طلبك الي باب منزلك</Text>
                        </View>
                    </TouchableOpacity>


                </View>
            }

        </View>
    )
}

export default withDataStorageContext(Cart)

const styles = StyleSheet.create({})
