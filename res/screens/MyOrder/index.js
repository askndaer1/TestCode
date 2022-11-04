import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import { Text, Screen } from "@components"
import { Shadow, OrderStatus, OrderStatusColor } from '@components/constant'
import moment from "moment";
import { withDataStorageContext } from '../../Data/context'
import { AntDesign } from '@expo/vector-icons';
const MyOrder = (props) => {

    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const [OrderList, setOrderList] = useState([]);

    const HandleRefresh = () => {
        setLoading(true);
        doGetOrder()
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }

    useEffect(() => {
        doGetOrder()
    }, [props.DataStorageProvider.orderScreen])

    const doGetOrder = async () => {
        setLoading(true);
        let Order = await Server.getOrder()
        if (Order) {
            setOrderList(Order.orders)
            setLoading(false)
        } else {
            setLoading(false)
        }
        props.DataStorageProvider.setOrderScreen(false)
    }

    const renderItem = ({ item, index }) => (
        <TouchableOpacity key={item.OrderID + ""}
            onPress={() => { props.navigation.navigate('orderDetails', { item: item }) }}
            style={[{ overflow: 'hidden', marginTop: 20, flexDirection: 'row', borderRadius: 10, width: "94%", height: 140, backgroundColor: "#fff", alignSelf: 'center', justifyContent: 'space-between' }, Shadow]}>
            <View style={[{ zIndex: 99, position: 'absolute', bottom: 0, width: '100%', height: 20, justifyContent: 'center', alignItems: 'center' },
            item.orderStatus == OrderStatus[0] &&
            { backgroundColor: OrderStatusColor[0] },
            item.orderStatus == OrderStatus[1] &&
            { backgroundColor: OrderStatusColor[1] },
            item.orderStatus == OrderStatus[2] &&
            { backgroundColor: OrderStatusColor[2] },
            item.orderStatus == OrderStatus[3] &&
            { backgroundColor: OrderStatusColor[3] },
            ]}>
                <Text Bold style={{ color: "#fff" }}>{item.orderStatus}</Text>
            </View>

            <View style={{ height: "100%", justifyContent: 'center', alignItems: 'center', padding: 20, width: "30%" }} >
                <Text Bold translate={false} style={{ fontSize: 22, color: "#000" }}>RM {item.orderSum}</Text>
                <Text Bold>TOTAL PRICE</Text>
            </View>
            <View style={[{ marginTop: 20, marginRight: 20, marginBottom: 20, width: "70%" }]}>
                <View style={[{ margin: 10, flexDirection: "row", justifyContent: 'flex-end' }]}>

                    <Text translate={false} style={{ color: "#000" }}>{getTime(item.createdAt)}</Text>
                    <Text Bold style={{ width: "40%", }}>Order Date</Text>
                </View>
                <View style={[{ margin: 10, flexDirection: "row", justifyContent: 'flex-end' }]}>

                    <Text translate={false} style={{ color: "#000" }}>{item.orderDeliveryTime}</Text>
                    <Text Bold style={{ width: "40%", }}>Order Type</Text>
                </View>
            </View>

        </TouchableOpacity>
    );
    const getTime = (date) => {
        //   console.log("sssssssssss");
        const momentDate = moment(date);
        return momentDate.fromNow()
    }


    return (
        <Screen loading={loading} title={"MY ORDERS"}>

            {props.DataStorageProvider.isLogin != "true" ?

                <View style={{ padding: 10, flexDirection: 'row', borderRadius: 10, height: 60, width: "94%", backgroundColor: "#00b894", margin: 20, alignItems: "center", justifyContent: "center", alignSelf: 'center' }}>

                    <Text style={{ color: '#fff', flexGrow: 1 }} >You must be logged in to create an order</Text>
                    <AntDesign name="infocirlce" size={24} color="#fff" style={{ margin: 10 }} />
                </View>


                :

                <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.OrderID}
                    data={OrderList}
                    renderItem={renderItem}
                    numColumns={1}
                    onEndReachedThreshold={.3}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={HandleRefresh}
                        />
                    }
                />
            }
            <View style={{ margin: 50 }} />



        </Screen >

    )
}

export default withDataStorageContext(MyOrder)

const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', alignItems: 'center' } })
