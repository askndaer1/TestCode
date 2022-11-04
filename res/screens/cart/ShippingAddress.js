import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import Text from '@components/Text'
import { Colors } from '@components/constant'
import { Entypo } from '@expo/vector-icons';
import { withDataStorageContext } from '../../Data/context'
import { Shadow } from '@components/constant'
import LottieView from 'lottie-react-native';
import { Feather } from '@expo/vector-icons';

import { useConfirmPayment } from '@stripe/stripe-react-native';
import PaymentScreen from '../payment/PaymentScreen';
const ShoppingAddress = (props) => {
    const [StepView, setStepView] = useState(0)
    const [PaymentMethod, setPaymentMethod] = useState()
    const UserInformation = props.DataStorageProvider.UserInformation

    const { cartTotal } = props.route.params;


    const { confirmPayment, loading } = useConfirmPayment();

    useEffect(() => { console.log(UserInformation) }, [])




    const doPayment = async () => {
        if (PaymentMethod == null) {
            alert("حدد طريقة الدفع")
            return
        }

        if (PaymentMethod == 1) {
            let Body = {
                "products": JSON.stringify(props.DataStorageProvider.Cart),
                "orderDeliveryTime": "fast",
                "orderStatus": "Pending",
                "orderSum": cartTotal
            }
            console.log(Body)
            let MyOrder = await Server.doOrder(Body)
            console.log(MyOrder)
            if (MyOrder) {
                // console.log(Login.user)
                props.DataStorageProvider.setCart([])
                props.DataStorageProvider.setOrderScreen(true)
                props.navigation.replace('OrderMessage')

            }
        }

        if (PaymentMethod == 2) {
            const body = { amount: cartTotal.toFixed(2).toString().replace('.', '') }
            console.log(body)
            // return
            const data = await Server.fetchPaymentIntentClientSecret(body);
            console.log(data)
            if (!data) {
                Alert.alert(`Error code: `);
                console.log('Payment confirmation error');
                return
            }

            const clientSecret = data.clientSecret
            const { error, paymentIntent } = await confirmPayment(clientSecret, {
                type: 'Fpx',
            });

            if (error) {
                Alert.alert(`Error code: ${error.code}`, error.message);
                console.log('Payment confirmation error', error.message);
            } else if (paymentIntent) {

                let Body = {
                    "products": JSON.stringify(props.DataStorageProvider.Cart),
                    "orderDeliveryTime": "fast",
                    "orderStatus": "Pending",
                    "orderSum": cartTotal
                }
                console.log(Body)
                let MyOrder = await Server.doOrder(Body)
                console.log(MyOrder)
                if (MyOrder) {
                    // console.log(Login.user)
                    props.DataStorageProvider.setCart([])
                    props.DataStorageProvider.setOrderScreen(true)
                }

                props.navigation.replace('OrderMessage')
            }
        }
    }
    return (
        <PaymentScreen style={{ flex: 1, }} paymentMethod="fpx">

            {StepView == 0 &&
                <View style={{ flex: 1, marginTop: 30, marginHorizontal: 30 }}>
                    <View style={{ marginBottom: 30 }}>
                        <Text Bold style={{ fontSize: 18 }}>معلومات الشحن</Text>
                        <View style={{ marginTop: 10, height: 10, width: "100%", backgroundColor: Colors.Primary }} />
                        <TouchableOpacity style={{ position: 'absolute' }} onPress={() => props.navigation.goBack()}>
                            <Entypo name="cross" size={40} color="#8a8a8a" />
                        </TouchableOpacity>
                    </View>

                    <View style={[{ backgroundColor: "#f9f9f9", borderRadius: 10, overflow: "hidden", marginBottom: 30 }]}>
                        <View style={{ padding: 10, backgroundColor: "#d9dbdb" }}>
                            <Text Bold style={{ fontSize: 16, color: Colors.Primary, textAlign: 'right' }}>المستلم</Text>
                        </View>
                        <View style={{ margin: 20, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }}>
                                <Text Bold style={{ fontSize: 16, color: "#8a8a8a" }}>{UserInformation.name}</Text>
                                <Text Bold style={{ fontSize: 16, width: "30%" }}>الاسم</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text Bold style={{ fontSize: 16, color: "#8a8a8a", textAlign: 'right' }}>{UserInformation.phone}</Text>
                                <Text Bold style={{ fontSize: 16, width: "30%" }}>رقم الهاتف</Text>
                            </View>
                        </View>
                    </View>


                    <View style={[{ backgroundColor: "#f9f9f9", borderRadius: 10, overflow: "hidden" }]}>
                        <View style={{ padding: 10, backgroundColor: "#d9dbdb" }}>
                            <Text Bold style={{ fontSize: 16, color: Colors.Primary, textAlign: 'right' }}>العنوان</Text>
                        </View>
                        <View style={{ margin: 20, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }}>
                                <Text Bold style={{ fontSize: 16, color: "#8a8a8a", textAlign: 'center', width: "100%" }}>{UserInformation.building + " " + UserInformation.address + " " + UserInformation.area}</Text>
                            </View>

                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => setStepView(1)}
                        style={[{ position: 'absolute', bottom: 30, marginTop: 10, alignSelf: 'center', borderRadius: 10, flexDirection: 'row', backgroundColor: "#2980b9", width: '94%', height: 50, justifyContent: 'space-around', alignItems: "center" }]}>
                        <Text Bold style={{ fontSize: 18, color: "#fff" }} >التالي</Text>
                    </TouchableOpacity>
                </View>
            }





            {StepView == 1 &&
                <View style={{ flex: 1, marginTop: 30, marginHorizontal: 30 }}>
                    <View style={{ marginBottom: 30 }}>
                        <Text Bold style={{ fontSize: 18 }}>طريقة الدفع الدفع</Text>
                        <View style={{ marginTop: 10, height: 10, width: "100%", backgroundColor: Colors.Primary }} />
                        <TouchableOpacity style={{ position: 'absolute' }} onPress={() => props.navigation.goBack()}>
                            <Entypo name="cross" size={40} color="#8a8a8a" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <LottieView autoPlay

                            style={{
                                width: 300,
                                height: 300,

                            }}
                            source={require('../../../assets/payment.json')}
                        />
                    </View>
                    {/* <View style={{ alignItems: 'center' }}>
                        <Text Bold style={{ fontSize: 60, marginBottom: -20, margin: 0, }}>{cartTotal.toFixed(2)}</Text>
                        <Text Bold style={{ fontSize: 30, marginBottom: 0, margin: 0 }}>الاجمالي</Text>
                    </View> */}

                    <TouchableOpacity
                        onPress={() => setPaymentMethod(1)}
                        style={{ padding: 20, justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, borderWidth: .5, borderColor: "#34ACE0" }}>
                        <Text Bold style={[{ fontSize: 24, marginBottom: 0, margin: 0, }, PaymentMethod == 1 ? { color: Colors.Primary } : { color: "#95a5a6" }]}> الدفع عند الاستلام </Text>
                        <Feather name={PaymentMethod == 1 ? "check-circle" : "circle"} size={24} color={Colors.Primary} style={{ marginHorizontal: 10 }} />
                    </TouchableOpacity>




                    <TouchableOpacity
                        onPress={() => setPaymentMethod(2)}
                        style={{ marginTop: 20, padding: 20, justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, borderWidth: .5, borderColor: "#34ACE0" }}>
                        <Text Bold style={[{ fontSize: 24, marginBottom: 0, margin: 0 }, PaymentMethod == 2 ? { color: Colors.Primary } : { color: "#95a5a6" }]}>الدفع عبر الإنترنت</Text>
                        <Feather name={PaymentMethod == 2 ? "check-circle" : "circle"} size={24} color={Colors.Primary} style={{ marginHorizontal: 10 }} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={doPayment}
                        style={[{ position: 'absolute', bottom: 30, marginTop: 10, alignSelf: 'center', borderRadius: 10, flexDirection: 'row', backgroundColor: "#2980b9", width: '94%', height: 50, justifyContent: 'space-around', alignItems: "center" }]}>
                        <Text Bold style={{ fontSize: 20, color: "#fff" }} >ارسال الطلب   {"RM " + cartTotal.toFixed(2)}</Text>
                    </TouchableOpacity>

                </View>
            }




        </PaymentScreen>
    )
}

export default withDataStorageContext(ShoppingAddress)

const styles = StyleSheet.create({})
